import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { login, register } from 'features/login/data/auth.dataSource';
import { UserCredentials, UserProfile } from 'features/login/types/user.types';

export const useAuth = () => {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('profile', null);

  const loginUser = async (credentials: UserCredentials) => {
    try {
      const _profile = await login(credentials);

      setProfile(_profile);
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (credentials: UserCredentials) => {
    try {
      const _profile = await register(credentials);

      setProfile(_profile);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    profile,
    loginUser,
    registerUser
  };
};
