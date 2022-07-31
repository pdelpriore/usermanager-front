export const userInputItems = [
  {
    name: "email",
    type: "email",
    placeholder: "jankowalski@gmail.com",
    label: "Email",
  },
  {
    name: "password",
    type: "text",
    label: "Hasło",
    disabled: true,
  },
  {
    name: "type",
    type: "text",
    label: "Typ użytkownika",
    disabled: true,
  },
];

export const adminProfileInputItems = [
  {
    name: "login",
    type: "text",
    placeholder: "login",
    label: "Login",
  },
];

export const userProfileInputItems = [
  {
    name: "firstName",
    type: "text",
    placeholder: "Jan",
    label: "Imię",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Kowalski",
    label: "Nazwisko",
  },
];

export const userFormItems = {
  ADMIN: userInputItems.concat(adminProfileInputItems),
  USER: userInputItems.concat(userProfileInputItems),
};

export const userEditInputItems = [
  {
    name: "email",
    type: "email",
    placeholder: "jankowalski@gmail.com",
    label: "Email",
  },
  {
    name: "password",
    type: "text",
    label: "Hasło",
  },
];

export const activityFormItems = [
  {
    name: "steps",
    type: "number",
    placeholder: "5000",
    label: "Ile dzisiaj kroków ?",
  },
];
