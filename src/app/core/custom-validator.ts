import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
  
    if (!value) {
      return null; 
    }
  
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
    const valid = value.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  
    return valid ? null : {
      passwordComplexity: {
        requirements: `Password must be at least ${minLength}`
      }
    };
  }



  export function nameLengthValidator(control: AbstractControl): Promise<ValidationErrors | null> | null {
    return new Promise((resolve) => {
      const value = control.value;
      if (value && (value.length <3)) {
        resolve({ 'nameLength': true });
      } else {
        resolve(null);
      }
    });
  }
  