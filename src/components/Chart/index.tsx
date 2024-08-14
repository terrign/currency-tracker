import ReactApexChart from 'react-apexcharts';
import { ChartDataType } from 'types';

import { CHART_OPTIONS } from './constants';
import * as styles from './styles.module.css';

export function Chart({ data }: { data: ChartDataType[] }) {
  return (
    <section id="chart" className={styles.chart}>
      <ReactApexChart options={CHART_OPTIONS} series={[{ data }]} type="candlestick" height={400} width="100%" />
    </section>
  );
}
