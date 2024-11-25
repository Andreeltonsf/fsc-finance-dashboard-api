import validator from 'validator'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAlreadyInUserError } from '../errors/user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isValidUserId = validator.isUUID(userId)

            if (!isValidUserId) {
                return httpRequest.notFound('Id not found')
            }

            const updateUserParams = httpRequest.body

            // Campos permitidos
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            // Verifique se existem campos não permitidos
            const someFieldsIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsIsNotAllowed) {
                return httpRequest.badRequest('Some fields are not allowed')
            }

            // Validação de senha
            if (
                updateUserParams.password &&
                updateUserParams.password.length < 6
            ) {
                return httpRequest.badRequest(
                    'Password must be at least 6 characters long',
                )
            }

            // Validação de email
            if (
                updateUserParams.email &&
                !validator.isEmail(updateUserParams.email)
            ) {
                return httpRequest.badRequest('Invalid email')
            }

            // Instancie o caso de uso para atualizar o usuário
            const updateUserUseCase = new UpdateUserUseCase()

            // Execute o caso de uso
            const updatedUser = await updateUserUseCase.execute(
                httpRequest.params.userId,
                updateUserParams,
            )

            return httpRequest.ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUserError) {
                return httpRequest.badRequest(error.message)
            }
            console.error(error)
            return httpRequest.serverError('Internal server error')
        }
    }
}
