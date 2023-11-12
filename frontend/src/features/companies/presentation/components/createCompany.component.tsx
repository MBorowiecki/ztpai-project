import { Button } from 'core/buttons/presentation';
import { Input } from 'core/inputs/presentation';
import { UserProfile } from 'features/login/types';
import { type JSX } from 'react';

import { useCreateCompany } from '../hooks/createCompany.hook';

interface Props {
  user: UserProfile;
}

export const CreateCompanyComponent = ({ user }: Props): JSX.Element => {
  const { setCompanyName, companyNameError, createUserCompany } = useCreateCompany({ user });

  return (
    <div className="row row-hcenter pt-4">
      <div className="col col-6 col-hcenter">
        <p className="text-center size-l color-light_4">
          You don&apos;t have a company yet. How do you want to call it?
        </p>

        <Input
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company name"
          className="mt-4 size-m"
          error={companyNameError}
        />

        <Button
          onClick={() => createUserCompany()}
          className="mt-4 size-m weight-bold pv-2 ph-4 full-width">
          Create Company
        </Button>
      </div>
    </div>
  );
};
