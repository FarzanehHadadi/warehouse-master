import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useTailwindColor } from '@/hooks/use-tailwind-color';
import Typography from '@/components/ui/typography/Typography';

interface Section {
  limit: number;
  color: string;
}

interface GaugeProps {
  value: number;
  sections: Section[];
}

const Gauge: React.FC<GaugeProps> = ({
  value,
  sections = [{ limit: 1, color: 'airsa-400' }],
}) => {
  const gaugeRef = useRef<HTMLDivElement>(null);
  const getColor = useTailwindColor();

  useEffect(() => {
    if (!value || !sections) return;
    const gauge = (container: HTMLElement, configuration: any) => {
      const config = {
        size: 140,
        clipWidth: 140,
        clipHeight: 70,
        ringInset: 20,
        ringWidth: 6, // Section height 6px
        pointerWidth: 8, // Triangle base width
        pointerHeight: 10, // Triangle height
        needleOffset: 5, // Space between needle tip and outer arc edge
        minValue: 0,
        maxValue: sections.reduce((sum, section) => sum + +section.limit, 0),
        minAngle: -90,
        maxAngle: 90,
        transitionMs: 4000,
        sections,
      };

      let range: number, r: number, pointerHeadLength: number;
      let svg: any, arc: any, scale: any, tickData: number[], pointer: any;
      const donut = d3.pie();

      function deg2rad(deg: number): number {
        return (deg * Math.PI) / 180;
      }

      function newAngle(d: number): number {
        const ratio = scale(d);
        return config.minAngle + ratio * range;
      }

      function configure(configuration: any): void {
        for (const prop in configuration) {
          config[prop] = configuration[prop];
        }
        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = config.pointerHeight;

        scale = d3
          .scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        tickData = config.sections.map(
          (section: Section) => +section.limit / config.maxValue
        );
      }

      function centerTranslation(): string {
        return `translate(${r},${r})`;
      }

      function isRendered(): boolean {
        return svg !== undefined;
      }

      function render(newValue: number): void {
        svg = d3
          .select(container)
          .append('svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);

        const centerTx = centerTranslation();
        const gap = (Math.PI / 180) * 3;
        const arcs = svg
          .append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs
          .selectAll('path')
          .data(tickData)
          .enter()
          .append('path')
          .attr('fill', (_d: number, i: number) =>
            getColor(config.sections[i].color)
          )
          .attr('stroke', (_d: number, i: number) =>
            getColor(config.sections[i].color)
          )
          .attr('stroke-width', 2) // Increased for 8px border radius effect
          .attr('stroke-linecap', 'round')
          .attr('stroke-linejoin', 'round')

          .attr(
            'd',
            d3
              .arc()
              .innerRadius(r - config.ringWidth - config.ringInset)
              .outerRadius(r - config.ringInset)
              .startAngle((_d: number, i: number) => {
                const start = config.sections
                  .slice(0, i)
                  .reduce((sum: number, s: Section) => sum + +s.limit, 0);
                const ratio = start / config.maxValue;
                return deg2rad(config.minAngle + ratio * range) + gap / 2;
              })
              .endAngle((_d: number, i: number) => {
                const end = config.sections
                  .slice(0, i + 1)
                  .reduce((sum: number, s: Section) => sum + +s.limit, 0);
                const ratio = end / config.maxValue;
                return deg2rad(config.minAngle + ratio * range) - gap / 2;
              })
              .cornerRadius(8)
          );

        const needleWidth = config.pointerWidth + 2; // 10px
        const needleHeight = config.pointerHeight + 1; // 12px
        const needleOffset = config.needleOffset + 4;
        const lineData = [
          [0, -(r - config.ringInset - needleOffset)], // tip
          [
            -(needleWidth / 2),
            -(r - config.ringInset - needleHeight - needleOffset),
          ], // left base
          [
            needleWidth / 2,
            -(r - config.ringInset - needleHeight - needleOffset),
          ], // right base
          [0, -(r - config.ringInset - needleOffset)], // back to tip
        ];

        const pointerLine = d3.line().curve(d3.curveLinear);
        const pg = svg
          .append('g')
          .data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg
          .append('path')
          .attr('d', pointerLine(lineData))
          .attr('fill', 'rgb(var(--primary-text-color))') // Black fill for the triangle
          .attr('transform', `rotate(${config.minAngle})`);

        update(newValue);
      }

      function update(
        newValue: number,
        newConfiguration: any = undefined
      ): void {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        const ratio = scale(newValue);
        const newAngle = config.minAngle + ratio * range;
        pointer
          .transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', `rotate(${newAngle})`);
      }

      configure(configuration);

      return { configure, isRendered, render, update };
    };

    const powerGauge = gauge(gaugeRef.current!, {
      size: 140,
      clipWidth: 140,
      clipHeight: 70,
      ringWidth: 6,
      sections,
      transitionMs: 4000,
    });

    powerGauge.render(+value);

    return () => {
      d3.select(gaugeRef.current!).selectAll('*').remove();
    };
  }, [value, sections]);

  return (
    <>
      <div ref={gaugeRef} id="power-gauge" className="mx-auto "></div>
      <div className="absolute bottom-0 left-1/2 z-[2] -translate-x-1/2 flex justify-center items-center w-9 h-[22px]">
        <Typography>{value}</Typography>
      </div>
    </>
  );
};

export default Gauge;
