var GlobalRestUrlConstants = /** @class */ (function () {
    function GlobalRestUrlConstants() {
        this.PROTOCOL = 'http';
        this.IP = '18.234.66.133'; //18.234.66.133
        this.PORT = '8080';
        this.ROOT_API = 'api';
        this.BASE_URL = this.PROTOCOL + '://' + this.IP + ':' + this.PORT + '/' + this.ROOT_API;
    }
    GlobalRestUrlConstants.prototype.getBaseRestUrl = function () {
        return this.BASE_URL;
    };
    GlobalRestUrlConstants.prototype.getCollegeRestUrl = function () {
        return this.getBaseRestUrl() + '/cmscollege/';
    };
    GlobalRestUrlConstants.prototype.getStateRestUrl = function () {
        return this.getBaseRestUrl() + '/states/';
    };
    GlobalRestUrlConstants.prototype.getCityRestUrl = function () {
        return this.getBaseRestUrl() + '/cities/';
    };
    GlobalRestUrlConstants.prototype.getBranchRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsbranches/';
    };
    GlobalRestUrlConstants.prototype.getBranchesByCollegeIdRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsbranches-collegeid/';
    };
    GlobalRestUrlConstants.prototype.getLegalEntitiesRestUrl = function () {
        return this.getBaseRestUrl() + '/cmslegal-entities/';
    };
    GlobalRestUrlConstants.prototype.getAuthorizedSignatoryRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsauthorized-signatories/';
    };
    GlobalRestUrlConstants.prototype.getAuthorizedSignatoriesByCollegeIdRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsauthorized-signatories-collegeid/';
    };
    GlobalRestUrlConstants.prototype.getBankAccountRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsbank-accounts/';
    };
    GlobalRestUrlConstants.prototype.getBankAccountsByCollegeIdRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsbank-accounts-collegeid/';
    };
    GlobalRestUrlConstants.prototype.getAcademicYearRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsacademic-years/';
    };
    GlobalRestUrlConstants.prototype.getDepartmentRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsdepartments/';
    };
    GlobalRestUrlConstants.prototype.getDepartmentByBranchIdRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsdepartments-branchid/';
    };
    GlobalRestUrlConstants.prototype.getBatchRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsbatches/';
    };
    GlobalRestUrlConstants.prototype.getBatchByDepartmentIdRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsbatches-departmentid/';
    };
    GlobalRestUrlConstants.prototype.getTeacherRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsteachers/';
    };
    GlobalRestUrlConstants.prototype.getTeacherByQueryParamsRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsteachers-qryprms?';
    };
    GlobalRestUrlConstants.prototype.getHolidayRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsholidays/';
    };
    GlobalRestUrlConstants.prototype.getTermRestUrl = function () {
        return this.getBaseRestUrl() + '/cmsterms/';
    };
    GlobalRestUrlConstants.prototype.getSubjectRestUrl = function () {
        return this.getBaseRestUrl() + '/cmssubjects/';
    };
    GlobalRestUrlConstants.prototype.getSubjectByDeptBatchIdRestUrl = function () {
        return this.getBaseRestUrl() + '/cmssubjects?';
    };
    GlobalRestUrlConstants.prototype.getSemesterRestUrl = function () {
        return this.getBaseRestUrl() + '/cmssemesters/';
    };
    GlobalRestUrlConstants.prototype.getSectionRestUrl = function () {
        return this.getBaseRestUrl() + '/cmssections/';
    };
    GlobalRestUrlConstants.prototype.getSectionByBatchRestUrl = function () {
        return this.getBaseRestUrl() + '/cmssections-batchid/';
    };
    GlobalRestUrlConstants.prototype.getCmsLecturesUrl = function () {
        return this.getBaseRestUrl() + '/cmslectures?';
    };
    return GlobalRestUrlConstants;
}());
export { GlobalRestUrlConstants };
//# sourceMappingURL=GlobalRestUrlConstants.js.map