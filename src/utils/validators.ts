export type validatorType = (value: string) => string | undefined

export const required: validatorType = (value) => {
  if (value) {
    return undefined;
  }
  return "Field is required";
}

export const maxLengthCreator = (maxLength: number): validatorType => (value) => {
  if (value && value.length > maxLength) {
    return `Max length is ${maxLength} symbols`;
  }
  return undefined;
}