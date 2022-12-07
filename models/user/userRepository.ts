import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../plugins/firebase";

export class UserRepository {
    async login(email: string, password: string) {
        return new Promise(async (resolve, reject) => {
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                resolve(userCredential.user);
            }).catch((error) => {
                reject(error.code)
            });
        });
    };

    async logout() {
        signOut(auth).catch((error) => {
            console.log(error);
        });
    }

    async createUser(email: string, password: string, displayName: string) {
        return new Promise(async (resolve, reject) => {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    resolve(userCredential.user);
                })
                .then(async () => {
                    const user = auth.currentUser
                    if (user !== null) {
                        updateProfile(user, {
                            displayName: displayName
                        }).then(() => {
                            // Profile updated!
                            console.log('Hello!! ', displayName)
                        }).catch((error) => {
                            console.log("🚀 ~ file: userRepository.ts:36 ~ UserRepository ~ .then ~ error", error.code)
                        });
                    };
                })
                .catch((error) => {
                    reject(error.code)
                });
        })
    };
}