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
