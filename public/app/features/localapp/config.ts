const secSrvUrl = 'http://18.209.4.2:8094';
const apiUrl = 'http://18.209.4.2:8080';
// 18.234.66.133
export const config = {
  PERMS_LIST_ALL: secSrvUrl + '/security/permissions/listAll',
  PERMS_CREATE: secSrvUrl + '/security/permissions/create',
  PERMS_UPDATE: secSrvUrl + '/security/permissions/update',
  PERMS_GET: secSrvUrl + '/security/permissions/',
  ROLES_LIST_ALL: secSrvUrl + '/security/roles/listAll',
  ROLES_CREATE: secSrvUrl + '/security/roles/create',
  ROLES_UPDATE: secSrvUrl + '/security/roles/update',
  ROLES_GET: secSrvUrl + '/security/roles/',
  USERS_LIST_ALL: secSrvUrl + '/security/users/listAll',
  USERS_CREATE: secSrvUrl + '/security/users/create',
  USERS_UPDATE: secSrvUrl + '/security/users/update',
  USERS_GET: secSrvUrl + '/security/users/',
  UI_MODULES_GET: apiUrl + '/api/cmsmodules',
  EXPORT_USER_PORT: apiUrl + '/api/cmsuserexport',
  CMS_GLOBAL_CONFIG_URL: apiUrl + '/api/cmssettings',
  COLLEGE_URL: apiUrl + '/api/cmscollege',
  PAYMENT_MSG_URL: apiUrl + '/api/cmspayment',
};
