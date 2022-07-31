export const adminModel = {
  userInput: {
    email: "",
    password: "",
    type: "",
  },
  adminProfileInput: {
    login: "",
  },
};

export const userModel = {
  userInput: {
    email: "",
    password: "",
    type: "",
  },
  userProfileInput: {
    firstName: "",
    lastName: "",
  },
};

export const adminInputKeys = ["email", "password", "type", "login"];
export const userInputKeys = [
  "email",
  "password",
  "type",
  "firstName",
  "lastName",
];

export const inputKeys = {
  ADMIN: adminInputKeys,
  USER: userInputKeys,
};

export const model = {
  ADMIN: adminModel,
  USER: userModel,
};

export const getUserInputModel = (userType: string) =>
  model[userType as keyof typeof model];

export const getUserInputKeys = (userType: string) =>
  inputKeys[userType as keyof typeof inputKeys];
