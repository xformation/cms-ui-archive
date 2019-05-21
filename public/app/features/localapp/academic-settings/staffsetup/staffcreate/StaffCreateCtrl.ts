import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';

export class StaffCreateCtrl {
  navModel: any;
  sections: any[];
  activeTabPersonalIndex = 0;
  activeTabContactIndex = 0;
  activeTabPrimaryIndex = 0;
  activeBtnIndex = 0;
  profileSrc = '/public/img/cubes.png';
  isTeacherProfileChanged = false;
  $scope: any;
  teachers: any;
  departments: any;
  branches: any;
  RestUrl: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabPersonalIndex = 0;
    this.activeTabContactIndex = 0;
    this.activeTabPrimaryIndex = 0;
    this.activeBtnIndex = 0;
    this.$scope = $scope;
    $scope.getFile = this.getFile.bind(this);

    this.getTeachers();
    this.getDepartments();
    this.getBranches();
    $scope.create = () => {
      if (!$scope.teacherForm.$valid) {
        return;
      }
      backendSrv.post(this.RestUrl.getTeacherRestUrl(), $scope.teacher).then(() => {});
    };
  }

  getFile(file) {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    const that = this;
    fileReader.onloadend = e => {
      that.profileSrc = e.target['result'];
      this.$scope.$apply();
    };
    fileReader.readAsDataURL(file);
    this.isTeacherProfileChanged = true;
  }

  getTeachers() {
    this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(result => {
      this.teachers = result;
    });
  }

  getDepartments() {
    this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(result => {
      this.departments = result;
    });
  }
  getBranches() {
    this.backendSrv.get(this.RestUrl.getBranchRestUrl()).then(result => {
      this.branches = result;
    });
  }

  activateTabPersonal(tabIndex) {
    this.activeTabPersonalIndex = tabIndex;
  }

  activateTabContact(tabIndex) {
    this.activeTabContactIndex = tabIndex;
  }

  activateTabPrimary(tabIndex) {
    this.activeTabPrimaryIndex = tabIndex;
  }

  activateBtn(tabIndex) {
    this.activeBtnIndex = tabIndex;
  }
}
