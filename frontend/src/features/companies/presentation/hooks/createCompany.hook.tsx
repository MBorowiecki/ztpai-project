import { useQuery } from '@tanstack/react-query';
import { createCompany } from 'features/companies/data';
import { UserProfile } from 'features/login/types';
import { useState } from 'react';

interface Props {
  user: UserProfile;
}

export const useCreateCompany = ({ user }: Props) => {
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const {
    data: createCompanyData,
    error: createCompanyError,
    refetch: createCompanyRefetch,
    status: createCompanyStatus
  } = useQuery({
    queryKey: ['createCompany', companyName, user.id, user.token],
    queryFn: () => createCompany(companyName, user.id, user.token),
    enabled: false
  });

  const createUserCompany = async () => {
    if (companyName.length < 3) {
      setCompanyNameError('Company name must be at least 3 characters long');
      return;
    }

    await createCompanyRefetch();
  };

  return {
    createUserCompany,
    createCompanyError,
    createCompanyData,
    companyNameError,
    setCompanyName,
    createCompanyStatus
  };
};
