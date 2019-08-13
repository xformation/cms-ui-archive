import coreModule from '../../core/core_module';
import appEvents from 'app/core/app_events';

export class SearchFilterCtrl {
    isOpen: boolean;
    giveSearchFocus: number;
    /** @ngInject */
    constructor($scope, private $timeout) {
        appEvents.on('show-search-filter', this.showSearch.bind(this), $scope);
        appEvents.on('hide-search-filter', this.hideSearch.bind(this), $scope);
    }

    hideSearch() {
        this.isOpen = false;
        let overflowComponent: any = document.querySelector(".scroll-canvas");
        overflowComponent.style.overflow = "auto";
    }

    showSearch() {
        this.isOpen = true;
        this.giveSearchFocus = 0;
        this.$timeout(() => {
            this.giveSearchFocus = this.giveSearchFocus + 1;
            let overflowComponent: any = document.querySelector(".scroll-canvas");
            overflowComponent.style.overflow = "hidden";
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
