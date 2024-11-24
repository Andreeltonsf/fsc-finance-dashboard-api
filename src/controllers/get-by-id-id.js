import validator from 'validator'
import { GetByIdIdUseCase } from '../use-cases/get-by-id-id.js'
import { badRequest, notFound, ok, serverError } from './helpers.js'

export class GetByIdIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return badRequest('Invalid user id')
            }

            const getByIdIdUseCase = new GetByIdIdUseCase()

            const user = await getByIdIdUseCase.execute(
                httpRequest.params.userId,
            )
            if (!user) {
                return notFound('User not found')
            }
            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
