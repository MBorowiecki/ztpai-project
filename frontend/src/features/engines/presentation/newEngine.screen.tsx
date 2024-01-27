import { Button } from 'core/buttons/presentation';
import { basePowerPerCylinder, baseWeightPerCylinder } from 'core/config/car';
import { useUserCompany } from 'core/hooks';
import { Input } from 'core/inputs/presentation';
import { Sidebar } from 'core/sidebar/presentation';
import { TopBar } from 'core/topbar/presentation';
import { type JSX, useEffect, useState } from 'react';

import { useEngine } from './hooks';
import { EngineCylinderCount } from './newEngineComponents';

export const NewEngineScreen = (): JSX.Element => {
  const { companyData, user } = useUserCompany();
  const { engineValuationMutate, engineValuationData, engineCreationMutate } = useEngine();
  const [cylinderCount, setCylinderCount] = useState<number>(4);
  const [capacity, setCapacity] = useState<number>(1800);
  const [weight, setWeight] = useState<number>(150);
  const [name, setName] = useState<string>('I4C18');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const newWeight = Math.round((baseWeightPerCylinder * capacity) / 400);
    setWeight(newWeight);

    engineValuationMutate({
      engine: {
        cylinders: cylinderCount,
        capacity: capacity.toString(),
        power: ((basePowerPerCylinder * capacity) / 400).toString(),
        name,
        userId: user?.id ?? 0,
        weight: newWeight
      },
      token: user?.token ?? ''
    });
  }, [cylinderCount, capacity, user?.token]);

  useEffect(() => {
    const newWeight = Math.round((baseWeightPerCylinder * capacity) / 400);
    setWeight(newWeight);
  }, []);

  return (
    <main>
      <Sidebar
        hasCompany={companyData !== undefined}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="content-with_sidebar">
        <TopBar company={companyData} setSidebarOpen={setSidebarOpen} />

        <div className="p-4">
          <div className="row row-hcenter">
            <div className="col col-10 pb-4 pl-2 col-s-12 pl-s-0">
              <h3 className="weight-bold size-l color-light_2 pb-2">Engine name</h3>
              <Input
                type="text"
                name="engineName"
                placeholder="Engine name"
                className="size-m"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="col col-5 pb-4 pr-2 col-s-12 pr-s-0">
              <EngineCylinderCount onChange={setCylinderCount} value={cylinderCount} />
            </div>

            <div className="col col-5 pb-4 pl-2 col-s-12 pl-s-0">
              <h3 className="weight-bold size-l color-light_2 pb-2">
                Engine size <span className="size-xs color-light_5">(in cm3)</span>
              </h3>
              <Input
                type="number"
                name="engineSize"
                placeholder="Engine size in cm3"
                className="size-m"
                value={capacity.toString()}
                onChange={(e) => {
                  setCapacity(e.target.valueAsNumber);
                }}
              />
            </div>

            <div className="divider col col-10 col-s-12" />

            <div className="col col-3 pb-4 pr-2 pt-2 col-s-5 pr-s-0">
              <h3 className="weight-bold size-l color-light_2 pb-2">
                Engine power <span className="size-xs color-light_5">(in HP)</span>
              </h3>

              <p className="size-l color-light_2 weight-bold">
                {(basePowerPerCylinder * capacity) / 400} HP
              </p>
            </div>

            <div className="col col-3 pb-4 pl-2 pt-2 col-s-5">
              <h3 className="weight-bold size-l color-light_2 pb-2">
                Engine weight <span className="size-xs color-light_5">(in KG)</span>
              </h3>

              <p className="size-l color-light_2 weight-bold">{Math.round(weight)} KG</p>
            </div>

            <div className="col col-3 pb-4 pl-2 pt-2 col-s-12 pl-s-0 col-s-hcenter">
              <h3 className="weight-bold size-l color-light_2 pb-2">
                Unit price <span className="size-xs color-light_5">(in €)</span>
              </h3>

              <p className="size-l color-light_2 weight-bold">
                {Math.round(engineValuationData?.data?.valuation ?? 0)} €
              </p>
            </div>

            <div className="col col-10 pt-2">
              <Button
                className="size-m pv-2 weight-bold"
                onClick={() => {
                  engineCreationMutate({
                    engine: {
                      cylinders: cylinderCount,
                      capacity: capacity.toString(),
                      power: ((basePowerPerCylinder * capacity) / 400).toString(),
                      name,
                      userId: user?.id ?? 0,
                      weight: Math.round(weight)
                    },
                    token: user?.token ?? ''
                  });
                }}>
                Create engine
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
