import { fetchApi } from "./api";
import Apis from "./constant";

class FetchData {
  async createContest(data) {
    return fetchApi.post(Apis.contest.create_contest, data);
  }

  async getContestList() {
    return fetchApi.get(Apis.contest.get_contest);
  }
  async getContest({queryKey}) {
    const [_, contestId] = queryKey
    return fetchApi.get(`${Apis.contest.get_contest}?id=${contestId}`);
  }
  async manageContest(data) {
    return fetchApi.post(Apis.contest.manageContest, data);
  }
}

export default new FetchData();
