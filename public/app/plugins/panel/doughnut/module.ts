import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { doughnutEditor } from './editor';
import { DoughnutRenderer } from './renderer';

class DoughnutCtrl extends MetricsPanelCtrl {
  static templateUrl = './partials/module.html';
  panelDefaults = {
    totalDataSets: 1,
    dataSetInfo: [],
    chartTitle: '',
    backgroundColor: '',
  };
  isLoading: any;
  doughnutRenderer: any = null;
  dummyData = {
    dataSets: [
      {
        data: 75,
        label: 'Red',
      },
      {
        data: 56,
        label: 'Orange',
      },
    ],
  };

  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }

  constructor($scope, $injector) {
    super($scope, $injector);
    this.isLoading = false;
    _.defaults(this.panel, this.panelDefaults);
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('refresh', this.onAnalyticsPanelRefreshed.bind(this));
  }

  onAnalyticsPanelRefreshed() {
    this.isLoading = true;
    this.getData().then(response => {
      this.isLoading = false;
      this.render();
    });
  }

  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({});
      }, 1000);
    });
  }

  onInitEditMode() {
    this.addEditorTab('Options', doughnutEditor, 1);
  }

  onDataReceived() {
    this.render();
  }

  render() {
    // const badgeHtml = doughnutRenderer.createChart(this.isLoading, this.responseData);
    if (!this.doughnutRenderer) {
      this.doughnutRenderer = new DoughnutRenderer(this.panel);
    }
    return super.render(this.doughnutRenderer);
  }

  reConfigChart() {
    if (this.doughnutRenderer) {
      this.doughnutRenderer.destroyChart();
      super.render(this.doughnutRenderer);
    }
  }

  link(scope, elem, attrs, ctrl: DoughnutCtrl) {
    function renderPanel(renderData) {
      const canvas = elem.find('canvas')[0];
      const ctx = canvas.getContext('2d');
      if (!ctrl.isLoading) {
        canvas.style.display = '';
        elem.find('.data-loading').remove();
        renderData.createChart(ctrl.isLoading, ctrl.dummyData, ctx);
      }
    }

    ctrl.events.on('render', renderData => {
      if (renderData) {
        renderPanel(renderData);
      }
      ctrl.renderingCompleted();
    });
  }
}

export { DoughnutCtrl, DoughnutCtrl as PanelCtrl };
