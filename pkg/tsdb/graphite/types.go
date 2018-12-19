package graphite

import "github.com/xformation/cms-ui/pkg/tsdb"

type TargetResponseDTO struct {
	Target     string                `json:"target"`
	DataPoints tsdb.TimeSeriesPoints `json:"datapoints"`
}
