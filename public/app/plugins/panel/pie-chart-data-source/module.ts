import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { pieEditor } from './editor';
import { PieRenderer } from './renderer';

class PieDataSourceCtrl extends MetricsPanelCtrl {
  static templateUrl = './partials/module.html';
  panelDefaults = {};
  pieRenderer: any;
  data: any = [];
  isLoading: any;
  dummyData: any = [
    {
      label: 'Science',
      data: [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
      dataLabels: ['Total Seat', 'Enquiry', 'Application', 'Converted'],
    },
    {
      label: 'Civil',
      data: [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
      dataLabels: ['Total Seat', 'Enquiry', 'Application', 'Converted'],
    },
    {
      label: 'Electronics',
      data: [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
      dataLabels: ['Total Seat', 'Enquiry', 'Application', 'Converted'],
    },
    {
      label: 'Information Technology',
      data: [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
      dataLabels: ['Total Seat', 'Enquiry', 'Application', 'Converted'],
    },
  ];

  constructor($scope, $injector) {
    super($scope, $injector);
    this.isLoading = false;
    _.defaults(this.panel, this.panelDefaults);
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', pieEditor, 1);
  }

  onDataReceived(dataList: any) {
    this.data = dataList;
    this.data = this.dummyData;
    this.render();
  }

  render() {
    if (!this.pieRenderer) {
      this.pieRenderer = new PieRenderer();
    }
    return super.render(this.pieRenderer);
  }

  reConfigChart() {
    if (this.pieRenderer) {
      this.pieRenderer.destroyChart();
      super.render(this.pieRenderer);
    }
  }

  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }

  link(scope, elem, attrs, ctrl: PieDataSourceCtrl) {
    function renderPanel(renderData) {
      const parentElement = elem.find('.pie-main-container');
      if (!ctrl.isLoading) {
        elem.find('.data-loading').remove();
        renderData.createChart(ctrl.isLoading, ctrl.data, parentElement);
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

export { PieDataSourceCtrl, PieDataSourceCtrl as PanelCtrl };
