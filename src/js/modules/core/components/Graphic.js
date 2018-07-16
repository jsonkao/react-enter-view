import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  MarkSeries,
} from 'react-vis';

const Graphic = ({ data }) => {
  return (
    <XYPlot width={300} height={300} xDomain={[0, 10]} yDomain={[0, 10]}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <MarkSeries animation data={data} />
    </XYPlot>
  );
};

export default Graphic;
