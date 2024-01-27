import { useUserCompany } from 'core/hooks';
import { Sidebar } from 'core/sidebar/presentation';
import { TopBar } from 'core/topbar/presentation';
import { type JSX, useState } from 'react';

import { CarsList } from './carsList.component';
import { useCars } from './hooks/useCars.hook';

export const CarsScreen = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { companyData, user } = useUserCompany();
  const { cars, updateCarMutation } = useCars(user?.id.toString() ?? '', user?.token ?? '');

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
          <CarsList
            cars={cars?.data ?? []}
            onActionClick={(car) => {
              const {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                body_type,
                engine,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                car_body_material,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                car_segment,
                length,
                name,
                user: carUser,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                in_production,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                number_of_seats
              } = car;

              updateCarMutation({
                car: {
                  body_type,
                  engineId: engine?.id,
                  car_body_material,
                  car_segment,
                  length: parseFloat(length),
                  name,
                  userId: carUser.id.toString(),
                  in_production: !in_production,
                  number_of_seats,
                  id: car.id
                },
                carId: car.id.toString()
              });
            }}
          />
        </div>
      </div>
    </main>
  );
};
