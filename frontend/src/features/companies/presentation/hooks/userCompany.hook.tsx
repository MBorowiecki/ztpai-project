import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'core/hooks';
import { getUserCompany } from 'features/companies/data';
import { useEffect } from 'react';

export const useUserCompany = () => {
  const userState = useAppSelector((state) => state.user.value);
  const {
    data: companyData,
    error: companyError,
    refetch: refetchCompany,
    status: companyFetchStatus
  } = useQuery({
    queryKey: ['getUserCompany', userState?.id, userState?.token],
    queryFn: () => getUserCompany(userState?.id ?? 0, userState?.token ?? ''),
    enabled: false,
    retry: false
  });

  useEffect(() => {
    if (userState) {
      refetchCompany();
    }
  }, [userState]);

  return {
    companyData,
    companyError,
    refetchCompany,
    user: userState,
    companyFetchStatus
  };
};
