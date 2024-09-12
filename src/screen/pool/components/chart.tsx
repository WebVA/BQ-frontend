import { Browser } from '@syncfusion/ej2-base';
import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTheme,
  AccumulationTooltip,
  IAccLoadedEventArgs,
  Inject,
  PieSeries,
} from '@syncfusion/ej2-react-charts';
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const data1: any[] = [
  { x: 'Somalia', y: 1057022, r: '160', text: 'Somalia' },
  {
    x: 'PWR',
    y: 705370,
    r: Browser.isDevice ? '150' : '150',
    text: 'PWR',
  },
  {
    x: 'Babylon',
    y: 312685,
    r: '140',
    text: 'Babylon',
  },
  {
    x: 'Merlin',
    y: 551500,
    r: Browser.isDevice ? '120' : '120',
    text: 'Merlin',
  },
];
const PieRadius = () => {
  return (
    <div className='control-pane relative'>
      <div className='absolute left-1/2 top-1/2 z-10 flex h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white'>
        <div className='broder-[#00ECBC] absolute inset-2 rounded-full border-4'></div>
        <div className='flex flex-col items-center justify-center text-black'>
          <div className='text-3xl font-bold'>WBTC</div>
          <div className='text-3xl font-bold'>50</div>
          <div>Total</div>
        </div>
      </div>
      <div className='control-section'>
        <AccumulationChartComponent
          id='pie-chart'
          legendSettings={{ visible: false, reverse: true }}
          enableSmartLabels={false}
          enableBorderOnMouseMove={false}
          enableAnimation={true}
          tooltip={{
            enable: false,
            format:
              '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>',
          }}
        >
          <Inject
            services={[
              AccumulationLegend,
              PieSeries,
              AccumulationDataLabel,
              AccumulationTooltip,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={data1}
              xName='x'
              yName='y'
              innerRadius='20%'
              tooltipMappingName='r'
              dataLabel={{
                visible: false,
                position: Browser.isDevice ? 'Inside' : 'Outside',
                name: 'text',
                enableRotation: true,
                font: { fontWeight: '600' },
                connectorStyle: { length: '20px', type: 'Curve' },
              }}
              radius='r'
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};
export default PieRadius;
