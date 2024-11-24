import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByRepository = new PostgresGetUserByIdRepository()
        const user = await getUserByRepository.execute(userId)

        return user
    }
}
