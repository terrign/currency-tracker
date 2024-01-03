import { ApexOptions } from 'apexcharts';

export const CHART_OPTIONS: ApexOptions = {
  theme: {
    mode: 'dark',
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    opposite: true,
    tooltip: {
      enabled: true,
    },
    labels: {
      formatter: (val) => val.toString().trim(),
    },
  },
};
