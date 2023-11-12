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
  const [profile] = useLocalStorage<UserProfile | null>('profile', null);
  const userState = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkLocalLoginCredentials = async () => {
    if (profile) {
      try {
        console.log(profile.token);
        await verifyToken(profile.token);

        dispatch(setUser(profile));
      } catch (error) {
        navigate('/login', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    if (!userState) {
      checkLocalLoginCredentials();
    }
  }, [userState]);

  return children;
};
