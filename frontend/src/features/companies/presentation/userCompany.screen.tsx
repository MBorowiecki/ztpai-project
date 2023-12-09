import { Sidebar } from 'core/sidebar/presentation';
import { TopBar } from 'core/topbar/presentation';
import { type JSX, useEffect, useState } from 'react';

import { CreateCompanyComponent } from './createCompany.component';
import { useUserCompany } from './hooks/userCompany.hook';

export const UserCompany = (): JSX.Element => {
  const { companyData, user, companyFetchStatus, refetchCompany } = useUserCompany();
  const [isCompanyCreated, setIsCompanyCreated] = useState(false);

  useEffect(() => {
    if (isCompanyCreated) {
      refetchCompany();
    }
  }, [isCompanyCreated]);

  return (
    <main>
      <Sidebar hasCompany={companyData !== undefined} />

      <div className="content-with_sidebar">
        <TopBar company={companyData} />

        {!companyData &&
          user &&
          (companyFetchStatus === 'error' || companyFetchStatus === 'success') && (
            <CreateCompanyComponent user={user} setIsCompanyCreated={setIsCompanyCreated} />
          )}
      </div>
    </main>
  );
};
