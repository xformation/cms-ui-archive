package login

import (
	m "github.com/xformation/cms-ui/pkg/models"
	"github.com/xformation/cms-ui/pkg/setting"
)

var loginUsingLdap = func(query *m.LoginUserQuery) (bool, error) {
	if !setting.LdapEnabled {
		return false, nil
	}

	for _, server := range LdapCfg.Servers {
		author := NewLdapAuthenticator(server)
		err := author.Login(query)
		if err == nil || err != ErrInvalidCredentials {
			return true, err
		}
	}

	return true, ErrInvalidCredentials
}
