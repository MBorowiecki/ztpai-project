import { Button } from 'core/buttons/presentation';
import { Input } from 'core/inputs/presentation';
import { minLength } from 'core/validators/';
import { UserProfile } from 'features/login/types';
import { Formik } from 'formik';
import { type JSX, useEffect } from 'react';

import { useCreateCompany } from './hooks/createCompany.hook';

interface Props {
  user: UserProfile;
  setIsCompanyCreated: (isCompanyCreated: boolean) => void;
}

export const CreateCompanyComponent = ({ user, setIsCompanyCreated }: Props): JSX.Element => {
  const { createCompanyStatus, createCompanyMutate } = useCreateCompany({ user });

  useEffect(() => {
    if (createCompanyStatus === 'success') {
      setIsCompanyCreated(true);
    }
  }, [createCompanyStatus]);

  return (
    <div className="row row-hcenter pt-4">
      <div className="col col-6 col-hcenter">
        <Formik
          initialValues={{
            companyName: ''
          }}
          validate={({ companyName }) => {
            const errors: Record<string, string> = {};

            if (!companyName) {
              errors.companyName = 'Company name is required';
            }

            if (!minLength(companyName, 3)) {
              errors.companyName = 'Company name must be at least 3 characters long';
            }

            return errors;
          }}
          onSubmit={({ companyName }) => {
            createCompanyMutate({ companyName });
          }}>
          {({ handleSubmit, values, errors, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <p className="text-center size-l color-light_4">
                You don&apos;t have a company yet. How do you want to call it?
              </p>

              <Input
                type="text"
                name="companyName"
                onChange={handleChange}
                placeholder="Company name"
                className="mt-4 size-m"
                error={errors.companyName}
                value={values.companyName}
              />

              <Button
                onClick={handleSubmit}
                className="mt-4 size-m weight-bold pv-2 ph-4 full-width">
                Create Company
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
