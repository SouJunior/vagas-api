import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class isCNPJValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(cnpj: string, args: ValidationArguments) {
    return isValidCNPJ(cnpj);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'CNPJ $value is invalid';
  }
}

export function IsCNPJ(params?: object, validationOptions?: ValidationOptions) {
  return function (object?: object, propertyName?: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [params],
      validator: isCNPJValidator,
    });
  };
}

/**
 * Validates a CNPJ
 * @param cnpj The CNPJ value to be validated
 */
export function isValidCNPJ(cnpj: string): boolean {
  if (!/[\.\/\-]/g.test(cnpj)) return false;

  const cleaned = cnpj.toString().replace(/[\.\/\-]/g, '');

  if (!cleaned || cleaned.length !== 14 || /^(\d)\1+$/.test(cleaned)) {
    return false;
  }

  let registration = cleaned.substr(0, 12);
  registration += digit(registration);
  registration += digit(registration);

  return registration.substr(-2) === cleaned.substr(-2);
}

function digit(numbers: string): number {
  let index = 2;

  const sum = [...numbers].reverse().reduce((buffer, number) => {
    buffer += Number(number) * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  const mod = sum % 11;

  return mod < 2 ? 0 : 11 - mod;
}
