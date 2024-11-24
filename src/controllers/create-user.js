import validator from 'validator'
import { EmailAlreadyInUserError } from '../errors/user.js'
import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created } from './helpers.js'
export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            //validar a requisição(campos obrigatórios,tamanho de senha e e-mail)

            const requireFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requireFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest(`Missing params ${field}`)
                }
            }

            const passwordIsvalid = params.password.length

            if (passwordIsvalid < 6) {
                return badRequest('Password must be at least 6 characters long')
            }

            const emailIsValid = validator.isEmail(params.email)

            if (!emailIsValid) {
                return badRequest('Invalid email')
            }

            //chamar o use case

            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(params)

            //retorn a resposta para o usuário(status code)

            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUserError) {
                return badRequest(error.message)
            }
            console.error(error)
            return badRequest('Internal server error')
        }
    }
}
