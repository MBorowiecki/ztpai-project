import { Button } from 'core/buttons/presentation';
import { Input, Select } from 'core/inputs/presentation';
import {
  CarBodyMaterial,
  CarBodyType,
  CarSegment,
  NewCar
} from 'features/cars/data/models/car.model';
import { Engine } from 'features/engines/data/models/engine.models';
import { Formik } from 'formik';
import { type JSX } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useCars } from '../hooks/useCars.hook';
import { useEngines } from '../hooks/useEngines.hook';

interface Props {
  userId: string;
  token: string;
  onSubmit: (values: NewCar) => void;
}

const getEngineOptions = (engines: Engine[]): JSX.Element[] => {
  const options: JSX.Element[] = [];

  options.push(
    <option key="none" value={undefined}>
      No engine
    </option>
  );

  engines
    .filter((engine) => engine.in_production)
    .forEach((engine) => {
      options.push(
        <option key={engine.id} value={engine.id}>
          {engine.name}
        </option>
      );
    });

  return options;
};

export const NewCarForm = ({ userId, token, onSubmit }: Props): JSX.Element => {
  const formInitialValues: NewCar = {
    body_type: CarBodyType.HATCHBACK,
    car_body_material: CarBodyMaterial.STEEL,
    car_segment: CarSegment.A,
    name: '',
    length: 4500,
    number_of_seats: 4,
    engineId: undefined,
    userId
  };
  const { engines } = useEngines(userId, token);
  const { createValuationMutation, createdValuation } = useCars(userId, token);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={formInitialValues}
      validate={(values) => {
        const errors: Record<string, string> = {};

        if (!values.name) {
          errors.name = 'Car name is required';
        }

        if (!values.length) {
          errors.length = 'Car length is required';
        }

        if (!values.number_of_seats) {
          errors.number_of_seats = 'Number of seats is required';
        }

        if (!values.body_type) {
          errors.body_type = 'Body type is required';
        }

        if (!values.car_body_material) {
          errors.car_body_material = 'Body material is required';
        }

        if (!values.car_segment) {
          errors.car_segment = 'Car segment is required';
        }

        createValuationMutation({
          car: values
        });

        return errors;
      }}
      onSubmit={(values, { setTouched }) => {
        setTouched(
          {
            body_type: true,
            car_body_material: true,
            car_segment: true,
            name: true,
            length: true,
            number_of_seats: true,
            engineId: true,
            userId: true
          },
          true
        );
        onSubmit(values);
      }}>
      {({ handleSubmit, values, errors, handleChange, setFieldValue }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="row row-vcenter row-hcenter">
              <div className="col col-12 col-hcenter mb-3">
                <h1 className="size-xxl color-primary_3 weight-bold">Create new car</h1>
              </div>

              <div className="col col-10 divider" />

              <div className="mt-4 col col-8 col-hcenter">
                <p className="size-s color-light_2 mb-1 full-width">Car name</p>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Car name"
                  className="size-s"
                  value={values.name}
                  error={errors.name}
                />
              </div>

              <div className="mt-2 col col-8 col-hcenter">
                <p className="size-s color-light_2 mb-1 full-width">Body type</p>
                <Select
                  name="body_type"
                  onChange={handleChange}
                  className="size-s"
                  value={values.body_type}
                  placeholder="Body type"
                  error={errors.body_type}>
                  <option value={CarBodyType.CONVERTIBLE}>Convertible</option>
                  <option value={CarBodyType.COUPE}>Coupe</option>
                  <option value={CarBodyType.HATCHBACK}>Hatchback</option>
                  <option value={CarBodyType.PICKUP}>Pickup</option>
                  <option value={CarBodyType.SEDAN}>Sedan</option>
                  <option value={CarBodyType.SUV}>SUV</option>
                </Select>
              </div>

              <div className="col col-8 col-hcenter mt-2">
                <p className="size-s color-light_2 mb-1 full-width">Body material</p>
                <Select
                  name="car_body_material"
                  onChange={handleChange}
                  className="size-s"
                  value={values.car_body_material}
                  error={errors.car_body_material}
                  placeholder="Body material">
                  <option value={CarBodyMaterial.ALUMINIUM}>Aluminium</option>
                  <option value={CarBodyMaterial.STEEL}>Steel</option>
                  <option value={CarBodyMaterial.CARBON_FIBER}>Carbon Fiber</option>
                  <option value={CarBodyMaterial.PLASTIC}>Plastic</option>
                </Select>
              </div>

              <div className="col col-8 mt-2 col-hcenter">
                <p className="size-s color-light_2 mb-1 full-width">Car segment</p>
                <Select
                  name="car_segment"
                  onChange={handleChange}
                  className="size-s"
                  value={values.car_segment}
                  error={errors.car_segment}
                  placeholder="Body material">
                  <option value={CarSegment.A}>A</option>
                  <option value={CarSegment.B}>B</option>
                  <option value={CarSegment.C}>C</option>
                  <option value={CarSegment.D}>D</option>
                  <option value={CarSegment.E}>E</option>
                  <option value={CarSegment.F}>F</option>
                </Select>
              </div>

              <div className="mt-2 col col-8 col-hcenter">
                <p className="size-s color-light_2 mb-1 full-width">
                  Body length <span className="size-xs color-light_4">(in cm)</span>
                </p>
                <Input
                  type="number"
                  name="length"
                  onChange={handleChange}
                  placeholder="Body length (in cm)"
                  className="size-s"
                  value={values.length.toString()}
                  error={errors.length}
                />
              </div>

              <div className="mt-2 col col-8 col-hcenter">
                <p className="size-s color-light_2 mb-1 full-width">Number of seats</p>
                <Input
                  type="number"
                  name="number_of_seats"
                  onChange={handleChange}
                  placeholder="Number of seats"
                  className="size-s"
                  value={values.number_of_seats.toString()}
                  error={errors.number_of_seats}
                />
              </div>

              <div className="col col-8 mt-2 col-hcenter">
                <p className="size-s color-light_2 mb-1 full-width">Engine</p>
                <Select
                  name="engineId"
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val === 'No engine') {
                      setFieldValue('engineId', undefined);
                    } else {
                      setFieldValue('engineId', parseInt(val, 10));
                    }
                  }}
                  className="size-s"
                  value={values.engineId?.toString()}
                  error={errors.engineId}
                  placeholder="Engine">
                  {getEngineOptions(engines?.data ?? [])}
                </Select>
              </div>

              <div className="col col-8 col-hcenter mt-2">
                <div className="row row-vcenter size-l color-light_2 mb-1 full-width">
                  Estimated price: <FaMoneyBill className="size-xl color-green_1 mr-1 ml-1" />
                  <span className="color-green_1">{createdValuation?.data?.valuation}€</span>
                </div>
              </div>

              <div className="col col-8 col-hcenter">
                <div className="row row-vcenter row-hcenter full-width">
                  <div className="col pr-2 col-grow">
                    <Button
                      type="error"
                      className="mt-4 pv-2 ph-4 full-width"
                      onClick={() => navigate('/cars')}>
                      <p className="size-m color-dark_3 weight-bold">CANCEL</p>
                    </Button>
                  </div>
                  <div className="col pl-2 col-grow">
                    <Button
                      type="tertiary"
                      className="mt-4 size-m weight-bold pv-2 ph-4 full-width"
                      onClick={() => {
                        handleSubmit();
                      }}>
                      <p className="size-m color-dark_3 weight-bold">CREATE CAR</p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
