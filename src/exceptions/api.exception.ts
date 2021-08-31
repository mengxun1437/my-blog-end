import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(errcode: number, errmsg: string, data = {}) {
    super({ code: errcode, msg: errmsg, data: data }, HttpStatus.OK);
  }
}
