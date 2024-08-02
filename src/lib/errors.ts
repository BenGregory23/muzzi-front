export class CustomError extends Error {
    statusCode:number

    constructor(message:string, statusCode:number) {
     super(message)
     this.statusCode = statusCode
    }
}


export class UnauthorizedError extends CustomError {
    constructor(message:string) {
     super(message, 401)
    }
}

export class NotFoundError extends CustomError {
    constructor(message:string) {
     super(message, 404)
    }
}