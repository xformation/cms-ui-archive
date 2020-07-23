export class BadgeRenderer {
  constructor() {}

  createHtml(isLoading, badgesData) {
    let retHtml = '';
    let totalBadges = 0;
    if (badgesData && badgesData.length > 0) {
      totalBadges = badgesData.length;
    }
    // const badgeInfo = badgesInfo[0];
    for (let i = 0; i < totalBadges; i++) {
      if (isLoading) {
        retHtml +=
          '<div class="badge-conainer badge-data-loading query-transaction--loading">Your data is loading....</div>';
      } else {
        const badgeData = badgesData[i];
        const headerHTML = '<div class="head"><h2>' + badgeData['title'] + '</h2></div>';
        let badgeInnerHTML = '<div class="content"><ul>';
        const data = badgeData['data'];
        for (let i = 0; i < data.length; i++) {
          badgeInnerHTML += '<li><p>' + data[i].label + '</p> <span>' + data[i].value + '</span></li>';
        }
        badgeInnerHTML += '</ul></div>';
        retHtml += '<div class="badge-conainer">' + headerHTML + badgeInnerHTML + '</div>';
      }
    }
    return retHtml;
  }
}
