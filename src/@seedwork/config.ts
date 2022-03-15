export const isDev = process.env.NODE_ENV
  ? process.env.NODE_ENV === 'development'
  : true;

export const port = parseInt(process.env.PORT ?? '3000');

export const longRunJestTimeout = 60000;
