import { Button } from 'core/buttons/presentation';
import { Input } from 'core/inputs/presentation';
import { minLength } from 'core/validators';
import { Formik } from 'formik';
import { type JSX } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/auth.hook';

export const LoginScreen = (): JSX.Element => {
  const { mutateLogin, loginError } = useAuth();

  return (
    <main className="row row-hcenter">
      <div className="col col-6 min-viewheight col-vcenter">
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validate={({ email, password }) => {
            const errors: Record<string, string> = {};

            if (!email) {
              errors.email = 'E-mail is required';
            }

            if (!password) {
              errors.password = 'Password is required';
            }

            if (!minLength(password, 6)) {
              errors.password = 'Password must be at least 6 characters long';
            }

            return errors;
          }}
          onSubmit={({ email, password }, { setTouched }) => {
            setTouched({ email: true, password: true }, true);
            mutateLogin({ email, password });
          }}>
          {({ handleSubmit, values, errors, handleChange, touched }) => (
            <form onSubmit={handleSubmit}>
              <h1 className="text-center size-h1 color-light_1">Login</h1>

              <Input
                type="email"
                onChange={handleChange}
                placeholder="E-mail"
                className="mt-4 size-m"
                error={touched.email && errors.email}
                name="email"
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

              <Button onClick={handleSubmit} className="mt-4 size-m weight-bold pv-2 full-width">
                LOGIN
              </Button>

              {loginError && (
                <p className="mt-1 color-error_1 size-xs text-center">Invalid e-mail or password</p>
              )}

              <p className="text-center mt-4 color-light_4">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="link">
                  Register
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
};
