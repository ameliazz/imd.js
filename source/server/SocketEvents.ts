import Colors from 'colors'
import {
    Data as DocumentData,
    Schema as DocumentSchema,
} from '@/types/Document'
import Imd from '@/index'
import { Server, Socket } from 'socket.io'
import validateSchema from '@/utils/validateSchema'

export default (
    socket: Socket,
    cache: Imd,
    io: Server,
    hydrateInterval: number
) => {
    const interval = setInterval(() => {
        socket.emit('hydrate', cache.documents)
    }, hydrateInterval)

    socket.on('disconnect', () => {
        clearInterval(interval)
    })

    socket.on('create', (document: DocumentData<unknown>) => {
        if (!validateSchema(document, DocumentSchema)) {
            socket.emit('error', {
                code: 101,
                message:
                    'You are trying to create a document with a wrong object, please follow the default schema',
            })

            return
        }

        console.log(
            Colors.green(`[ OPERATION ]`) +
                `: New ${Colors.cyan('CREATE')} operation from ${Colors.red(
                    socket.handshake.address
                )}`
        )

        cache.create(
            document.content,
            document._id ? String(document._id) : undefined,
            document.timestamp || new Date().toISOString()
        )
        io.to('clients').emit('hydrate', document)
    })

    socket.on('remove', (identifier: number | string) => {
        const data = cache.remove(identifier)

        if (!data) {
            socket.emit('error', {
                code: 102,
                message: `The "${identifier}" document removal process failed`,
            })
        }

        io.to('clients').emit('remove', identifier)
    })
}
