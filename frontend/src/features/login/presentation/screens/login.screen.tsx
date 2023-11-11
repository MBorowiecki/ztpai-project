import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth.hook';
import { Link } from 'react-router-dom';
import { Button } from 'core/buttons/presentation';
import { Input } from 'core/inputs/presentation';

export const LoginScreen = (): JSX.Element => {
  const { loginUser, setEmail, setPassword, userCredentialsErrors } = useAuth();

  return (
    <main className="row row-hcenter">
      <div className="col col-6 min-viewheight col-vcenter">
        <h1 className="text-center size-h1 color-light_1">Login</h1>

        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="mt-4 size-m"
          error={userCredentialsErrors.email}
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-2 size-m"
          error={userCredentialsErrors.password}
        />

        <Button text="LOGIN" onClick={loginUser} className="mt-4 size-m weight-bold" />

        <p className="text-center mt-4 color-light_4">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};