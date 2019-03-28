export class GlobalRestUrlConstants {
  PROTOCOL: string;
  IP: string;
  PORT: string;
  ROOT_API: string;
  BASE_URL: string;
  constructor() {
    this.PROTOCOL = 'http';
    this.IP = 'localhost';
    this.PORT = '8080';
    this.ROOT_API = 'api';
    this.BASE_URL = this.PROTOCOL + '://' + this.IP + ':' + this.PORT + '/' + this.ROOT_API;
  }
  getBaseRestUrl() {
    return this.BASE_URL;
  }
  getCollegeRestUrl() {
    return this.getBaseRestUrl() + '/cmscollege/';
  }
  getStateRestUrl() {
    return this.getBaseRestUrl() + '/states/';
  }
  getCityRestUrl() {
    return this.getBaseRestUrl() + '/cities/';
  }
  getBranchRestUrl() {
    return this.getBaseRestUrl() + '/cmsbranches/';
  }
  getLegalEntitiesRestUrl() {
    return this.getBaseRestUrl() + '/legal-entities/';
  }
  getAuthorizedSignatoryRestUrl() {
    return this.getBaseRestUrl() + '/authorized-signatories/';
  }
  getBankAccountRestUrl() {
    return this.getBaseRestUrl() + '/bank-accounts/';
  }
}
