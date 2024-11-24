export class EmailAlreadyInUserError extends Error {
    constructor() {
        super('The provided email is already in use')
        this.name = 'EmailAlreadyInUserError'
    }
}
