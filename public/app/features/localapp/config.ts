const secSrvUrl = 'http://localhost:8094';

export const config = {
  api_url: 'http://54.196.130.160:8080',
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
};
