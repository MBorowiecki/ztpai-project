import { useUserCompany } from 'core/hooks';
import { Sidebar } from 'core/sidebar/presentation';
import { TopBar } from 'core/topbar/presentation';
import { type JSX, useState } from 'react';

import { useCars } from '../hooks/useCars.hook';
import { NewCarForm } from './newCarForm.component';

export const NewCarScreen = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { companyData, user } = useUserCompany();
  const { createCarMutation } = useCars(user?.id.toString() ?? '', user?.token ?? '');

  return (
    <main>
      <Sidebar hasCompany={companyData !== undefined} sidebarOpen={sidebarOpen} />

      <div className="content-with_sidebar">
        <TopBar company={companyData} setSidebarOpen={setSidebarOpen} />

        <div className="p-4">
          {user && (
            <NewCarForm
              userId={user?.id.toString() ?? ''}
              token={user?.token ?? ''}
              onSubmit={(values) =>
                createCarMutation({
                  car: values
                })
              }
            />
          )}
        </div>
      </div>
    </main>
  );
};
