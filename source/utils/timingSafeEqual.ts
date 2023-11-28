import { timingSafeEqual } from 'node:crypto'

export default (secret: string | undefined, passport: string): boolean => {
    try {
        return timingSafeEqual(
            Buffer.from(String(secret)),
            Buffer.from(passport),
        )
    } catch {
        return false
    }
}
