import React, { ReactElement, ReactNode, useMemo } from 'react';
import { Mercator } from '@visx/geo';
import { feature } from 'topojson-client';
import topology from 'constants/worldTopo.json';
import classNames from 'components/utils/classNames';

type Geometry = {
  coordinates: [number, number][][];
  type: 'Polygon';
};

type FeatureShape = {
  type: 'Feature';
  id: string;
  geometry: Geometry;
  properties: {
    name: string;
  };
};

export type CountryData = {
  code: string;
  value: number;
  /**
   * Tailwind class name, `fill-*`.
   */
  fill?: string;
};

export type MercatorProjectionProps = {
  data: CountryData[];
  width: number;
  height: number;
};

// A TS error is expected because we cannot assert the type for the imported JSON.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const world = feature(topology, topology.objects.units) as unknown as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

const MercatorProjection = ({
  data,
  width,
  height,
}: MercatorProjectionProps): ReactElement | null => {
  /**
   * Countries that have data.
   */
  const targetFeatures = useMemo(() => {
    /**
     * Topology units filtered by target country codes.
     */
    const units = {
      ...topology.objects.units,
      geometries: topology.objects.units.geometries.filter((geometry) =>
        data.some((country) => country.code === geometry.id)
      ),
    };

    // A TS error is expected because we cannot assert type for the imported JSON.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return feature(topology, units);
  }, [data]);

  if (width < 10) {
    return null;
  }

  return (
    <div className="relative">
      <svg width={width} height={height} className="relative">
        <rect x={0} y={0} width={width} height={height} className="fill-white" rx={14} />
        <Mercator<FeatureShape>
          data={world.features}
          // Change projection scale to fit all the countries that have data
          fitSize={[[width, height], targetFeatures]}
        >
          {(mercator): ReactNode => (
            <g>
              {mercator.features.map(({ feature, path }) => {
                const country = data.find((country) => country.code === feature.id);

                const fill = country?.fill || 'fill-neutral-N100';

                return (
                  <path
                    key={feature.id}
                    id={feature.id}
                    d={path || ''}
                    className={classNames(fill, 'hover:fill-primary-P500 stroke-1 transition')}
                    stroke="rgba(0, 0, 0, 0.1)" // Country/state border colour
                  />
                );
              })}
            </g>
          )}
        </Mercator>
      </svg>
    </div>
  );
};

export default MercatorProjection;
