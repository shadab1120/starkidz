import { fetchApi } from "./api";
import Apis from "./constant";

class FetchData {
  async updateUser(data) {
    return fetchApi.post(Apis.master.users.updateUser, data);
  }

  async getUser(params) {
    return fetchApi.post(Apis.users.getUserInfo, params);
  }
}

export default new FetchData();
