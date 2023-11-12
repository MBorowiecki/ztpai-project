import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from 'core/hooks';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { setUser } from 'core/store/user';
import { login, register } from 'features/login/data/auth.dataSource';
import { UserCredentialsErrors, UserProfile } from 'features/login/types/user.types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('profile', null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userCredentialsErrors, setUserCredentialsErrors] = useState<UserCredentialsErrors>({});
  const {
    data: loginData,
    error: loginError,
    refetch: refetchLogin
  } = useQuery({
    queryKey: ['login', email, password],
    queryFn: () =>
      login({
        email,
        password
      }),
    enabled: false
  });
  const {
    data: registerData,
    error: registerError,
    refetch: refetchRegister
  } = useQuery({
    queryKey: ['register', email, password, username],
    queryFn: () =>
      register({
        email,
        password,
        username
      }),
    enabled: false
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkLoginCredentials = (): boolean => {
    const errors: UserCredentialsErrors = {};

    if (!email || email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setUserCredentialsErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const checkRegisterCredentials = (): boolean => {
    const errors: UserCredentialsErrors = {};

    if (!email || email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    if (!username) {
      errors.username = 'Username is required';
    }

    if (password !== confirmedPassword) {
      errors.confirmedPassword = 'Passwords do not match';
    }

    setUserCredentialsErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const loginUser = async () => {
    if (checkLoginCredentials() === false) {
      return;
    }

    await refetchLogin();

    if (loginError) {
      setProfile(null);
      dispatch(setUser(null));
      return;
    }

    if (loginData) {
      setProfile(loginData);
      dispatch(setUser(loginData));

      navigate('/companies');
    }
  };

  const registerUser = async () => {
    if (checkRegisterCredentials() === false) {
      return;
    }

    await refetchRegister();

    if (registerError) {
      setProfile(null);
      dispatch(setUser(null));
      return;
    }

    if (registerData) {
      setProfile(registerData);
      dispatch(setUser(registerData));

      navigate('/companies');
    }
  };

  return {
    profile,
    loginUser,
    registerUser,
    setEmail,
    setPassword,
    setUsername,
    setConfirmedPassword,
    userCredentialsErrors
  };
};
