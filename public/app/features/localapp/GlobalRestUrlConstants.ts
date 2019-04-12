export class GlobalRestUrlConstants {
  PROTOCOL: string;
  IP: string;
  PORT: string;
  ROOT_API: string;
  BASE_URL: string;
  constructor() {
    this.PROTOCOL = 'http';
    this.IP = '18.234.66.133'; //18.234.66.133
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
  getBranchesByCollegeIdRestUrl() {
    return this.getBaseRestUrl() + '/cmsbranches-collegeid/';
  }
  getLegalEntitiesRestUrl() {
    return this.getBaseRestUrl() + '/cmslegal-entities/';
  }
  getAuthorizedSignatoryRestUrl() {
    return this.getBaseRestUrl() + '/cmsauthorized-signatories/';
  }
  getAuthorizedSignatoriesByCollegeIdRestUrl() {
    return this.getBaseRestUrl() + '/cmsauthorized-signatories-collegeid/';
  }
  getBankAccountRestUrl() {
    return this.getBaseRestUrl() + '/cmsbank-accounts/';
  }
  getBankAccountsByCollegeIdRestUrl() {
    return this.getBaseRestUrl() + '/cmsbank-accounts-collegeid/';
  }
  getAcademicYearRestUrl() {
    return this.getBaseRestUrl() + '/cmsacademic-years/';
  }
  getDepartmentRestUrl() {
    return this.getBaseRestUrl() + '/departments/';
  }
  getBatchRestUrl() {
    return this.getBaseRestUrl() + '/batches/';
  }
  getTeacherRestUrl() {
    return this.getBaseRestUrl() + '/teachers/';
  }
  getHolidayRestUrl() {
    return this.getBaseRestUrl() + '/holidays/';
  }
  getTermRestUrl() {
    return this.getBaseRestUrl() + '/terms/';
  }
  getSubjectRestUrl() {
    return this.getBaseRestUrl() + '/subjects/';
  }

  getCmsDepartmentRestUrl() {
    return this.getBaseRestUrl() + '/cmsdepartments/';
  }
}
