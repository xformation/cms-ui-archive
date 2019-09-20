import coreModule from '../../core/core_module';
import appEvents from 'app/core/app_events';

export class NavbarPopupCtrl {
    isOpen: boolean;
    top: any;
    giveSearchFocus: number;
    /** @ngInject */
    constructor($scope, private $timeout) {
        appEvents.on('show-navbar-popup', this.showPupup.bind(this), $scope);
        appEvents.on('hide-navbar-popup', this.hidePopup.bind(this), $scope);
    }

    hidePopup() {
        this.isOpen = false;
        const overflowComponent: any = document.querySelector(".scroll-canvas");
        overflowComponent.style.overflow = "auto";
    }

    showPupup() {
        this.isOpen = true;
        this.giveSearchFocus = 0;
        this.$timeout(() => {
            this.giveSearchFocus = this.giveSearchFocus + 1;
            const overflowComponent: any = document.querySelector(".scroll-canvas");
            overflowComponent.style.overflow = "hidden";
            const navBar = document.querySelector(".page-nav");
            this.top = navBar.clientHeight;
        }, 100);
    }

    onKeyDownOnSearch(event) {
        if (event.keyCode === 27) {
            this.hidePopup();
        }
    }
}

export function navbarPopupDirective() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/navbar-popup/partials/navbarPopupCtrl.html',
        controller: NavbarPopupCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        scope: {},
    };
}

coreModule.directive('navbarPopup', navbarPopupDirective);
