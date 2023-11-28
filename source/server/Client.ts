import Colors from 'colors'
import { ImdClientConnectionOptions } from '@/types/Client'
import Imd, { Document } from '@/index'
import { Socket, io } from 'socket.io-client'

class Client {
    io: Socket
    cache: Imd = new Imd()

    constructor(
        connectionUrl: string,
        connectionOptions: ImdClientConnectionOptions,
    ) {
        this.io = io(connectionUrl, {
            auth: {
                passport: connectionOptions.auth.passport,
            },
            autoConnect: false,
            reconnectionDelay: 2000,
        })
    }

    setup() {
        this.io.on('error', (error: { code: number; message: string }) => {
            console.error(
                Colors.red('[ CLIENT-ERROR ]') +
                    ': ' +
                    error.message +
                    Colors.black(` (${error.code})`),
            )
        })

        this.io.on('hydrate', (data) => {
            console.log(
                Colors.blue('[ Hydrating ]') +
                    ': Hydrating documents from the server',
            )

            if (Array.isArray(data)) {
                this.cache.bulkCreate(data)
            } else {
                this.cache.create(
                    data.content,
                    data.key || data._id,
                    data.timestamp,
                )
            }
        })

        this.io.connect()
    }

    create<T>(
        content: T,
        key?: string,
        timestamp?: string,
    ): Document<T> | undefined {
        const document = this.cache.create(content, key, timestamp)

        this.io.emit('create', document)
        return document
    }

    remove(identifier: number | string): boolean {
        const result = this.cache.remove(identifier)

        if (!result) {
            return false
        }

        this.io.emit('remove', identifier)
        return true
    }

    rescue(identifier: number | string): Document<unknown> | undefined {
        return this.cache.rescue(identifier)
    }
}

export default Client
