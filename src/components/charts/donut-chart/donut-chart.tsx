'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { colors } from '../_constants/colors';
import { useTailwindColor } from '@/hooks/use-tailwind-color';

type Datum<L extends string, V extends string> = {
  [K in L]: string;
} & {
  [K in V]: number;
};
interface DonutChartProps<L extends string, V extends string> {
  data: Datum<L, V>[];
  width?: number;
  height?: number;
  labelField: L;
  valueField: V;
  margin?: number;
}

const DonutChart = <L extends string, V extends string>({
  data,
  width = 450,
  height = 450,
  margin = 40,
  labelField,
  valueField,
}: DonutChartProps<L, V>) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const getColor = useTailwindColor();

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !data || data.length === 0)
      return;

    const radius = Math.min(width, height) / 2 - margin;

    // Clear previous renders
    d3.select(svgRef.current).selectAll('*').remove();

    const root = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const svg = root
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    const defs = svg.append('defs');

    // Create a gradient for each slice
    data.forEach((d, i) => {
      const gradient = defs
        .append('linearGradient')
        .attr('id', `gradient-${i}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%')
        .attr('gradientTransform', 'rotate(324.01)');
      gradient
        .append('stop')
        .attr('offset', '30.87%')
        .attr('stop-color', getColor(colors[i % colors.length]));

      gradient
        .append('stop')
        .attr('offset', '69.2%')
        .attr('stop-color', getColor(colors[i % colors.length], 0.5));
    });

    // Color scale using Tailwind colors
    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d?.[labelField]))
      .range(colors.map((c) => getColor(c)));

    const filter = defs
      .append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', '130%');

    filter
      .append('feDropShadow')
      .attr('dx', 0)
      .attr('dy', 0)
      .attr('stdDeviation', 4)
      .attr('flood-color', '#000')
      .attr('flood-opacity', 0.5);

    // Tooltip div (attached to container)
    const tooltip = d3
      .select(containerRef.current)
      .append('div')
      .style('position', 'absolute')
      .style('padding', '6px 10px')
      .style('background', 'rgba(var(--placeholder-glass))')
      .style('color', 'rgb(var(--primary-text-color))')
      .style('backdrop-filter', 'blur(20px)')
      .style('border-color', 'rgb(var(--border))')
      .style('border-width', '1px')
      .style('z-index', '100')
      .style(
        'box-shadow',
        `0px 4px 5px 2px rgba(var(--placeholder-glass)),
                0px -6px 12px 0px rgba(var(--airsa-400), 0.5) inset`
      )
      .style('border-radius', '4px')
      .style('font-size', '10px')
      .style('font-weight', '300')
      .style('pointer-events', 'none')
      .style('opacity', 0); // Start hidden

    // Pie & arc
    const pie = d3
      .pie<Datum<L, V>>()
      .sort(null)
      .value((d) => +d?.[valueField])
      .padAngle(0.02);

    const data_ready = pie(data);

    const arc = d3
      .arc<d3.PieArcDatum<Datum<L, V>>>()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .cornerRadius(4);

    // Draw slices
    const slices = svg
      .selectAll('path.slice')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('class', 'slice')
      .attr('fill', (d, i) => `url(#gradient-${i})`)
      .attr('stroke', getColor('white', 0.25))
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
      .style('cursor', 'pointer')
      .each(function (this, d) {
        this._current = { startAngle: 0, endAngle: 0 };
      })
      .on('mouseover', function (this, event, d) {
        slices.style('opacity', 0.8);
        d3.select(this)
          .style('opacity', 1)
          .attr('filter', () => {
            svg.select(`#drop-shadow-${d.data?.[labelField]}`).remove();
            const filter = defs
              .append('filter')
              .attr('id', `drop-shadow-${d.data?.[labelField]}`)
              .attr('height', '130%');
            filter
              .append('feDropShadow')
              .attr('dx', 0)
              .attr('dy', 0)
              .attr('stdDeviation', 4)
              .attr(
                'flood-color',
                getColor(colors[data.indexOf(d.data) % colors.length])
              )
              .attr('flood-opacity', 0.5);
            return `url(#drop-shadow-${d.data?.[labelField]})`;
          });
        svg
          .selectAll('text.slice-value')
          .filter(
            (t: d3.PieArcDatum<Datum<L, V>>) =>
              t.data?.[labelField] === d.data?.[labelField]
          )
          .style('fill', 'white');
        tooltip
          .html(
            `<strong>${d.data?.[labelField]}</strong>: ${d.data?.[valueField]}`
          )
          .style('opacity', 1);
      })
      .on('mousemove', function (event) {
        const containerRect = containerRef.current!.getBoundingClientRect();
        const tooltipRect = tooltip.node()!.getBoundingClientRect();
        let left = event.pageX + 10;
        let top = event.pageY - 20;

        // Constrain tooltip within the container
        if (left + tooltipRect.width > containerRect.right) {
          left = event.pageX - tooltipRect.width - 10;
        }
        if (top + tooltipRect.height > containerRect.bottom) {
          top = event.pageY - tooltipRect.height - 10;
        }
        if (top < containerRect.top) {
          top = containerRect.top + 10;
        }
        if (left < containerRect.left) {
          left = containerRect.left + 10;
        }

        tooltip
          .style('left', `${left - containerRect.left}px`)
          .style('top', `${top - containerRect.top}px`);
      })
      .on('mouseout', function (this, event, d) {
        slices.style('opacity', 0.7);
        d3.select(this).attr('filter', null);
        svg
          .selectAll('text.slice-value')
          .filter(
            (t: d3.PieArcDatum<Datum<L, V>>) =>
              t.data?.[labelField] === d.data?.[labelField]
          )
          .style('fill', (t) => getColor('white', 0.4));
        tooltip.style('opacity', 0);
      });

    // Apply transition
    slices
      .transition()
      .duration(1000)
      .attrTween('d', function (this, d) {
        const i = d3.interpolate(this._current, d);
        this._current = i(1);
        return function (t) {
          return arc(i(t))!;
        };
      });

    // Values in the center of each slice
    svg
      .selectAll('text.slice-value')
      .data(data_ready)
      .enter()
      .append('text')
      .attr('class', 'slice-value')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('fill', (d) => getColor('white', 0.4))
      .style('font-size', '14px')
      .style('font-weight', '500')
      .style('pointer-events', 'none')
      .text((d) => d.data?.[valueField]);

    // Cleanup tooltip
    return () => {
      tooltip.remove();
    };
  }, [data, width, height, margin]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DonutChart;
