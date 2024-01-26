import 'react-responsive-modal/styles.css';

import { Button } from 'core/buttons/presentation';
import { useCarIcon, useUserCompany } from 'core/hooks';
import { Select } from 'core/inputs/presentation';
import { Sidebar } from 'core/sidebar/presentation';
import { TopBar } from 'core/topbar/presentation';
import { Engine } from 'features/engines/data/models/engine.models';
import { type JSX, useState } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import { useParams } from 'react-router-dom';

import { CarBodyMaterial, CarBodyType, CarSegment } from '../data/models/car.model';
import { useCar } from './hooks/useCar.hook';
import { useEngines } from './hooks/useEngines.hook';

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

export const CarScreen = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { companyData, user } = useUserCompany();
  const { carId } = useParams<{ carId: string }>();
  const { car, updateCarMutation } = useCar(carId ?? '', user?.token ?? '');
  const { engines } = useEngines(user?.id.toString() ?? '', user?.token ?? '');
  const [changeEngineModalOpen, setChangeEngineModalOpen] = useState<boolean>(false);
  const carIcon = useCarIcon(car?.data?.body_type ?? CarBodyType.HATCHBACK);
  const [newEngineId, setNewEngineId] = useState<string | undefined>(undefined);

  return (
    <main>
      <Sidebar hasCompany={companyData !== undefined} sidebarOpen={sidebarOpen} />

      <div className="content-with_sidebar">
        <TopBar company={companyData} setSidebarOpen={setSidebarOpen} />

        <div className="p-4">
          <div className="row row-vcenter row-hcenter">
            <div className="col col-10 mb-1">
              <div className="row row-vcenter">
                <div className="col">
                  <img
                    src={carIcon}
                    alt={car?.data?.body_type ?? ''}
                    className="img_icon-s pr-4 pl-2"
                  />
                </div>
                <div className="col col-grow">
                  <h1 className="size-xxl color-primary_3 weight-bold">{car?.data?.name}</h1>
                </div>

                <div className="col">
                  <div className="row row-vcenter">
                    <FaMoneyBill className="size-xl color-green_1 mr-1" />
                    <p className="size-xl color-green_1 pr-2">{car?.data?.cost}€</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-10 divider" />

            <div className="mt-2 col col-10">
              <div className="row row-vcenter">
                <div className="col col-12">
                  <div className="row row-vcenter">
                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Body type</p>
                      <p className="size-l color-light_2 mb-2">{car?.data?.body_type}</p>
                    </div>

                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Body material</p>
                      <p className="size-l color-light_2 mb-2">{car?.data?.car_body_material}</p>
                    </div>
                  </div>

                  <div className="row row-vcenter">
                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Car segment</p>
                      <p className="size-l color-light_2 mb-2">{car?.data?.car_segment}</p>
                    </div>

                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Number of seats</p>
                      <p className="size-l color-light_2 mb-2">{car?.data?.number_of_seats}</p>
                    </div>
                  </div>

                  <div className="row row-vcenter">
                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Length</p>
                      <p className="size-l color-light_2 mb-2">
                        {parseFloat(car?.data?.length ?? '0.0').toFixed(0)} cm
                      </p>
                    </div>

                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">In Production</p>
                      <p className="size-l color-light_2 mb-2">
                        <Button
                          type={car?.data?.in_production ? 'error' : 'tertiary'}
                          className="pv-1 ph-2"
                          onClick={() => {
                            updateCarMutation({
                              _car: {
                                id: car?.data?.id ?? -1,
                                body_type: car?.data?.body_type ?? CarBodyType.HATCHBACK,
                                engineId: car?.data?.engine?.id ?? -1,
                                car_body_material:
                                  car?.data?.car_body_material ?? CarBodyMaterial.STEEL,
                                car_segment: car?.data?.car_segment ?? CarSegment.A,
                                length: parseFloat(car?.data?.length ?? ''),
                                name: car?.data?.name ?? '',
                                userId: (car?.data?.user?.id ?? -1).toString(),
                                in_production: !car?.data?.in_production,
                                number_of_seats: car?.data?.number_of_seats ?? 0,
                                cost: car?.data?.cost ?? 0
                              },
                              carId: car?.data?.id.toString() ?? ''
                            });
                          }}>
                          <p className="weight-bold color-dark_3">
                            {car?.data?.in_production ? 'STOP PRODUCTION' : 'START PRODUCTION'}
                          </p>
                        </Button>
                      </p>
                    </div>
                  </div>

                  <div className="row row-vcenter mt-4 mb-2">
                    <p className="size-xxl weight-bold color-light_1">Engine</p>

                    <Button
                      onClick={() => {
                        setNewEngineId(car?.data?.engine?.id.toString() ?? undefined);
                        setChangeEngineModalOpen(true);
                      }}
                      type="tertiary"
                      className="pv-1 ph-2 ml-2">
                      <p className="weight-bold color-dark_3">CHANGE ENGINE</p>
                    </Button>
                  </div>

                  <div className="row row-vcenter">
                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Name</p>
                      <p className="size-l color-light_2 mb-2">
                        {car?.data?.engine?.name ?? 'No engine'}
                      </p>
                    </div>

                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Power</p>
                      <p className="size-l color-light_2 mb-2">
                        {car?.data?.engine?.power ?? '---'} HP
                      </p>
                    </div>
                  </div>

                  <div className="row row-vcenter">
                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Weight</p>
                      <p className="size-l color-light_2">
                        {car?.data?.engine?.weight ?? '---'} KG
                      </p>
                    </div>

                    <div className="col col-6">
                      <p className="size-s color-light_4 mb-1 full-width">Cost</p>
                      <div className="row row-vcenter">
                        <FaMoneyBill className="size-xl color-green_1 mr-1" />
                        <p className="size-xl color-green_1 pr-2">
                          {car?.data?.engine?.cost ?? '--- '}€
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={changeEngineModalOpen}
        onClose={() => setChangeEngineModalOpen(false)}
        center
        closeOnEsc
        closeOnOverlayClick>
        <div className="col col-hcenter col-vcenter pt-4">
          <div className="row row-vcenter">
            <p className="size-xxl color-dark_3 weight-bold mb-2">
              Choose new engine to fit in the car
            </p>
          </div>

          <div className="row row-vcenter mt-2 full-width">
            <div className="col col-12">
              <Select
                name="engine"
                onChange={(e) => {
                  const val = e.target.value;

                  if (val === 'No engine') {
                    setNewEngineId(undefined);
                  } else {
                    setNewEngineId(val);
                  }
                }}
                className="size-s color-dark_3"
                value={newEngineId ?? undefined}
                placeholder="Engine">
                {getEngineOptions(engines?.data ?? [])}
              </Select>
            </div>
          </div>
          <div className="row row-vcenter mt-2 full-width">
            <div className="col col-12">
              <Button
                type="tertiary"
                className="size-m weight-bold pv-2 ph-4 full-width"
                onClick={() => {
                  updateCarMutation({
                    _car: {
                      id: car?.data?.id ?? -1,
                      body_type: car?.data?.body_type ?? CarBodyType.HATCHBACK,
                      engineId: parseInt(newEngineId ?? '-1', 10),
                      car_body_material: car?.data?.car_body_material ?? CarBodyMaterial.STEEL,
                      car_segment: car?.data?.car_segment ?? CarSegment.A,
                      length: parseFloat(car?.data?.length ?? ''),
                      name: car?.data?.name ?? '',
                      userId: (car?.data?.user?.id ?? -1).toString(),
                      in_production: car?.data?.in_production ?? false,
                      number_of_seats: car?.data?.number_of_seats ?? 0,
                      cost: car?.data?.cost ?? 0
                    },
                    carId: car?.data?.id.toString() ?? ''
                  });
                  setChangeEngineModalOpen(false);
                }}>
                <p className="size-m color-dark_3 weight-bold">CHANGE ENGINE</p>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
};
