import { SearchRepository } from "./searchRepository";

export const search = async (context: string) => {
    try {
        const repo = new SearchRepository();
        await repo.search(context);   
    } catch (err) {
        return err
    }
};
