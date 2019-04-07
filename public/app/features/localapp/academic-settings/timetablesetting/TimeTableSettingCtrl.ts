import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class TimeTableSettingCtrl {
  navModel: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  departments: any;
  batches: any;
  teachers: any;
  colleges: any;
  clgObject: any;
  collegeId: any;
  counter: any;
  totalLectures: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.counter = 0;
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.clgObject = {};
    this.getDepartments();
    this.getBatches();
    this.getTeachers();
    this.getColleges();
    this.getBranchesByCollegeId();
    this.collegeId = 0;
    $scope.choices = [];
    this.totalLectures = [];
    const counter = 5;
    $scope.addNewChoice = () => {
      const newItemNo = $scope.choices.length + 1;
      for (let i = 0; i < counter; i++) {
        $scope.choices.push({ id: 'choice' + newItemNo, name: 'choice' + newItemNo });
      }
    };

    $scope.removeNewChoice = () => {
      const newItemNo = $scope.choices.length - 1;
      if (newItemNo !== 0) {
        $scope.choices.pop();
      }
    };

    $scope.showAddChoice = choice => {
      return choice.id === $scope.choices[$scope.choices.length - 1].id;
    };

    $scope.choices = [];

    $scope.addNewChoice = () => {
      const newItemNo = $scope.choices.length + 1;
      for (let i = 0; i < 3; i++) {
        $scope.choices.push({ newItemNo });
      }
    };

    $scope.removeNewChoice = () => {
      const newItemNo = $scope.choices.length - 1;
      if (newItemNo !== 0) {
        $scope.choices.pop();
      }
    };

    $scope.showAddChoice = choice => {
      return choice.id === $scope.choices[$scope.choices.length - 1].id;
    };
  }

  activateTab(tabIndex) {
    //this.activeTabIndex = tabIndex;
  }

  changeCounter(opt) {
    if (opt === 'plus') {
      this.counter = this.counter + 1;
    }
    if (opt === 'minus' && this.counter > 0) {
      this.counter = this.counter - 1;
    }
  }

  addRows() {
    if (this.totalLectures.length !== this.counter) {
      this.totalLectures.length = 0;
      for (let i = 0; i < this.counter; i++) {
        this.totalLectures.push({ i });
      }
    }
  }

  getDepartments() {
    this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(result => {
      this.departments = result;
      console.log('Departments ::::::: ', this.departments);
    });
  }

  getBatches() {
    this.backendSrv.get(this.RestUrl.getBatchRestUrl()).then(result => {
      this.batches = result;
    });
  }

  getTeachers() {
    this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(result => {
      this.teachers = result;
    });
  }

  getColleges() {
    this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(result => {
      this.colleges = result;
    });
  }

  getBranchesByCollegeId() {
    this.backendSrv.get(this.RestUrl.getBranchesByCollegeIdRestUrl() + this.collegeId).then(result => {
      this.clgObject.branches = result;
    });
  }

  onChangeCollege() {
    this.getBranchesByCollegeId();
    //const { branches } = this.clgObject;
    const selectedBranches = [];
    for (const i in this.clgObject.branches) {
      const branch = this.clgObject.branches[i];
      selectedBranches.push(branch);
    }
    this.clgObject.selectedBranches = selectedBranches;
    //this.getBranchesByCollegeId();
  }
}
