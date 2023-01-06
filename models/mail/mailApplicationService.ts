import { MailType } from "../../types/types";
import { MailRepository } from "./mailRepository";

export const sendEmail = async (mail: MailType) => {
    try {
        const repo =  new MailRepository();
        await repo.sendEmail(mail)
    } catch (err) {
        return err
    }
}