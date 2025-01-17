
interface InputField {
  value: string;
  red: boolean;
  label: string;
}

interface inputSelect {
  value: string;
  label: string;
}

interface InputFieldWithSelect {
  value: inputSelect;
  red: boolean;
  label: string;
}

interface FormFields {
  email?: InputField;
  name?: InputField;
  surname?: InputField;
  day?: InputFieldWithSelect;
  month?: InputFieldWithSelect;
  year?: InputFieldWithSelect;
  city?: InputField;
  gender?: InputFieldWithSelect;
  toKnow?: InputFieldWithSelect;
  password?: InputField;
  repeatPassword?: InputField;
  titleProfile?:InputField;
  iHaveChildren?:InputFieldWithSelect;
  wantChildren?:InputFieldWithSelect;
  smoker?:InputFieldWithSelect;
  drinker?:InputFieldWithSelect;
  relationshipStatus?:InputFieldWithSelect;
  education?:InputFieldWithSelect;
  willingToRelocate?:InputFieldWithSelect;
}

export default FormFields;

