import { Button } from 'core/buttons/presentation';
import { useCarIcon } from 'core/hooks';
import { type JSX } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Car } from '../data/models/car.model';

interface Props {
  car: Car;
  onActionClick: (car: Car) => void;
}

export const CarsListItem = ({ car, onActionClick }: Props): JSX.Element => {
  const navigate = useNavigate();
  const carIcon = useCarIcon(car.body_type);

  return (
    <div className="col col-12 mb-2">
      <div
        className="row row-vcenter card card--button"
        onClick={() => navigate(`/cars/${car.id}`)}>
        <div className="col">
          <img src={carIcon} alt={car.body_type} className="img_icon-s pr-4 pl-2" />
        </div>

        <div className="col">
          <p className="size-xl weight-bold color-light_2 pr-4">{car.name}</p>
        </div>

        <div className="col col-grow">
          <p className="size-l color-light_4">
            {car.body_type} - {car.number_of_seats} seat{car.number_of_seats > 1 ? 's' : ''}
          </p>
        </div>

        <div className="col">
          <div className="row row-vcenter">
            <FaMoneyBill className="size-xl color-green_1 mr-1" />
            <p className="size-l color-green_1 pr-2">{car.cost}€</p>

            <Button
              type={car.in_production ? 'error' : 'tertiary'}
              className="pv-1 ph-2"
              onClick={(e) => {
                e.stopPropagation();
                onActionClick(car);
              }}>
              <p className="weight-bold color-dark_3">
                {car.in_production ? 'STOP PRODUCTION' : 'START PRODUCTION'}
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
