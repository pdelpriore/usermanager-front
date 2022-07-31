import { makeVar } from "@apollo/client";

interface IMessage {
  message?: string;
}

const showMessage = makeVar({} as IMessage);

export default showMessage;
