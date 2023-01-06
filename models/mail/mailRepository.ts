import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../plugins/firebase";
import { MailType } from "../../types/types";

export class MailRepository {
    async sendEmail(mail: MailType) {
        const { uname, email, content } = mail
        return new Promise(async (resolve, reject) => {
            try {
                const docRef = await addDoc(collection(db, "mail"), {
                    uid: mail.uid ? mail.uid : "",
                    uname,
                    project: mail.project ? mail.project : "",
                    url: mail.url ? mail.url : "",
                    email,
                    content,
                    created_at: serverTimestamp(),
                });
                console.log("Success!! written with ID: ", docRef.id);  
                resolve(mail)
            } catch (error) {
                console.log("🚀 ~ file: userRepository.ts:67 ~ UserRepository ~ returnnewPromise ~ error", error)
                reject("不明なエラーです。")
            }
        });
    }
}