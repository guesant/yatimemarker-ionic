import { ITrain } from "../../../Interfaces/ITrain";

export const extractField = (document: any, fieldName: string) => {
  switch (fieldName) {
    case "steps":
      return (document as ITrain).steps
        .map(({ meta: { description } }) => description)
        .join(" ");
    default:
      return fieldName
        .split(".")
        .reduce((doc, key) => doc && (doc as any)[key], document);
  }
};
