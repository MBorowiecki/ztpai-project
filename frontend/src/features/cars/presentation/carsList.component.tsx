import { type JSX, useState } from 'react';

import { Car } from '../data/models/car.model';
import { CarsListHeader } from './carsListHeader.component';
import { CarsListItem } from './carsListItem.component';

interface Props {
  cars: Car[];
  onActionClick: (car: Car) => void;
}

export const CarsList = ({ cars, onActionClick }: Props): JSX.Element => {
  const [filteringOption, setFilteringOption] = useState<string>('all');

  return (
    <div className="col-12">
      <CarsListHeader setFilteringOption={setFilteringOption} filteringOption={filteringOption} />

      {cars
        .filter((val) => {
          switch (filteringOption) {
            case 'all':
              return true;
            case 'in_production':
              return val.in_production;
            case 'not_in_production':
              return !val.in_production;
            default:
              return true;
          }
        })
        .map((car) => {
          return <CarsListItem key={car.id} car={car} onActionClick={onActionClick} />;
        })}
    </div>
  );
};
