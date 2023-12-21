const MINIMUM_CHARS_NAME = 2;

export const validateName = (name: string) => {
  return name.length > MINIMUM_CHARS_NAME;
};

export const validateEmail = (email: string) => {
  const pattern =
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return pattern.test(String(email).toLowerCase());
};
