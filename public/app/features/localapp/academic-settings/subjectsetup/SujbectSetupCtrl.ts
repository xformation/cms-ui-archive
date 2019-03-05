import { appEvents } from 'app/core/core';

export class SubjectSetupCtrl {
  subjects: any;
  teachers: any;
  departments: any;
  batches: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    this.getSubjects();
    this.getDepartments();
    this.getTeachers();
    this.getBatches();
    $scope.create = () => {
      if (!$scope.subjectForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/subjects/', $scope.subject).then(() => {
        this.getSubjects();
      });
    };
    $scope.update = () => {
      if (!$scope.subjectForm.$valid) {
        return;
      }
      backendSrv.put('http://localhost:8080/api/subjects/', $scope.subject).then(() => {
        this.getSubjects();
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getSubjects() {
    this.backendSrv.get(`http://localhost:8080/api/subjects/`).then(result => {
      this.subjects = result;
      console.log('Subjects', this.subjects);
    });
  }
  getDepartments() {
    this.backendSrv.get(`http://localhost:8080/api/departments/`).then(result => {
      this.departments = result;
      console.log('departments', this.departments);
    });
  }
  getTeachers() {
    this.backendSrv.get(`http://localhost:8080/api/teachers/`).then(result => {
      this.teachers = result;
      console.log('teachers', this.teachers);
    });
  }
  getBatches() {
    this.backendSrv.get(`http://localhost:8080/api/batches/`).then(result => {
      this.batches = result;
      console.log('Batches', this.batches);
    });
  }

  deleteSubject(subject) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete ' + subject.subjectDesc + '?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        this.backendSrv.delete('http://localhost:8080/api/subjects/' + subject.id).then(() => {
          this.getSubjects();
        });
      },
    });
  }

  editSubject(subject) {
    appEvents.emit('subject-modal', {
      icon: 'fa-trash',
      text: 'update',
      subject: subject,
      onUpdate: (subjectForm, subject) => {
        this.$scope.subjectForm = subjectForm;
        this.$scope.subject = subject;
        this.$scope.update();
      },
    });
  }

  showModal() {
    // const text = 'Do you want to delete the ';

    appEvents.emit('subject-modal', {
      text: 'create',
      icon: 'fa-trash',
      departments: this.departments,
      onCreate: (subjectForm, subject) => {
        this.$scope.subjectForm = subjectForm;
        this.$scope.subject = subject;
        this.$scope.create();
      },
    });
  }
}
