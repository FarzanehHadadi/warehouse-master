import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';

type Datum<L extends string, V extends string> = {
  [K in L]: string;
} & {
  [K in V]: number | string;
};
const MIN_WIDTH_CHART = 200;
interface BarChartProps<L extends string, V extends string> {
  data: Datum<L, V>[];
  height?: number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  orientation?: 'vertical' | 'horizontal';
  color?: string;
  animationDuration?: number;
  onBarClick?: (data: Datum<L, V>) => void;
  barWidth?: number;
  outerGap?: number;
  labelIndex: L;
  valueIndex: V;
  yTickStep?: number;
}

const BarChart = <L extends string, V extends string>({
  data,
  height = 300,
  margin,
  orientation = 'vertical',
  color = 'var(--color-brand-400)',
  animationDuration = 1000,
  onBarClick,
  barWidth = 20,
  outerGap = 5,
  labelIndex,
  valueIndex,
  yTickStep = 5,
}: BarChartProps<L, V>) => {
  const safeMargin = {
    top: margin?.top ?? 10,
    right: margin?.right ?? 10,
    bottom: margin?.bottom ?? 80,
    left: margin?.left ?? 40,
  };
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(928);
  // const getColor = useTailwindColor()

  // Processed data
  const processedData = useMemo(() => [...data], [data]);
  // Calculate content width based on fixed bar width and gaps
  const contentWidth =
    processedData.length * barWidth +
    2 * outerGap +
    safeMargin.left +
    safeMargin.right;
  // Dynamically compute chart width
  useEffect(() => {
    if (!processedData || processedData.length === 0) return;

    // Ensure minimum width of 200px
    setWidth(Math.max(contentWidth, MIN_WIDTH_CHART));

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect) {
        setWidth(
          Math.max(entries[0].contentRect.width, contentWidth, MIN_WIDTH_CHART)
        );
      }
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, [processedData, barWidth, outerGap, margin]);

  useEffect(() => {
    if (!svgRef.current || !processedData.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create tooltip
    const tooltip = d3
      .select(tooltipRef.current)
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('padding', '6px 12px')
      .style('background', 'white')
      .style('color', 'var(--color-gray-200)')
      .style('border-radius', '6px')
      .style('opacity', 100)
      .style('font-size', '12px')
      .style('z-index', '100');

    const chartWidth = Math.max(
      width - safeMargin.right,
      safeMargin.left + MIN_WIDTH_CHART
    );
    const innerHeight = height - safeMargin.top - safeMargin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${safeMargin.left},${safeMargin.top})`);

    // --- Scales ---
    let xScale: any;
    let yScale: any;

    if (orientation === 'vertical') {
      xScale = d3
        .scaleBand()
        .domain(processedData.map((d) => d?.[labelIndex]))
        .range([safeMargin.left, width - safeMargin.right])
        .padding(0.1);
      // .paddingInner(0.2)
      // .paddingOuter(0.1)

      yScale = d3
        .scaleLinear()
        .domain([0, d3.max(processedData, (d) => +d?.[valueIndex]) || 1])
        .range([height - safeMargin.bottom, safeMargin.top]);
    } else {
      xScale = d3
        .scaleBand()
        .domain([0, d3.max(processedData, (d) => +d?.[valueIndex]) || 1])
        .nice()
        .range([0, chartWidth - safeMargin.left - safeMargin.right])
        .padding(0.1);

      yScale = d3
        .scaleBand()
        .domain(processedData.map((d) => d?.[labelIndex]))
        .range([
          safeMargin.top,
          safeMargin.top + processedData.length * barWidth - +2 * outerGap,
        ])
        .paddingInner(0.3)
        .paddingOuter(0.5);
    }

    // --- Horizontal Grid Lines ---
    // if (orientation === 'vertical') {
    //   svg
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('transform', `translate(${safeMargin.left},0)`)
    //     .call(
    //       d3
    //         .axisLeft(yScale)
    //         .ticks(3)
    //         .tickSize(-(chartWidth - safeMargin.left))
    //         .tickFormat('')
    //     )
    //     .call((g) => g.select('.domain').remove())
    //     .selectAll('.tick line')
    //     .attr('stroke', 'rgb(var(--border))')
    //     .attr('stroke-opacity', 0.3)
    //     .attr('stroke-width', 1);
    // } else {
    //   svg
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('transform', `translate(0,${height - safeMargin.bottom})`)
    //     .call(
    //       d3
    //         .axisBottom(xScale)
    //         .ticks(null, 's')
    //         .tickSize(-(height - safeMargin.top - safeMargin.bottom))
    //         .tickFormat('')
    //     )
    //     .call((g) => g.select('.domain').remove())
    //     .selectAll('.tick line')
    //     .attr('stroke', 'rgb(var(--border))')
    //     .attr('stroke-opacity', 0.3)
    //     .attr('stroke-width', 1);
    // }

    // // --- Vertical Grid Lines ---
    // const gridPositions: number[] = [];
    // let currentX = safeMargin.left;
    // while (currentX <= chartWidth) {
    //   gridPositions.push(currentX);
    //   currentX += 50; // Fixed 50px interval
    // }

    // svg
    //   .append('g')
    //   .attr('class', 'grid')
    //   .selectAll('line')
    //   .data(gridPositions)
    //   .join('line')
    //   .attr('x1', (d) => d)
    //   .attr('x2', (d) => d)
    //   .attr('y1', safeMargin.top)
    //   .attr('y2', height - safeMargin.bottom)
    //   .attr('stroke', 'rgb(var(--border))')
    //   .attr('stroke-opacity', 0.3)
    //   .attr('stroke-width', 1);

    // --- Bars ---
    const bars = svg
      .append('g')
      .selectAll('.bar')
      .data(processedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', color)
      .attr('rx', 2)
      .attr('ry', 2)
      .style('font-family', 'iranSans')
      .style('cursor', onBarClick ? 'pointer' : 'default');

    if (orientation === 'vertical') {
      bars
        .attr('x', (d) => {
          const bandWidth = xScale.bandwidth();
          const barX = xScale(d?.[labelIndex]) || safeMargin.left;
          // Center the 50px bar within the band
          return barX + (bandWidth - barWidth) / 2;
        })
        .attr('width', barWidth) // Fixed width of 50px
        .attr('y', yScale(0))
        .attr('height', 0)
        .transition()
        .duration(animationDuration)
        .attr('y', (d) => yScale(+d?.[valueIndex]))
        .attr('height', (d) => yScale(0) - yScale(+d?.[valueIndex]));
    } else {
      bars
        .attr('y', (d) => {
          const bandHeight = yScale.bandwidth();
          const barY = yScale(d?.[labelIndex]) || safeMargin.top;
          // Center the 50px bar within the band
          return barY + (bandHeight - barWidth) / 2;
        })
        .attr('height', barWidth) // Fixed height of 50px
        .attr('x', safeMargin.left)
        .attr('width', 0)
        .transition()
        .duration(animationDuration)
        .attr('width', (d) => xScale(+d?.[valueIndex]));
    }

    // --- Tooltip Events ---
    bars
      .on('mouseenter', function (this, event, d) {
        d3.select(this).attr('opacity', 0.8);
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        tooltip
          .style('opacity', 1)
          .html(
            `${d?.[labelIndex]}: ${(+d?.[valueIndex])?.toLocaleString('en')}`
          )
          .style('left', `${event.clientX - rect.left + 10}px`)
          .style('top', `${event.clientY - rect.top - 28}px`);
      })
      .on('mousemove', function (event) {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        tooltip
          .style('left', `${event.clientX - rect.left + 10}px`)
          .style('top', `${event.clientY - rect.top - 28}px`);
      })
      .on('mouseleave', function (this) {
        d3.select(this).attr('opacity', 1);
        tooltip.style('opacity', 0);
      });

    if (onBarClick) {
      bars.on('click', (_, d) => onBarClick(d));
    }

    // --- X Axis ---
    if (orientation === 'vertical') {
      const xAxis = svg
        .append('g')
        .attr('transform', `translate(0,${height - safeMargin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat((d) => d));

      xAxis
        .selectAll('text')
        .attr('fill', 'var(--color-gray-400)')
        .style('text-anchor', 'start')
        .attr('dx', '0.7em') // Position below the axis line
        // .call(wrapText, xScale.bandwidth());
        .attr('transform', 'rotate(-45)'); // Keep rotation as per previous request

      xAxis.selectAll('.tick line').attr('stroke', '#0f1').attr('y2', 6);
      xAxis.selectAll('.domain').remove();

      svg
        .append('line')
        .attr('x1', safeMargin.left)
        .attr('x2', chartWidth)
        .attr('y1', height - safeMargin.bottom)
        .attr('y2', height - safeMargin.bottom)
        .attr('stroke', 'var(--color-gray-400)')
        .attr('stroke-width', 1);
    } else {
      const xAxis = svg
        .append('g')
        .attr('transform', `translate(0,${height - safeMargin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(null, 's'));

      xAxis
        .selectAll('text')
        .attr('fill', '#0fd')
        .style('text-anchor', 'middle')
        .style('font-family', 'iranSans')
        .attr('dy', '1em');

      xAxis
        .selectAll('.tick line')
        .attr('stroke', 'rgb(var(--border))')
        .attr('y2', 6);
      xAxis.selectAll('.domain').remove();

      svg
        .append('line')
        .attr('x1', safeMargin.left)
        .attr('x2', chartWidth)
        .attr('y1', height - safeMargin.bottom)
        .attr('y2', height - safeMargin.bottom)
        .attr('stroke', '#111')
        .attr('stroke-width', 1);
    }

    // --- Y Axis ---
    if (orientation === 'vertical') {
      const yAxisGenerator = d3.axisLeft(yScale);

      // Determine tick values
      const [min, max] = yScale.domain();
      const effectiveTickCount = yTickStep || 5; // Default to 5 ticks
      const step = (max - min) / (effectiveTickCount - 1);
      const tickValues = Array.from(
        { length: effectiveTickCount },
        (_, i) => min + i * step
      );

      yAxisGenerator.tickValues(tickValues);
      const yAxis = svg
        .append('g')
        .attr('transform', `translate(${safeMargin.left},0)`)
        .call(yAxisGenerator);

      yAxis
        .selectAll('text')
        .attr('fill', 'var(--color-gray-400)')
        .attr('dx', '-1em')
        .style('font-family', 'iranSans');
      yAxis
        .selectAll('.tick line')
        .attr('stroke', 'var(--color-gray-200)')
        .attr('x2', -6);
      yAxis.selectAll('.domain').remove();

      svg
        .append('line')
        .attr('x1', safeMargin.left)
        .attr('x2', safeMargin.left)
        .attr('y1', safeMargin.top)
        .attr('y2', height - safeMargin.bottom)
        .attr('stroke', 'var(--color-gray-200)')
        .attr('stroke-width', 1);
    } else {
      const yAxis = svg
        .append('g')
        .attr('transform', `translate(${safeMargin.left},0)`)
        .call(d3.axisLeft(yScale).tickFormat((d) => d));

      yAxis.selectAll('text').attr('fill', 'var(--color-gray-800)');
      yAxis
        .selectAll('.tick line')
        .attr('stroke', 'var(--color-gray-600)')
        .attr('x2', -6);
      yAxis.selectAll('.domain').remove();

      svg
        .append('line')
        .attr('x1', safeMargin.left)
        .attr('x2', safeMargin.left)
        .attr('y1', safeMargin.top)
        .attr('y2', height - safeMargin.bottom)
        .attr('stroke', 'var(--color-gray-600)')
        .attr('stroke-width', 1);
    }

    // Cleanup tooltip on unmount
    return () => {
      tooltip.remove();
    };
  }, [
    processedData,
    width,
    height,
    margin,
    orientation,
    color,
    animationDuration,
    onBarClick,
    barWidth,
    outerGap,
  ]);

  return (
    <div ref={containerRef} className="relative w-full">
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

export default BarChart;
