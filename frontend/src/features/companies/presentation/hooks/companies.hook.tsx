import { useQuery } from '@tanstack/react-query';
import { getAllCompanies } from 'features/companies/data';

export const useCompanies = () => {
  const {
    data: companiesData,
    error: companiesError,
    refetch: refetchCompanies
  } = useQuery({
    queryKey: ['getAllCompanies'],
    queryFn: () => getAllCompanies(),
    enabled: true
  });

  const getCompanies = () => {
    refetchCompanies();
  };

  return {
    companiesData,
    companiesError,
    getCompanies
  };
};
