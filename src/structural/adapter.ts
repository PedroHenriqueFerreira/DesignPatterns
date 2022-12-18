import isEmail from 'validator/lib/isEmail';

interface ValidatorProtocol {
  isEmail(value: string): boolean;
}

/* --- ADAPTER --- */

class ValidatorAdapter implements ValidatorProtocol {
  isEmail(value: string): boolean {
    return isEmail(value);
  }
}

/* --- CLIENT CODE --- */
const validatorAdapter = new ValidatorAdapter();
console.log(validatorAdapter.isEmail('pedro@gmail.com'));
