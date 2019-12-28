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
  searchedValue: any;
  /** @ngInject */
  constructor(private $scope, private $timeout, private $location, private $rootScope) {
    this.buildSectionList();
    this.buildRecentsList();
    this.buildRecentsTextList();
    this.buildTrySreachList();
    this.$rootScope.onAppEvent('$routeUpdate', this.onRouteUpdated.bind(this), this.$scope);
    appEvents.on('show-search-filter', this.showSearch.bind(this), this.$scope);
    appEvents.on('hide-search-filter', this.hideSearch.bind(this), this.$scope);
  }

  buildSectionList() {
    this.sections = [];
    this.sections.push({
      title: 'Students',
      id: 'students',
      url: 'plugins/ems-search-plugin/page/students',
    });
    this.sections.push({
      title: 'Teachers',
      id: 'teachers',
      url: 'plugins/ems-search-plugin/page/teachers',
    });
    this.sections.push({
      title: 'Staff',
      id: 'staff',
      url: 'plugins/ems-search-plugin/page/staffs',
    });
    this.sections.push({
      title: 'Vehicle',
      id: 'vehicle',
      url: 'plugins/ems-search-plugin/page/vehicles',
    });
  }

  onRouteUpdated() {
    this.viewId = this.$location.search().entity;
  }

  getUrl(section) {
    return section.url + '?value=' + this.searchedValue;
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
    scope: {
      searchedValue: '=',
    },
  };
}

coreModule.directive('dashboardSearchFilter', searchFilterDirective);
