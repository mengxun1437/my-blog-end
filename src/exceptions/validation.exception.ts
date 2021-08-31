/* eslint-disable prefer-const */
import { ArgumentMetadata, PipeTransform, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  validate,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ErrorMsg } from './types.exception';
import { ApiException } from './api.exception';

@Injectable()
export class ApiParamsValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      let error = errors.shift();
      let constraints = error.constraints;

      for (let key in constraints) {
        throw new ApiException(
          ErrorMsg.VALID_DATA_ERROR.errcode,
          ErrorMsg.VALID_DATA_ERROR.errmsg,
          {
            reason: constraints[key],
          },
        );
      }
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}

export function IsIn(
  property: Array<any>,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isIn',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return property instanceof Array && property.includes(value);
        },
      },
    });
  };
}
