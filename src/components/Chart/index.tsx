import { ChartDataType } from 'models';
import ReactApexChart from 'react-apexcharts';

import { CHART_OPTIONS } from './constants';

export function Chart({ data }: { data: ChartDataType[] }) {
  return (
    <div id="chart" style={{ marginTop: '2rem' }}>
      <ReactApexChart options={CHART_OPTIONS} series={[{ data }]} type="candlestick" height={400} width="100%" />
    </div>
  );
}
