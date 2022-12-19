import isEmail from 'validator/lib/isEmail';

/* --- ADAPTER --- */
export interface ValidatorProtocol {
  checkEmail(value: string): boolean;
}

export class ValidatorAdapter implements ValidatorProtocol {
  checkEmail(value: string): boolean {
    return isEmail(value);
  }
}

/* --- CLIENT CODE --- */
const validatorAdapter = new ValidatorAdapter();
console.log(validatorAdapter.checkEmail('Pedro@gmail.com'));
