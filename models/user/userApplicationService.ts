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