import { fetchApi } from "./api";
import Apis from "./constant";

class FetchData {
    async getUsers(params) {
        return fetchApi.post(Apis.master.users.getUsers, params);
    }
    async getRegion({ queryKey }) {
        const [_, regionId] = queryKey
        return fetchApi.get(`${Apis.master.region.getRegion}?id=${regionId}`);
    }
    async getRegionList(params) {
        return fetchApi.post(Apis.master.region.getRegion, params);
    }
    async manageRegion(data) {
        return fetchApi.post(Apis.master.region.manageRegion, data);
    }

    async manageRole(data) {
        return fetchApi.post(Apis.master.role.manageRole, data);
    }
    async updateRole(data) {
        return fetchApi.post(Apis.master.role.changeRole, data);
    }
    async getRole(data) {
        return fetchApi.post(Apis.master.role.getRole, data);
    }
    async getStateList(params) {
        return fetchApi.post(Apis.master.states.getStates, params);
    }
    async getState({ queryKey }) {
        const [_, stateId] = queryKey
        return fetchApi.get(`${Apis.master.states.getStates}?id=${stateId}`);
    }
    async manageState(data) {
        return fetchApi.post(Apis.master.states.manageStates, data);
    }
    async getCity({ queryKey }) {
        const [_, cityId] = queryKey
        return fetchApi.get(`${Apis.master.city.getCity}?id=${cityId}`);
    }
    async getCityList(params) {
        return fetchApi.get(Apis.master.city.getCity, params);
    }
    async manageCity(data) {
        return fetchApi.post(Apis.master.city.manageCity, data);
    }

    async getDistrict({ queryKey }) {

        const [_, districtId] = queryKey
        return fetchApi.get(`${Apis.master.district.getDistrict}?id=${districtId}`);
    }
    async getDistrictList(params) {
        return fetchApi.get(Apis.master.district.getDistrict, params);
    }
    async manageDistrict(data) {
        return fetchApi.post(Apis.master.district.manageDistrict, data);
    }
    async getPrize({ queryKey }) {

        const [_, districtId] = queryKey
        return fetchApi.get(`${Apis.master.prize.getPrize}?id=${districtId}`);
    }
    async getPrizeList(params) {
        return fetchApi.get(Apis.master.prize.getPrize, params);
    }
    async managePrize(data) {
        return fetchApi.post(Apis.master.prize.managePrize, data);
    }


    async getAgeBrackets({ queryKey }) {
        const [_, bracketId] = queryKey
        return fetchApi.get(`${Apis.master.ageBrackets.getAgeBrackets}?id=${bracketId}`);
    }
    async getAgeBracketsList(params) {
        return fetchApi.post(Apis.master.ageBrackets.getAgeBrackets, params);
    }

    async manageAgeBracket(data) {
        return fetchApi.post(Apis.master.ageBrackets.addAgeBracket, data);
    }

    async getContestType(params) {
        return fetchApi.post(Apis.master.contestType.getContestType, params);
    }
    async getContestTypeList(params) {
        return fetchApi.post(Apis.master.contestType.getContestType, params);
    }
    async manageContestType(data) {
        return fetchApi.post(Apis.master.contestType.manageContestType, data);
    }

    async getCategoriesContest({ queryKey }) {
        const [_, categoryId] = queryKey
        return fetchApi.get(`${Apis.master.categories.getCategories}?id=${categoryId}`);
    }
    async getCategoriesContestList(params) {
        return fetchApi.post(Apis.master.categories.getCategories, params);
    }
    async manageCategoriesContest(data) {
        return fetchApi.post(Apis.master.categories.manageCategories, data);
    }

    async getJudgingParameters({ queryKey }) {
        const [_, judgeId] = queryKey
        return fetchApi.get(`${Apis.master.judgingParameters.getJudgingParameters}?id=${judgeId}`);
    }
    async getJudgingParametersList(params) {
        return fetchApi.post(Apis.master.judgingParameters.getJudgingParameters, params);
    }
    async manageJudgingParameters(params) {
        return fetchApi.post(Apis.master.judgingParameters.manageJudgingParameters, params);
    }

    async getClassSectionHouseStream({ queryKey }) {
        const [_, sectionId, module] = queryKey
        console.log('queryKey', queryKey)
        return fetchApi.get(`${Apis.master.section.getClassSectionHouseStream}?id=${sectionId}&module=${module}`);
    }
    async getClassSectionHouseStreamList({ queryKey }) {
        const [_, module] = queryKey
        return fetchApi.get(`${Apis.master.section.getClassSectionHouseStream}?module=${module}`);
    }
    async manageClassSectionHouseStream(params) {
        return fetchApi.post(Apis.master.section.manageClassSectionHouseStream, params);
    }
}

export default new FetchData();
