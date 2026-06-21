import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { colors } from '../_constants/colors';
import { useTailwindColor } from '@/hooks/use-tailwind-color';

const LineChart = ({
  data,
  height = 600,
  yIndex = '',
  xIndex = '',
  valueIndex = '',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(928); // Default width
  const getColor = useTailwindColor();

  // Resize observer to update width based on parent container
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect) {
        setWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear all previous SVG content

    const tooltip = d3
      .select(tooltipRef.current)
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('padding', '6px 12px')
      .style('width', 'max-content')
      .style('background', 'rgb(var(--card))')
      .style('color', 'rgb(var(--primary-text-color))')
      .style('border-radius', '6px')
      .style('opacity', 0)
      .style('font-size', '12px')
      .style('z-index', '100');

    // X and Y scales
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d[xIndex]))
      .range([margin.left, width - margin.right])
      .padding(0.5);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d[valueIndex])!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Color scale
    const divisions = Array.from(new Set(data.map((d) => d[yIndex])));
    const color = d3
      .scaleOrdinal<string>()
      .domain(divisions)
      .range(divisions.map((d: any, i) => getColor(colors[i % colors.length])));

    // Grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-height + margin.top + margin.bottom)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', 'rgb(var(--border))')
      .attr('stroke-opacity', 0.7);

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', 'rgb(var(--border))')
      .attr('stroke-opacity', 0.7);

    // Line generator
    const line = d3
      .line<any>()
      .x((d) => x(d[xIndex])!)
      .y((d) => y(+d[valueIndex]))
      .curve(d3.curveMonotoneX);
    const dataByDivision = d3.group(data, (d) => d[yIndex]);

    // Animated lines
    const lineGroup = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');

    lineGroup
      .selectAll('path')
      .data(dataByDivision)
      .join('path')
      .attr('stroke', ([yIndex]) => color(yIndex))
      .attr('data-division', ([yIndex]) => yIndex)
      .attr('d', ([, values]) => line(values))
      .each(function (this: SVGPathElement) {
        const totalLength = this.getTotalLength();
        d3.select(this)
          .attr('stroke-dasharray', totalLength)
          .attr('stroke-dashoffset', totalLength)
          .transition()
          .duration(2000)
          .ease(d3.easeCubic)
          .attr('stroke-dashoffset', 0);
      });

    // Dots (appended only once after all lines are drawn)
    const dotGroup = svg.append('g');
    dotGroup
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d[xIndex])!)
      .attr('cy', (d) => y(+d[valueIndex]))
      .attr('r', 4)
      .attr('fill', (d) => color(d[yIndex]))
      .attr('data-division', (d) => d[yIndex])
      .style('cursor', 'pointer')
      .on('mouseenter', function (this: SVGCircleElement, event, d) {
        const xValue = d[xIndex];
        const pointsAtX = data.filter((p) => p[xIndex] === xValue);
        svg.selectAll('path').attr('opacity', 0.2);
        svg.selectAll('circle').attr('opacity', 0.2);
        pointsAtX.forEach((p) => {
          svg
            .selectAll(`path[data-division="${p[yIndex]}"]`)
            .attr('opacity', 1);
        });
        svg
          .selectAll('circle')
          .filter((p: any) => p[xIndex] === xValue)
          .attr('opacity', 1)
          .attr('r', 6)
          .attr('fill', 'rgb(var(--airsa-400))');
        const tooltipContent = pointsAtX
          .map((p) => `${p[yIndex]}: ${p[valueIndex]}`)
          .join('<br>');
        tooltip.style('opacity', 1).html(`${xValue}<br>${tooltipContent}`);
      })
      .on('mousemove', function (event) {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        tooltip
          .style('left', event.clientX - rect.left + 10 + 'px')
          .style('top', event.clientY - rect.top - 28 + 'px');
      })
      .on('mouseleave', function (this: SVGCircleElement, event, d) {
        svg.selectAll('path').attr('opacity', 1);
        svg
          .selectAll('circle')
          .attr('opacity', 1)
          .attr('r', 4)
          .attr('fill', (p: any) => color(p[yIndex]));
        tooltip.style('opacity', 0);
      });

    // Axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
      .selectAll('text')
      .attr('fill', 'rgb(var(--primary-text-color))');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
      .selectAll('text')
      .attr('fill', 'rgb(var(--primary-text-color))');

    svg.selectAll('.domain').attr('stroke', 'rgb(var(--border))');
  }, [data, width, height, colors]);

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        ref={svgRef}
        width={width}
        height={height}
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

export default LineChart;
