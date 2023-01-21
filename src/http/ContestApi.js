import { fetchApi } from "./api";
import Apis from "./constant";

class FetchData {
  async createContest(data) {
    return fetchApi.post(Apis.contest.create_contest, data);
  }

  async getContestList() {
    return fetchApi.get(Apis.contest.get_contest);
  }
  async getContest({ queryKey }) {
    const [_, contestId] = queryKey
    return fetchApi.get(`${Apis.contest.get_contest}?id=${contestId}`);
  }

  async getContestByRole({ queryKey }) {
    const [_, contestId, judgeId] = queryKey
    const id = contestId ? `&id=${contestId}` : ``
    return fetchApi.get(`${Apis.contest.get_contest}?judge=${judgeId}${id}`);
  }

  async getContestEntryById({ queryKey }) {
    const [id] = queryKey
    return fetchApi.get(`${Apis.contest.getAppliedContest}?contest_id=${id}`);
  }

  async manageContest(data) {
    return fetchApi.post(Apis.contest.manageContest, data);
  }

  async submitJudgeEntries(data) {
    return fetchApi.post(Apis.contest.manageSubmitJudgeEntry, data);
  }
}

export default new FetchData();
