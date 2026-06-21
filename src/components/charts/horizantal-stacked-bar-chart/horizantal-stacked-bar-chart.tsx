// import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';
// import { colors } from '../_constants/colors';

// const StackedBarChart = ({ data, height = 500, ranges }) => {
//   const svgRef = useRef(null);
//   const tooltipRef = useRef(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Color map
//   const colorMap = ranges.reduce(
//     (map, ageGroup, index) => ({
//       ...map,
//       [ageGroup]: `rgb(var(--${colors[index % colors.length]}))`,
//     }),
//     {}
//   );

//   const barWidth = 20; // Fixed bar width of 20px
//   const barGap = 10; // Gap between bars
//   const outerGap = 5; // Gap before first and after last bar
//   const [width, setWidth] = useState(928);

//   const marginTop = 10;
//   const marginRight = 10;
//   const marginBottom = 80;
//   const marginLeft = 40;

//   // Resize observer for responsive width
//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const uniqueStates = d3.groupSort(
//       data,
//       (D) => -d3.sum(D, (d) => d.population),
//       (d) => d.state
//     );

//     // Calculate content width based on fixed bar width and gaps
//     const contentWidth =
//       uniqueStates.length * (barWidth + barGap) -
//       barGap +
//       2 * outerGap +
//       marginLeft +
//       marginRight;

//     setWidth(Math.max(contentWidth, 200)); // Ensure minimum width

//     const resizeObserver = new ResizeObserver((entries) => {
//       if (entries[0] && entries[0].contentRect) {
//         setWidth(Math.max(entries[0].contentRect.width, contentWidth, 200));
//       }
//     });

//     if (containerRef.current) resizeObserver.observe(containerRef.current);

//     return () => {
//       if (containerRef.current) resizeObserver.unobserve(containerRef.current);
//     };
//   }, [data]);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove();

//     const tooltip = d3
//       .select(tooltipRef.current)
//       .style('position', 'absolute')
//       .style('pointer-events', 'none')
//       .style('padding', '6px 12px')
//       .style('background', 'rgb(var(--card))')
//       .style('color', 'rgb(var(--primary-text-color))')
//       .style('border-radius', '6px')
//       .style('opacity', 0)
//       .style('font-size', '12px')
//       .style('z-index', '10');

//     const series = d3
//       .stack()
//       .keys(d3.union(data.map((d) => d.age)))
//       .value(([, D], key) => D.get(key)?.population || 0)(
//       d3.index(
//         data,
//         (d) => d.state,
//         (d) => d.age
//       )
//     );

//     const states = d3.groupSort(
//       data,
//       (D) => -d3.sum(D, (d) => d.population),
//       (d) => d.state
//     );

//     // Use scaleBand with fixed bandwidth
//     const x = d3
//       .scaleBand()
//       .domain(states)
//       .range([
//         marginLeft,
//         marginLeft +
//           states.length * (barWidth + barGap) -
//           barGap +
//           2 * outerGap,
//       ])
//       .paddingInner(barGap / (barWidth + barGap))
//       .paddingOuter(outerGap / (barWidth + barGap));

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1])) || 1])
//       .nice()
//       .rangeRound([height - marginBottom, marginTop]);

//     const color = d3
//       .scaleOrdinal()
//       .domain(series.map((d) => d.key))
//       .range(series.map((d) => colorMap[d.key]))
//       .unknown('rgb(var(--card))');

//     // chart boundaries
//     const chartRight = width - marginRight;
//     const chartWidth = chartRight - marginLeft;

//     // Horizontal grid lines (aligned with y-axis ticks, full chart width)
//     svg
//       .append('g')
//       .attr('class', 'grid')
//       .attr('transform', `translate(${marginLeft},0)`)
//       .call(
//         d3.axisLeft(y).ticks(null, 's').tickSize(-chartWidth).tickFormat('')
//       )
//       .call((g) => g.select('.domain').remove())
//       .selectAll('.tick line')
//       .attr('stroke', 'rgb(var(--border))')
//       .attr('stroke-opacity', 0.3)
//       .attr('stroke-width', 1);

//     // Vertical grid lines (every 50px across full chart width)
//     const gridPositions: number[] = [];
//     let currentX = marginLeft;
//     while (currentX <= chartRight) {
//       gridPositions.push(currentX);
//       currentX += 50;
//     }

//     svg
//       .append('g')
//       .attr('class', 'grid')
//       .selectAll('line')
//       .data(gridPositions)
//       .join('line')
//       .attr('x1', (d) => d)
//       .attr('x2', (d) => d)
//       .attr('y1', marginTop)
//       .attr('y2', height - marginBottom)
//       .attr('stroke', 'rgb(var(--border))')
//       .attr('stroke-opacity', 0.3)
//       .attr('stroke-width', 1);

//     // Bars
//     svg
//       .append('g')
//       .selectAll()
//       .data(series)
//       .join('g')
//       .attr('fill', (d) => color(d.key) || 'rgb(var(--card))')
//       .selectAll('rect')
//       .data((D) => D.map((d) => ((d.key = D.key), d)))
//       .join('rect')
//       .attr('x', (d) => x(d.data[0]) || marginLeft)
//       .attr('y', (d) => y(d[1]))
//       .attr('height', (d) => y(d[0]) - y(d[1]))
//       .attr('width', barWidth)
//       .style('cursor', 'pointer')
//       .on('mouseenter', function (this, event, d) {
//         d3.select(this).attr('opacity', 0.8);
//         const container = containerRef.current;
//         if (!container) return;
//         const rect = container.getBoundingClientRect();
//         tooltip
//           .style('opacity', 1)
//           .html(
//             `${d.data[0]} ${d.key}<br>${
//               d.data[1].get(d.key)?.population.toLocaleString('en') || 'N/A'
//             }`
//           )
//           .style('left', event.clientX - rect.left + 10 + 'px')
//           .style('top', event.clientY - rect.top - 28 + 'px');
//       })
//       .on('mousemove', function (event) {
//         const container = containerRef.current;
//         if (!container) return;
//         const rect = container.getBoundingClientRect();
//         tooltip
//           .style('left', event.clientX - rect.left + 10 + 'px')
//           .style('top', event.clientY - rect.top - 28 + 'px');
//       })
//       .on('mouseleave', function (this) {
//         d3.select(this).attr('opacity', 1);
//         tooltip.style('opacity', 0);
//       })
//       .transition()
//       .duration(800)
//       .delay((_, i) => i * 50)
//       .attr('y', (d) => y(d[1]))
//       .attr('height', (d) => y(d[0]) - y(d[1]));

//     // X Axis
//     const xAxis = svg
//       .append('g')
//       .attr('transform', `translate(0,${height - marginBottom})`)
//       .call(d3.axisBottom(x).tickFormat((d) => d));

//     xAxis
//       .selectAll('text')
//       .attr('fill', 'rgb(var(--primary-text-color))')
//       .style('text-anchor', 'middle')
//       .attr('dy', '1em');

//     xAxis
//       .selectAll('.tick line')
//       .attr('stroke', 'rgb(var(--border))')
//       .attr('y2', 6);
//     xAxis.selectAll('.domain').remove();

//     svg
//       .append('line')
//       .attr('x1', marginLeft)
//       .attr('x2', chartRight)
//       .attr('y1', height - marginBottom)
//       .attr('y2', height - marginBottom)
//       .attr('stroke', 'rgb(var(--border))')
//       .attr('stroke-width', 1);

//     // Y Axis
//     const yAxis = svg
//       .append('g')
//       .attr('transform', `translate(${marginLeft},0)`)
//       .call(d3.axisLeft(y).ticks(null, 's'));

//     yAxis.selectAll('text').attr('fill', 'rgb(var(--primary-text-color))');
//     yAxis
//       .selectAll('.tick line')
//       .attr('stroke', 'rgb(var(--border))')
//       .attr('x2', -6);

//     svg
//       .append('line')
//       .attr('x1', marginLeft)
//       .attr('x2', marginLeft)
//       .attr('y1', marginTop)
//       .attr('y2', height - marginBottom)
//       .attr('stroke', 'rgb(var(--border))')
//       .attr('stroke-width', 1);
//   }, [data, width, height]);

//   return (
//     <div ref={containerRef} className="relative w-full">
//       <svg
//         ref={svgRef}
//         width={width}
//         height={height}
//         viewBox={`0 0 ${width} ${height}`}
//         className="bg-card"
//         style={{
//           maxWidth: '100%',
//           height: 'auto',
//           overflow: 'visible',
//           font: '10px sans-serif',
//         }}
//       />
//       <div ref={tooltipRef} />
//     </div>
//   );
// };

// export default StackedBarChart;
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { colors } from '../_constants/colors';

interface StoreSummary {
  store_name: string;
  total_products: number;
  total_quantity: number;
  recent_orders: number;
}

interface StackedBarChartProps {
  data: StoreSummary[];
  height?: number;
  ranges: (keyof StoreSummary)[];
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  height = 500,
  ranges,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(928);

  const barWidth = 20;
  const barGap = 10;
  const outerGap = 5;
  const margin = { top: 10, right: 10, bottom: 80, left: 40 };

  // Create color map
  const colorMap: Record<string, string> = ranges.reduce((map, key, index) => {
    map[key] = `var(--color-${colors[index % colors.length]})`;
    return map;
  }, {} as Record<string, string>);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Resize observer for responsive width
    const contentWidth =
      data.length * (barWidth + barGap) -
      barGap +
      2 * outerGap +
      margin.left +
      margin.right;
    setWidth(Math.max(contentWidth, 200));

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect) {
        setWidth(Math.max(entries[0].contentRect.width, contentWidth, 200));
      }
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, [data]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const tooltip = d3
      .select(tooltipRef.current)
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('padding', '6px 12px')
      .style('background', 'white')
      .style('color', 'black')
      .style('border-radius', '6px')
      .style('opacity', 0)
      .style('font-size', '12px')
      .style('z-index', '10');

    // Prepare series for stacking
    const cleanedData = data.map((d) => {
      const max = Math.max(d.total_products, d.total_quantity, d.recent_orders);
      return {
        ...d,
        total_products: max ? (d.total_products / max) * 100 : 0,
        total_quantity: max ? (d.total_quantity / max) * 100 : 0,
        recent_orders: max ? (d.recent_orders / max) * 100 : 0,
      };
    });
    const series = d3.stack<StoreSummary>().keys(ranges)(cleanedData);
    console.log('🚀 ~ StackedBarChart ~ series:', series);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.store_name))
      .range([margin.left, width - margin.right])
      .paddingInner(barGap / (barWidth + barGap))
      .paddingOuter(outerGap / (barWidth + barGap));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1])) || 1])
      .nice()
      .rangeRound([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal<string>()
      .domain(ranges as string[])
      .range(ranges.map((d) => colorMap[d]));

    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', (d) => color(d.key) || '#ff3')
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d.data.store_name) || margin.left)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', barWidth)
      .style('cursor', 'pointer')
      .on('mouseenter', function (this, event, d) {
        d3.select(this).attr('opacity', 0.8);
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        tooltip
          .style('opacity', 1)
          .html(
            `${d.data.store_name} ${d.key}: ${d.data[d.key].toLocaleString(
              'en'
            )}`
          )
          .style('left', event.clientX - rect.left + 10 + 'px')
          .style('top', event.clientY - rect.top - 28 + 'px');
      })
      .on('mousemove', function (event) {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        tooltip
          .style('left', event.clientX - rect.left + 10 + 'px')
          .style('top', event.clientY - rect.top - 28 + 'px');
      })
      .on('mouseleave', function (this) {
        d3.select(this).attr('opacity', 1);
        tooltip.style('opacity', 0);
      });

    // X Axis
    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
    xAxis
      .selectAll('text')
      .attr('fill', 'gray')
      .style('text-anchor', 'middle')
      .attr('dy', '1em');
    // xAxis.selectAll('.domain').remove();
  }, [data, width, height, ranges, colorMap]);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-auto">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="bg-card"
        style={{
          maxWidth: '100%',
          height: 'auto',
          overflow: 'visible',
          font: '10px sans-serif',
        }}
      />
      <div ref={tooltipRef} />
    </div>
  );
};

export default StackedBarChart;
