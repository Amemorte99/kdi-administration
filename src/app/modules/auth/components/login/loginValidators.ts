import { AbstractControl, ValidatorFn } from "@angular/forms";


export class LoginValidator {

static conditionValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const usernamePattern = /^[A-Za-z0-9_]+(?:[ _-][A-Za-z0-9]+)*$/;
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const validInput = usernamePattern.test(control.value) || emailPattern.test(control.value);
        return validInput ? null : {'invalidInput': {value: control.value}};
      };
  }

}