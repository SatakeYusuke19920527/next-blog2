import { MailType } from "../../types/types";
import { UserRepository } from "./mailRepository";

export const sendEmail = async (mail: MailType) => {
    try {
        const repo =  new UserRepository();
        await repo.sendEmail(mail)
    } catch (err) {
        return err
    }
}