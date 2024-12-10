export type TErrorSource = {
  path: string | number;
  message: string;
};

export type TReturnError = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource[];
};
