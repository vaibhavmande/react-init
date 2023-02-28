function formValidations(target: string) {
  function isMinLength(minLength: number) {
    return target.length >= minLength;
  }
  return {
    'min-length': isMinLength,
  };
}

export { formValidations };
