interface ErrorFieldsForm {
  email?: FieldMessageError;
  password?: FieldMessageError;
  repeatPassword?: FieldMessageError;
  name?: FieldMessageError;
  surname?: FieldMessageError;
  day?: FieldMessageError;
  month?: FieldMessageError;
  year?: FieldMessageError;
  city?: FieldMessageError;
  gender?: FieldMessageError;
  toKnow?: FieldMessageError;
}
type ErrorKey = keyof ErrorFieldsForm;

interface FieldMessageError {
  message?: string;
  errorName: ErrorKey;
}

/*   interface ErrorFieldsLogin {
    email : FieldMessageError,
    password  : FieldMessageError,
  } */

export type { ErrorFieldsForm };
/*   export type {ErrorFieldsLogin}; */
