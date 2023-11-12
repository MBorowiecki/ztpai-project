import { Sidebar } from 'core/sidebar/presentation';
import { TopBar } from 'core/topbar/presentation';
import { type JSX } from 'react';

import { CreateCompanyComponent } from '../components';
import { useUserCompany } from '../hooks/userCompany.hook';

export const UserCompany = (): JSX.Element => {
  const { companyData, user } = useUserCompany();

  return (
    <main>
      <Sidebar hasCompany={companyData !== undefined} />

      <div className="content-with_sidebar">
        <TopBar company={companyData} />

        {!companyData && user && <CreateCompanyComponent user={user} />}
      </div>
    </main>
  );
};
