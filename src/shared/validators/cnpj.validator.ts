import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export default function IsCPForCNPJ(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCPForCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;

          return cpf.isValid(value) || cnpj.isValid(value);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments.property} must be a valid CPF or CNPJ document`;
        },
      },
    });
  };
}
