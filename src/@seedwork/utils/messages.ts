export const makeErrorMessage =
  (status: number) => (errorType: string) => (message: string) => ({
    message,
    error: errorType,
    statusCode: status,
  });

export const makeBadRequestMessage = makeErrorMessage(400)('Bad Request');
export const makeNotFoundMessage = makeErrorMessage(404)('Not Found');
