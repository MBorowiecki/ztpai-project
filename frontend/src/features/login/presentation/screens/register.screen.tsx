import { Button } from 'core/buttons/presentation';
import { Input } from 'core/inputs/presentation';
import { minLength } from 'core/validators';
import { Formik } from 'formik';
import { type JSX } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/auth.hook';

export const RegisterScreen = (): JSX.Element => {
  const { mutateRegister } = useAuth();

  return (
    <main className="row row-hcenter">
      <div className="col col-6 min-viewheight col-vcenter">
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmedPassword: ''
          }}
          validate={({ email, password, confirmedPassword, username }) => {
            const errors: Record<string, string> = {};

            if (!username) {
              errors.username = 'Username is required';
            }

            if (!email) {
              errors.email = 'E-mail is required';
            }

            if (!password) {
              errors.password = 'Password is required';
            }

            if (!minLength(password, 6)) {
              errors.password = 'Password must be at least 6 characters long';
            }

            if (password !== confirmedPassword) {
              errors.confirmedPassword = 'Passwords must match';
            }

            return errors;
          }}
          onSubmit={({ email, password, username }, { setTouched }) => {
            setTouched(
              { email: true, password: true, confirmedPassword: true, username: true },
              true
            );
            mutateRegister({ email, password, username });
          }}>
          {({ handleSubmit, values, errors, handleChange, touched }) => (
            <form onSubmit={handleSubmit}>
              <h1 className="text-center size-h1 color-light_1">Register</h1>

              <Input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Username"
                className="mt-4 size-m"
                error={touched.username && errors.username}
                value={values.username}
              />
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="E-mail"
                className="mt-2 size-m"
                error={touched.email && errors.email}
                value={values.email}
              />
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="mt-2 size-m"
                error={touched.password && errors.password}
                value={values.password}
              />
              <Input
                type="password"
                name="confirmedPassword"
                onChange={handleChange}
                placeholder="Confirm password"
                className="mt-2 size-m"
                error={touched.confirmedPassword && errors.confirmedPassword}
                value={values.confirmedPassword}
              />

              <Button
                onClick={() => handleSubmit()}
                className="mt-4 size-m weight-bold pv-2 full-width">
                REGISTER
              </Button>

              <p className="text-center mt-4 color-light_4">
                Already have an account?{' '}
                <Link to="/login" className="link">
                  Login
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
};
