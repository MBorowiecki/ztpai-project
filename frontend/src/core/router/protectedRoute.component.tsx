import { useAppDispatch, useAppSelector } from 'core/hooks';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { setUser } from 'core/store/user';
import { verifyToken } from 'features/login/data';
import { UserProfile } from 'features/login/types';
import { useEffect } from 'react';
import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const [profile, , refetchValue] = useLocalStorage<UserProfile | null>('profile', null);
  const userState = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkLocalLoginCredentials = async () => {
    if (profile) {
      try {
        await verifyToken(profile.token);

        if (!userState) dispatch(setUser(profile));
      } catch (error) {
        dispatch(setUser(null));
        navigate('/login', { replace: true });
      }
    } else {
      dispatch(setUser(null));
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    checkLocalLoginCredentials();
  }, [profile]);

  useEffect(() => {
    if (!userState) {
      refetchValue();
    }
  }, [userState]);

  return children;
};
