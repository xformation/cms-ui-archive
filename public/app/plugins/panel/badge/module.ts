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

  tempData = [
    {
      subject: 'Operating System',
      total_classes: 50,
      balance: 10,
      next_class: '30/01/2020',
      timing: '10:00 am',
    },
    {
      subject: 'Algorithms',
      total_classes: 60,
      balance: 20,
      next_class: '25/01/2020',
      timing: '10:30 am',
    },
    {
      subject: 'Data Structures',
      total_classes: 60,
      balance: 15,
      next_class: '20/01/2020',
      timing: '10:00 am',
    },
    {
      subject: 'Computer Systems',
      total_classes: 45,
      balance: 0,
      next_class: '22/01/2020',
      timing: '10:45 am',
    },
  ];
  isLoading: any;
  responseData: any;
  constructor($scope, $injector) {
    super($scope, $injector);
    this.isLoading = false;
    this.responseData = [];
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
    const requestOptions = {
      method: 'GET',
    };
    return fetch(this.panel.apiEndPoint, requestOptions).then((response: any) => response.json());
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.tempData);
    //   }, 1000);
    // });
  }

  onInitEditMode() {
    this.addEditorTab('Options', badgeEditor, 1);
  }

  onDataReceived() {
    this.render();
  }

  render() {
    this.getData().then(
      (response: any) => {
        this.responseData = response;
        const badgeRenderer = new BadgeRenderer(this.panel);
        const badgeHtml = badgeRenderer.createHtml(this.isLoading, this.responseData);
        return super.render(badgeHtml);
      },
      (error: any) => {}
    );
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
