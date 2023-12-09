import { useMutation } from '@tanstack/react-query';
import { createCompany } from 'features/companies/data';
import { UserProfile } from 'features/login/types';

interface Props {
  user: UserProfile;
}

export const useCreateCompany = ({ user }: Props) => {
  const {
    data: createCompanyData,
    error: createCompanyError,
    status: createCompanyStatus,
    mutate: createCompanyMutate
  } = useMutation({
    mutationKey: ['createCompany'],
    mutationFn: ({ companyName }: { companyName: string }) =>
      createCompany(companyName, user.id, user.token)
  });

  return {
    createCompanyMutate,
    createCompanyError,
    createCompanyData,
    createCompanyStatus
  };
};
