import { UserType } from "../../types/types";
import { UserRepository } from "./userRepository";


export const login = async (email: string, password: string) => {
    try {
        const repo = new UserRepository();
        await repo.login(email, password);   
    } catch (err) {
        return err
    }
};

export const logout = async () => {
    try {
        const repo =  new UserRepository();
        await repo.logout();
    } catch (err) {
        return err
    }
}

export const createUser = async (email: string, password:string, displayName: string) => {
    try {
        const repo =  new UserRepository();
        await repo.createUser(email, password, displayName);
    } catch (err) {
        return err
    }
}

export const saveUserForFirestore = async (user: UserType) => {
    try {
        const repo =  new UserRepository();
        await repo.saveUserForFirestore(user)
    } catch (err) {
        return err
    }
}

export const resetPassword = async (email: string) => {
    try {
        const repo =  new UserRepository();
        await repo.resetPassword(email)
    } catch (err) {
        console.log("🚀 ~ file: userApplicationService.ts:46 ~ resetPassword ~ err", err)
        return err
    }
}