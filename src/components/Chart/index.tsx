import { ApexOptions } from 'apexcharts';
import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

export type ChartDataType = { x: string; y: number[] };

interface ChartProps {
  data: ChartDataType[];
}

export class Chart extends Component<ChartProps> {
  private chartOptions: ApexOptions = {
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
        formatter: (val) => (+val.toFixed(8)).toString().trim(),
        style: {
          cssClass: 'chart-label-color',
        },
      },
    },
  };

  render() {
    return (
      <div id="chart" style={{ marginTop: '2rem' }}>
        <ReactApexChart
          options={this.chartOptions}
          series={[{ data: this.props.data }]}
          type="candlestick"
          height={400}
          width="100%"
          style={{ oberflow: 'hidden' }}
        />
      </div>
    );
  }
}
