export interface ResponseConfig {
  code: number;
  msg: string;
  data: any;
}

export const success = (msg = 'success', data = {}): ResponseConfig => ({
  code: 0,
  msg: msg,
  data: data,
});

export const error = ({ errcode, errmsg }, data = {}) => ({
  code: errcode,
  msg: errmsg,
  data: data,
});
