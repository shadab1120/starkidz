/* eslint-disable class-methods-use-this */
import axios from "axios";
import ApiUrls from "./constant";

export const fetchApi = axios.create({
  // baseURL: "/api",
  baseURL: process.env.REACT_APP_NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Credentials": "true",
  },
});

class FetchData {
  async getAgeBrackets() {
    return fetchApi.get(ApiUrls.master.ageBrackets.getAgeBrackets);
  }

  async addAgeBracket(data) {
    return fetchApi.post(ApiUrls.master.ageBrackets.addAgeBracket, data);
  }

  async getRegion() {
    return fetchApi.get(ApiUrls.master.region.getRegion);
  }

  async manageRegion(data) {
    return fetchApi.post(ApiUrls.master.region.manageRegion, data);
  }

  async getUsers() {
    return fetchApi.get(ApiUrls.master.users.getUsers);
  }

  async createUser(data) {
    return fetchApi.post(ApiUrls.master.users.createUser, data);
  }

  async getStates() {
    return fetchApi.get(ApiUrls.master.states.getStates);
  }

  async manageStates(data) {
    return fetchApi.post(ApiUrls.master.states.manageStates, data);
  }

  async getRejectionReasons() {
    return fetchApi.get(ApiUrls.master.rejectionReasons.getRejectionReasons);
  }

  async manageRejectionReasons(data) {
    return fetchApi.post(ApiUrls.master.rejectionReasons.manageRejectionReasons, data);
  }

  async getCategories() {
    return fetchApi.get(ApiUrls.master.categories.getCategories);
  }

  async manageCategories(data) {
    return fetchApi.post(ApiUrls.master.categories.manageCategories, data);
  }

  async getCity() {
    return fetchApi.get(ApiUrls.master.city.getCity);
  }

  async manageCity(data) {
    return fetchApi.post(ApiUrls.master.city.manageCity, data);
  }

  async getContestType() {
    return fetchApi.get(ApiUrls.master.contestType.getContestType);
  }

  async manageContestType(data) {
    return fetchApi.post(ApiUrls.master.contestType.manageContestType, data);
  }

  async getGallery() {
    return fetchApi.post(ApiUrls.master.gallery.getGallery);
  }

  async manageGallery(data) {
    return fetchApi.post(ApiUrls.master.gallery.manageGallery, data);
  }

  async getJudgingParameters() {
    return fetchApi.get(ApiUrls.master.judgingParameters.getJudgingParameters);
  }

  async manageJudgingParameters(data) {
    return fetchApi.post(ApiUrls.master.judgingParameters.manageJudgingParameters, data);
  }

  async getPrize() {
    return fetchApi.get(ApiUrls.master.prize.getPrize);
  }

  async managePrize(data) {
    return fetchApi.post(ApiUrls.master.prize.managePrize, data);
  }

  async getStarBucks() {
    return fetchApi.get(ApiUrls.master.starBucks.getStarBucks);
  }

  async manageStarBucks(data) {
    return fetchApi.post(ApiUrls.master.starBucks.manageStarBucks, data);
  }

  async login(data) {
    return fetchApi.post(ApiUrls.auth.login, data);
  }

  async registerUser(data) {
    return fetchApi.post(ApiUrls.auth.register, data);
  }

  async forgotPassword(data) {
    return fetchApi.post(ApiUrls.auth.forgotPassword, data);
  }
}

export default new FetchData();
