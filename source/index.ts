import Emitter from 'eventemitter3'

import Document from './structures/Document'
import { ImdOptions } from './types/Options'
import { SearchByIdentifier } from './utils/search'

class Imd extends Emitter {
    documents: Document<any>[] = []
    maxDocuments: number = -1
    useCopies?: boolean

    constructor(Options?: ImdOptions) {
        super()
        this.useCopies = Boolean(Options?.useCopies)
        this.maxDocuments = Number(Options?.maxDocuments) >= 1 ? Number(Options?.maxDocuments) : -1
    }

    create<T>(content: T): Document<T> | undefined {
        if (this.documents.length == this.maxDocuments) {
            return undefined
        }

        if (!this.useCopies && SearchByIdentifier(this.documents, (this.documents.length + 1)) !== -1) {
            return undefined
        }

        if (!content && content !== 0) return undefined

        const document = new Document<T>((this.documents.length + 1), content)
        this.documents.push(document)

        return document
    }

    rescue(identifier: number): Document<any> | undefined {
        if (!identifier && identifier !== 0) return undefined

        if (this.documents.length <= 0) {
            return undefined
        }

        const resultOfSearch = SearchByIdentifier(this.documents, identifier)
        return (resultOfSearch == -1
            ? undefined
            : this.documents[resultOfSearch]
        )
    }
}

export default Imd
export { Document }