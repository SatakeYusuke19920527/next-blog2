import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../plugins/firebase";
import { UserType } from "../../types/types";

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

    async saveUserForFirestore(user: UserType) {
        const { uid, displayName, email, address, phone_number, occupation, company } = user
        return new Promise(async (resolve, reject) => {
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    uid,
                    displayName,
                    email,
                    created_at: serverTimestamp(),
                    isDeleted: false,
                    address,
                    phone_number,
                    occupation,
                    company
                });
                console.log("Document written with ID: ", docRef.id);  
                resolve(user)
            } catch (error: any) {
                console.log("🚀 ~ file: userRepository.ts:67 ~ UserRepository ~ returnnewPromise ~ error", error)
                reject(error.code)
            }
        });
    }

    async resetPassword(email: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await sendPasswordResetEmail(auth, email)
                resolve(res)
            } catch (error: any) {
                console.log("🚀 ~ file: userRepository.ts:81 ~ UserRepository ~ resetPassword ~ error", error)
                reject(error.code)
            }
        });
    }
}