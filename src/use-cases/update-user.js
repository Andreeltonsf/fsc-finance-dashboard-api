import bcrypt from 'bcrypt'
import { EmailAlreadyInUserError } from '../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
    async exeecute(userId, updateUserParams) {
        //se o email for alterado, verificar se o email ja existe

        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail) {
                throw new EmailAlreadyInUserError(updateUserParams.email)
            }
        }
        const user = {
            ...updateUserParams,
        }
        //se a senha estiver sendo atualizada,criptografar a nova senha

        if (updateUserParams.password) {
            updateUserParams.password = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = updateUserParams.password
        }
        //chamar o repo para atualizar o usuário
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

        const updateUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updateUser
    }
}
