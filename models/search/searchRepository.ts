import axios from "axios";

export class SearchRepository {
    async search(context: string) {
        return new Promise((resolve, reject) => {
      axios.post('/api/search', {test: "test message"})
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    };
};