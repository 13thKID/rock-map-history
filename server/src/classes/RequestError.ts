const errors = {
  'unknown-route': 'The specified route does not exits',
}

export class ReqErr {
  error: string
  message: string

  constructor(error: keyof typeof errors) {
    this.error = error
    this.message = errors[error] || 'Unknown error occurred'
  }
}
