import { useUserCompany } from 'core/hooks';
import { Sidebar } from 'core/sidebar/presentation';
import { TopBar } from 'core/topbar/presentation';
import { type JSX, useEffect, useState } from 'react';

import { CreateCompanyComponent } from './createCompany.component';

export const UserCompany = (): JSX.Element => {
  const { companyData, user, companyFetchStatus, refetchCompany } = useUserCompany();
  const [isCompanyCreated, setIsCompanyCreated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isCompanyCreated) {
      refetchCompany();
    }
  }, [isCompanyCreated]);

  return (
    <main>
      <Sidebar hasCompany={companyData !== undefined} sidebarOpen={sidebarOpen} />

      <div className="content-with_sidebar">
        <TopBar company={companyData} setSidebarOpen={setSidebarOpen} />

        {!companyData &&
          user &&
          (companyFetchStatus === 'error' || companyFetchStatus === 'success') && (
            <CreateCompanyComponent user={user} setIsCompanyCreated={setIsCompanyCreated} />
          )}
      </div>
    </main>
  );
};
