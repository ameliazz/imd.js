import SocketIO from 'socket.io'
import Colors from 'colors'
import timingSafeEqual from '@/utils/timingSafeEqual'
import Imd from '@/index'
import ClientEvents from './SocketEvents'

class Server {
    io = new SocketIO.Server()
    cache = new Imd()
    hydrateInterval: number
    authPassport: string

    constructor(passport: string, hydrateInterval: number = 5 * (60 * 1000)) {
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
                        socket.handshake.address,
                    )}`,
            )
            ClientEvents(socket, this.cache, this.io, this.hydrateInterval)
        })
    }

    init() {
        return this.io.listen(3000)
    }
}

export default Server
