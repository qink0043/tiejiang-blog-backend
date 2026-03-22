export enum HttpCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppResponse<T = any> {
  code: number;
  message: string;
  data?: T;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data?: T, message = "success") {
    return new AppResponse(HttpCode.SUCCESS, message, data);
  }

  static error(message = "error", code = HttpCode.INTERNAL_SERVER_ERROR) {
    return new AppResponse(code, message);
  }
}
