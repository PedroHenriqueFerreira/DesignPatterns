import isEmail from 'validator/lib/isEmail';

/* --- ADAPTER --- */
interface ValidatorProtocol {
  checkEmail(value: string): boolean;
}

class ValidatorAdapter implements ValidatorProtocol {
  checkEmail(value: string): boolean {
    return isEmail(value);
  }
}

/* --- CLIENT CODE --- */
const validatorAdapter = new ValidatorAdapter();
console.log(validatorAdapter.checkEmail('pedro@gmail.com'));
