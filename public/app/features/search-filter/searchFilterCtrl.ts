import coreModule from '../../core/core_module';
import appEvents from 'app/core/app_events';

export class SearchFilterCtrl {
  isOpen: boolean;
  top: any;
  giveSearchFocus: number;
  sections: any[];
  viewId: string;
  recents: any[];
  recentsText: any[];
  trySreach: any[];
  /** @ngInject */
  constructor($scope, private $timeout) {
    this.buildSectionList();
    this.buildRecentsList();
    this.buildRecentsTextList();
    this.buildTrySreachList();
    appEvents.on('show-search-filter', this.showSearch.bind(this), $scope);
    appEvents.on('hide-search-filter', this.hideSearch.bind(this), $scope);
  }

  buildSectionList() {
    this.sections = [];
    this.sections.push({
      title: 'Students',
      id: 'students',
    });
    this.sections.push({
      title: 'Teachers',
      id: 'teachers',
    });
    this.sections.push({
      title: 'Subjects',
      id: 'subjects',
    });
    this.sections.push({
      title: 'Content',
      id: 'content',
    });
  }

  onClickSection(section: any) {
    this.viewId = section.id;
  }

  buildRecentsList() {
    this.recents = [];
    this.recents.push({
      title: 'Text 1',
      id: 'text1',
    });
    this.recents.push({
      title: 'Text 2',
      id: 'text2',
    });
    this.recents.push({
      title: 'Text 3',
      id: 'text3',
    });
    this.recents.push({
      title: 'Text 4',
      id: 'text4',
    });
    this.recents.push({
      title: 'Text 5',
      id: 'text5',
    });
  }

  buildRecentsTextList() {
    this.recentsText = [];
    this.recentsText.push({
      title: 'Text 1',
      id: 'text1',
    });
    this.recentsText.push({
      title: 'Text 2',
      id: 'text2',
    });
    this.recentsText.push({
      title: 'Text 3',
      id: 'text3',
    });
    this.recentsText.push({
      title: 'Text 4',
      id: 'text4',
    });
    this.recentsText.push({
      title: 'Text 5',
      id: 'text5',
    });
  }

  buildTrySreachList() {
    this.trySreach = [];
    this.trySreach.push({
      title: 'Text 1',
      id: 'text1',
    });
    this.trySreach.push({
      title: 'Text 2',
      id: 'text2',
    });
    this.trySreach.push({
      title: 'Text 3',
      id: 'text3',
    });
    this.trySreach.push({
      title: 'Text 4',
      id: 'text4',
    });
    this.trySreach.push({
      title: 'Text 5',
      id: 'text5',
    });
  }

  hideSearch() {
    this.isOpen = false;
    const overflowComponent: any = document.querySelector('.scroll-canvas');
    overflowComponent.style.overflow = 'auto';
  }

  showSearch() {
    this.isOpen = true;
    this.giveSearchFocus = 0;
    this.$timeout(() => {
      this.giveSearchFocus = this.giveSearchFocus + 1;
      const overflowComponent: any = document.querySelector('.scroll-canvas');
      overflowComponent.style.overflow = 'hidden';
      const navBar = document.querySelector('.page-nav');
      this.top = navBar.clientHeight;
    }, 100);
  }

  onKeyDownOnSearch(event) {
    if (event.keyCode === 27) {
      this.hideSearch();
    }
  }
}

export function searchFilterDirective() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/search-filter/partials/searchFilterCtrl.html',
    controller: SearchFilterCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    scope: {},
  };
}

coreModule.directive('dashboardSearchFilter', searchFilterDirective);
