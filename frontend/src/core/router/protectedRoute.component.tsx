import { useAppSelector } from 'core/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const userState = useAppSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState) {
      navigate('/login', { replace: true });
    }
  }, [userState]);

  return children;
};
