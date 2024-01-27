import { useUserCompany } from 'core/hooks';
import { Sidebar } from 'core/sidebar/presentation';
import { TopBar } from 'core/topbar/presentation';
import { type JSX, useState } from 'react';

import { EnginesList } from './enginesList.component';
import { useEngines } from './hooks';

export const EnginesScreen = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { companyData, user } = useUserCompany();
  const { engines, stopEngineProductionMutation } = useEngines(
    user?.id.toString() ?? '',
    user?.token ?? ''
  );

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
          <EnginesList
            engines={engines?.data ?? []}
            onStopProduction={(id) => stopEngineProductionMutation(id)}
          />
        </div>
      </div>
    </main>
  );
};
