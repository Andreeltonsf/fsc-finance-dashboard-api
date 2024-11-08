import validator from 'validator'
import { CreateUserUseCase } from '../use-cases/create-user.js'

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
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `Missing params ${field}`,
                        },
                    }
                }
            }

            const passwordIsvalid = params.password.length

            if (passwordIsvalid < 6) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: 'Password must be at least 6 characters',
                    },
                }
            }

            const emailIsValid = validator.isEmail(params.email)

            if (!emailIsValid) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: 'Invalid email.Please provide valid one',
                    },
                }
            }

            //chamar o use case

            const createUserUseCase = new CreateUserUseCase()

            const createdUser = await createUserUseCase.execute(params)

            //retorn a resposta para o usuário(status code)

            return {
                statusCode: 201,
                body: createdUser,
            }
        } catch (error) {
            console.log(error)
            return {
                statusCode: 500,
                body: {
                    errorMessage: 'Internal server error',
                },
            }
        }
    }
}
