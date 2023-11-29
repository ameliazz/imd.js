import SocketIO from 'socket.io'
import HTTP from 'http'
import Colors from 'colors'
import timingSafeEqual from '@/utils/timingSafeEqual'
import Imd from '@/index'
import ClientEvents from './SocketEvents'
import { ImdOptions } from '@/types/Options'
import IP from 'ip'

class Server {
    httpServer?: HTTP.Server
    io: SocketIO.Server
    cache: Imd
    hydrateInterval: number
    authPassport: string

    constructor(
        passport: string,
        hydrateInterval: number = 5 * (60 * 1000),
        useHttpServer: boolean = false,
        options?: ImdOptions
    ) {
        console.warn(
            '---------- WARN: `Server` IS AN EXPERIMENTAL FEATURE ----------'
        )

        if (useHttpServer) {
            this.httpServer = HTTP.createServer((req, res) => {
                res.statusCode = 200
                res.end(JSON.stringify('OK'))
            })
        }

        this.io = new SocketIO.Server(this.httpServer || {}, {
            /** Socket Options */
        })

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
                Colors.green(`[ Connection ]`) +
                    `: New client are connected from ${Colors.yellow(
                        socket.handshake.address
                    )}`
            )
            ClientEvents(socket, this.cache, this.io, this.hydrateInterval)
        })
    }

    listen(port: number, hostname: string = IP.address()) {
        console.log(
            Colors.green('[ Listening ]') +
                ': The server is listening on ' +
                Colors.yellow(hostname)
        )
        return this.httpServer
            ? this.httpServer.listen(port, hostname)
            : this.io.listen(port)
    }
}

export default Server
