export const apiResponse = (data: object, message: string, statusCode: number) => {
  return {
    statusCode: statusCode,
    message: message,
    data: data
  };
};
