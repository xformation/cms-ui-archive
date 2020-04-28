import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { badgeEditor } from './editor';
import { BadgeRenderer } from './renderer';

class BadgeCtrl extends MetricsPanelCtrl {
  static templateUrl = './partials/module.html';
  panelDefaults = {
    totalBadges: 1,
    badgesInfo: [],
    apiEndPoint: '',
  };
  isLoading: any;
  responseData: any;
  lastApiCalled: any;
  constructor($scope, $injector) {
    super($scope, $injector);
    this.isLoading = false;
    this.responseData = [];
    this.lastApiCalled = '';
    _.defaults(this.panel, this.panelDefaults);
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('refresh', this.onBadgePanelRefreshed.bind(this));
  }

  onBadgePanelRefreshed() {
    this.isLoading = true;
    this.getData().then(response => {
      this.isLoading = false;
      this.responseData = response;
      this.render();
    });
  }

  getData() {
    this.lastApiCalled = this.panel.apiEndPoint;
    this.isLoading = true;
    const requestOptions = {
      method: 'GET',
    };
    return fetch(this.panel.apiEndPoint, requestOptions).then((response: any) => response.json());
  }

  onInitEditMode() {
    this.addEditorTab('Options', badgeEditor, 1);
  }

  onDataReceived() {
    this.render();
  }

  render() {
    if (this.lastApiCalled !== this.panel.apiEndPoint) {
      this.getData().then(
        (response: any) => {
          this.responseData = response;
          const badgeRenderer = new BadgeRenderer(this.panel);
          this.isLoading = false;
          const badgeHtml = badgeRenderer.createHtml(this.isLoading, this.responseData);
          return super.render(badgeHtml);
        },
        (error: any) => {}
      );
    } else {
      const badgeRenderer = new BadgeRenderer(this.panel);
      this.isLoading = false;
      const badgeHtml = badgeRenderer.createHtml(this.isLoading, this.responseData);
      return super.render(badgeHtml);
    }
  }

  link(scope, elem, attrs, ctrl: BadgeCtrl) {
    function renderPanel(renderData) {
      const parentElement = elem.find('.badges-main-container');
      parentElement.html(renderData);
    }

    ctrl.events.on('render', renderData => {
      if (renderData) {
        renderPanel(renderData);
      }
      ctrl.renderingCompleted();
    });
  }
}

export { BadgeCtrl, BadgeCtrl as PanelCtrl };
