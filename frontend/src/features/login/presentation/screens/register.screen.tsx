import { Button } from 'core/buttons/presentation';
import { Input } from 'core/inputs/presentation';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/auth.hook';

export const RegisterScreen = (): JSX.Element => {
  const {
    registerUser,
    setEmail,
    setPassword,
    setUsername,
    setConfirmedPassword,
    userCredentialsErrors
  } = useAuth();

  return (
    <main className="row row-hcenter">
      <div className="col col-6 min-viewheight col-vcenter">
        <h1 className="text-center size-h1 color-light_1">Register</h1>

        <Input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="mt-4 size-m"
          error={userCredentialsErrors.username}
        />
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="mt-2 size-m"
          error={userCredentialsErrors.email}
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-2 size-m"
          error={userCredentialsErrors.password}
        />
        <Input
          type="password"
          onChange={(e) => setConfirmedPassword(e.target.value)}
          placeholder="Confirm password"
          className="mt-2 size-m"
          error={userCredentialsErrors.confirmedPassword}
        />

        <Button text="REGISTER" onClick={registerUser} className="mt-4 size-m weight-bold" />

        <p className="text-center mt-4 color-light_4">
          Already have an account?{' '}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};
