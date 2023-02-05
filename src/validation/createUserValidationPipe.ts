import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

export class UserValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    // value: this is body which we sent
    // metadata: this key contain the CreateUserDto

    // console.log('value');
    // console.log(value);
    // console.log('metadata');
    // console.log(metadata.metatype);

    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length > 0) {
      let messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });
      // throw new ValidationException(messages);
    }

    return value;
  }
}
