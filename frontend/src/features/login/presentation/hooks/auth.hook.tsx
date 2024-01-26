import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from 'core/hooks';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { setUser } from 'core/store/user';
import { login, register } from 'features/login/data';
import { UserProfile } from 'features/login/types/user.types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('profile', null);
  const {
    data: loginData,
    error: loginError,
    mutate: mutateLogin
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({
        email,
        password
      })
  });
  const {
    data: registerData,
    error: registerError,
    mutate: mutateRegister
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: ({
      email,
      password,
      username
    }: {
      email: string;
      password: string;
      username: string;
    }) =>
      register({
        email,
        password,
        username
      })
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginError) {
      return;
    }

    if (loginData) {
      setProfile(loginData);
      dispatch(setUser(loginData));

      navigate('/company');
    }
  }, [loginData, loginError]);

  useEffect(() => {
    if (registerError) {
      return;
    }

    if (registerData) {
      setProfile(registerData);
      dispatch(setUser(registerData));

      navigate('/company');
    }
  }, [registerData, registerError]);

  return {
    profile,
    mutateLogin,
    mutateRegister,
    loginError,
    registerError
  };
};
