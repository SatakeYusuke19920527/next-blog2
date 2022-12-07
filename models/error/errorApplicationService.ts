import { ErrorRepository } from "./errorRepository";

export const getErrorText = (errTxt: string) => {
    try {
        const repo =  new ErrorRepository();
        return repo.getErrorText(errTxt);
    } catch (err) {
        return err
    }
}