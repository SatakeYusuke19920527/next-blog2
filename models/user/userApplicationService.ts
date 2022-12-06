import { UserRepository } from "./userRepository";


export const login = async (email: string, password: string) => {
    try {
        const repo = new UserRepository();
        await repo.login(email, password);   
    } catch (err) {
        return err
    }
};

export const logout = async ():Promise<void> => {
    const repo =  new UserRepository();
    await repo.logout();
}

export const createUser = async (email: string, password:string): Promise<void> => {
    const repo =  new UserRepository();
    await repo.createUser(email, password);
    return;
}