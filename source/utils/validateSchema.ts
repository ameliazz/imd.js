export default (input: object, schema: object) => {
    let response = true

    for (const field in schema) {
        const fieldType = schema[field as keyof object]

        if (
            validateType(input[field as keyof object], fieldType) &&
            fieldType !== 'unknown' &&
            !String(fieldType).includes('?')
        ) {
            response = false
            break
        }
    }

    return response
}

function validateType(input: unknown, type: string) {
    let response = true
    const types = type.split(',')

    for (const type of types) {
        if (typeof input !== type) {
            response = false
            break
        }
    }

    return response
}
