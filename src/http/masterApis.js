import { fetchApi } from "./api";
import Apis from "./constant";

class FetchData {
    async getUsers(params) {
        return fetchApi.post(Apis.master.users.getUsers, params);
    }
    async getRegion(params) {
        return fetchApi.post(Apis.master.region.getRegion, params);
    }
    async createRegion(data) {
        return fetchApi.post(Apis.master.region.manageRegion, data);
    }

    async manageRole(data) {
        return fetchApi.post(Apis.master.role.manageRole,data);
    }
    async getRole(data) {
        return fetchApi.post(Apis.master.role.getRole,data);
    }
    async getState(params) {
        return fetchApi.post(Apis.master.states.getStates, params);
    }
    async createState(data) {
        return fetchApi.post(Apis.master.states.manageStates, data);
    }
    async getCity(params) {
        return fetchApi.post(Apis.master.city.getCity, params);
    }
    async createCity(data) {
        return fetchApi.post(Apis.master.city.manageCity, data);
    }


    async getAgeBrackets(params) {
        return fetchApi.post(Apis.master.ageBrackets.getAgeBrackets, params);
    }
    async createAgeBracket(data) {
        return fetchApi.post(Apis.master.ageBrackets.addAgeBracket, data);
    }

    async getContestType(params) {
        return fetchApi.post(Apis.master.contestType.getContestType, params);
    }
    async getCategories(params) {
        return fetchApi.post(Apis.master.categories.getCategories, params);
    }
    async getJudgingParameters(params) {
        return fetchApi.post(Apis.master.judgingParameters.getJudgingParameters, params);
    }
    
    
}

export default new FetchData();
