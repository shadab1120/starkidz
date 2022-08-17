import { fetchApi } from "./api";
import Apis from "./constant";

class FetchData {
  async createContest(data) {
    return await fetchApi.post(Apis.contest.create_contest, data);
  }

  async getContest() {
    return await fetchApi.get(Apis.contest.get_contest);
  }
}

export default new FetchData();
