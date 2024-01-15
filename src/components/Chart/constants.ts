import { ApexOptions } from 'apexcharts';

export const CHART_OPTIONS: ApexOptions = {
  tooltip: {
    theme: 'dark',
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        cssClass: 'chart-label-color',
      },
    },
  },
  yaxis: {
    opposite: false,
    decimalsInFloat: 5,

    tooltip: {
      enabled: true,
    },
    labels: {
      formatter: (val) => (+val.toFixed(9)).toString().trim(),
      style: {
        cssClass: 'chart-label-color',
      },
    },
  },
};
