package sqlstore

import (
	"github.com/xformation/cms-ui/pkg/bus"
	m "github.com/xformation/cms-ui/pkg/models"
)

func init() {
	bus.AddHandler("sql", GetDBHealthQuery)
}

func GetDBHealthQuery(query *m.GetDBHealthQuery) error {
	return x.Ping()
}
