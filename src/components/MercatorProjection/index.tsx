import { Country } from 'components/Card';
import React, { ReactElement } from 'react';

type MercatorProjectionProps = {
  country: Country;
};

const MercatorProjection = ({ country }: MercatorProjectionProps): ReactElement => {
  return <div>{country.name}</div>;
};

export default MercatorProjection;
