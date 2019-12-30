import { PanelCtrl } from '../../../features/panel/panel_ctrl';

class BadgeCtrl extends PanelCtrl {
  static templateUrl = './partials/module.html';
  constructor($scope, $injector) {
    super($scope, $injector);
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
  }

  onInitEditMode() {
    this.editorTabIndex = 1;
    this.addEditorTab('Options', 'public/app/plugins/panel/badge/partials/editor.html');
  }
}

export { BadgeCtrl, BadgeCtrl as PanelCtrl };
