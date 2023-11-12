import { useAppDispatch, useAppSelector } from 'core/hooks';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { setUser } from 'core/store/user';
import { UserProfile } from 'features/login/types/user.types';
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

  useEffect(() => {
    console.log(userState);

    if (!userState) {
      if (profile) {
        dispatch(setUser(profile));
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [userState]);

  return children;
};
