import SocketIO from 'socket.io'
import Colors from 'colors'
import timingSafeEqual from '@/utils/timingSafeEqual'
import Imd from '@/index'
import ClientEvents from './SocketEvents'
import { ImdOptions } from '@/types/Options'

class Server {
    io = new SocketIO.Server()
    cache: Imd
    hydrateInterval: number
    authPassport: string

    constructor(
        passport: string,
        hydrateInterval: number = 5 * (60 * 1000),
        options?: ImdOptions
    ) {
        console.warn('WARN: `Server` IS AN EXPERIMENTAL FEATURE')

        this.cache = new Imd(options)
        this.hydrateInterval = hydrateInterval
        this.authPassport = passport

        this.io.on('connection', async (socket) => {
            const passport = socket.handshake.auth['passport']

            if (!timingSafeEqual(passport, this.authPassport)) {
                socket.emit('error', {
                    code: 100,
                    message: 'unauthorized',
                })

                socket.disconnect(true)
                return
            }

            await socket.join('clients')
            socket.emit('hydrate', this.cache.documents)
            socket.emit('ready')

            console.log(
                Colors.green(`[ NEW CONNECTION ]`) +
                    `: New client are connected from ${Colors.red(
                        socket.handshake.address
                    )}`
            )
            ClientEvents(socket, this.cache, this.io, this.hydrateInterval)
        })
    }

    listen(port: number) {
        return this.io.listen(Number(port || process.env['IMD_SERVER_PORT']))
    }
}

export default Server
