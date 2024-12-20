export const badRequest = (errorMessage) => {
    return {
        statusCode: 400,
        body: {
            errorMessage,
        },
    }
}

export const created = (body) => {
    return {
        statusCode: 201,
        body,
    }
}

export const serverError = (errorMessage) => {
    return {
        statusCode: 500,
        body: {
            errorMessage,
        },
    }
}

export const ok = (body) => {
    return {
        statusCode: 200,
        body,
    }
}

export const notFound = (errorMessage) => {
    return {
        statusCode: 404,
        body: {
            errorMessage,
        },
    }
}
