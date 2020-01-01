export class BadgeRenderer {
  constructor(private panel) {}

  createHtml(isLoading, badgesData) {
    const { totalBadges, badgesInfo } = this.panel;
    let retHtml = '';
    for (let i = 0; i < totalBadges; i++) {
      if (badgesInfo[i]) {
        if (isLoading) {
          retHtml +=
            '<div class="badge-conainer badge-data-loading query-transaction--loading">Your data is loading....</div>';
        } else {
          let badgeData = badgesData[i];
          const badgeInfo = badgesInfo[i];
          if (!badgeData) {
            badgeData = {
              [badgeInfo.info1Key]: '',
              [badgeInfo.info2Key]: '',
              [badgeInfo.info3Key]: '',
              [badgeInfo.info4Key]: '',
              [badgeInfo.headerKey]: '',
            };
          }
          retHtml +=
            '<div class="badge-conainer">' +
            '<div class="head">' +
            '<h2><i class="fa fa-calendar"></i> ' +
            badgeData[badgeInfo.headerKey] +
            '</h2>' +
            '</div>' +
            '<div class="content">' +
            '<ul>' +
            '<li><p>' +
            badgeInfo.info1Label +
            '</p> <span>' +
            badgeData[badgeInfo.info1Key] +
            '</span></li>' +
            '<li><p>' +
            badgeInfo.info2Label +
            '</p> <span>' +
            badgeData[badgeInfo.info2Key] +
            '</span></li>' +
            '</ul>' +
            '<ul>' +
            '<li><p>' +
            badgeInfo.info3Label +
            '</p> <span>' +
            badgeData[badgeInfo.info3Key] +
            '</span></li>' +
            '<li><p>' +
            badgeInfo.info4Label +
            '</p> <span>' +
            badgeData[badgeInfo.info4Key] +
            '</span></li>' +
            '</ul>' +
            '</div>' +
            '</div>';
        }
      }
    }
    return retHtml;
  }
}
