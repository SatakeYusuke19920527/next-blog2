import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../plugins/firebase";

export class UserRepository {
    async login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
          console.log("🚀 ~ file: userRepository.ts:13 ~ UserRepository ~ returnsignInWithEmailAndPassword ~ userCredential.user", userCredential.user) 
          console.log("ログイン成功：[",`${userCredential.user.displayName}`, "] 様 おかえりなさい。")
          return userCredential.user;
        }).catch((error) => {
            console.log(error)
            throw Error("ログイン処理でエラーが発生しました。")
        });
    }

    async logout() {
        signOut(auth).catch((error) => {
            console.log(error);
            throw Error("ログアウト処理時にエラーが発生しました。")
        });
    }

    async createUser(email: string, password: string) {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return userCredential.user;
            })
            .catch((error) => {
                console.log(error)
                throw Error("ユーザー作成中にÏエラーが発生しました。")
            });
    }

}