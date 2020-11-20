export const paramError = (message) => ({
  statusCode: 422,
  body: {
    message: message
  }
})
