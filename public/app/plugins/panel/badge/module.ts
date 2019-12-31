import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { badgeEditor } from './editor';
import { BadgeRenderer } from './renderer';

class BadgeCtrl extends MetricsPanelCtrl {
  static templateUrl = './partials/module.html';
  panelDefaults = {
    totalBadges: 1,
  };
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, this.panelDefaults);
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Options', badgeEditor, 1);
  }

  onDataReceived() {
    this.render();
  }

  render() {
    const badgeRenderer = new BadgeRenderer(this.panel);
    const badgeHtml = badgeRenderer.createHtml();
    return super.render(badgeHtml);
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
