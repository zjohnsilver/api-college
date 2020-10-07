export const serverError = (message) => ({
  statusCode: 500,
  body: {
    message: message
  }
})
