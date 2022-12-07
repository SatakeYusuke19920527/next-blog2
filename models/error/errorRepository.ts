export class ErrorRepository {
    getErrorText(errTxt: string): string{
        switch (errTxt) {
            case errorConfig.invalidEmail.key:
                return errorConfig.invalidEmail.message
            case errorConfig.wrongPassword.key:
                return errorConfig.wrongPassword.message
            case errorConfig.userDisabled.key:
                return errorConfig.userDisabled.message
            case errorConfig.userNotFound.key:
                return errorConfig.userNotFound.message
            case errorConfig.tooManyRequests.key:
                return errorConfig.tooManyRequests.message
            case errorConfig.alreadyInUse.key:
                return errorConfig.alreadyInUse.message
            case errorConfig.weakPassword.key:
                return errorConfig.weakPassword.message
            case errorConfig.internalError.key:
                return errorConfig.internalError.message
            default:
                return "不明なエラーです。"
        }
    }
}

const errorConfig = {
    invalidEmail: {key: "auth/invalid-email", message: "メールアドレスの形式に問題があります。"},
    wrongPassword: { key: "auth/wrong-password", message: "メールアドレスまたはパスワードに不正があります。" },
    userDisabled: { key: "auth/user-disabled", message: "ユーザが無効になっています。" },
    userNotFound: { key: "auth/user-not-found", message: "存在しないユーザです。" },
    tooManyRequests: { key: "auth/too-many-requests", message: "パスワード入力失敗回数が上限を超えました。" },
    alreadyInUse: {key: "auth/email-already-in-use", message: "入力されたメールアドレスは既に登録されています。"},
    weakPassword: { key: "auth/weak-password", message: "パスワードは6文字以上且つ大文字小文字を含む文字列にしてください。" },
    internalError: {key: "auth/internal-error", message: "入力された値に不正があります。"},
}