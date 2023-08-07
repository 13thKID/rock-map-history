const errors = {
  'unknown-route': 'The specified route does not exits',
  'invalid-id': 'The passed id is not a valid ObjectId',
  'invalid-date-format': 'The format of the date is wrong',
}

const dynErrors = {
  'unknown-query-param': (arg: any) => `Unsupported query param: ${arg}`,
}

export class ReqErr {
  error: string
  message: string

  constructor(error: keyof typeof errors | keyof typeof dynErrors, arg?: any) {
    this.error = error
    this.message = arg
      ? dynErrors[error as keyof typeof dynErrors](arg)
      : errors[error as keyof typeof errors]
  }
}
