import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../plugins/firebase";

export class UserRepository {
    async login(email: string, password: string) {
            return new Promise(async (resolve, reject) => { 
                await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                resolve(userCredential.user);
            }).catch((error) => {
                reject(error.code)
            });
        })
    }

    async logout() {
        signOut(auth).catch((error) => {
            console.log(error);
        });
    }

    async createUser(email: string, password: string) {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return userCredential.user;
            })
            .catch((error) => {
                console.log(error)
            });
    }

}