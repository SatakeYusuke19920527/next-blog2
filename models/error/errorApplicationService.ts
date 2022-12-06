import { ErrorRepository } from "./errorRepository";

export const getErrorText = (errTxt: string) => {
    const repo =  new ErrorRepository();
    return repo.getErrorText(errTxt);
}