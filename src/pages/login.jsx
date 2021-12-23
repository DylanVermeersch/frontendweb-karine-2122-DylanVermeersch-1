import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router';
import LabelInput from '../components/LabelInput';
import { useLogin, useSession } from '../contexts/AuthProvider';

const validationRules = {
  email: {
    required: true
  },
  password: {
    required: true
  }
};

export default function Login() {
  const history = useHistory();
  const { loading, error, isAuthed } = useSession();
  const login = useLogin();
  const methods = useForm();
  const {
    handleSubmit,
    reset,
  } = methods;

  const handleLogin = useCallback(async ({ email, password }) => {
    const success = await login(email, password);

    if (success) {
      history.replace('/');
    }
  }, [history, login]);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  if (isAuthed) {
    return <Redirect from="/login" to="/" />
  }

  const isLoadingClass = (loading) => {
    return loading ? 'disabled-' : '';
  };

  return (
    <FormProvider {...methods}>
        <div className="login-container">
            <h1>Sign in</h1>
            <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
            {
                error ? (
                <p className="login-error-text">
                    {error}
                </p>
                ) : null
            }
            <LabelInput
                label="email"
                type="text"
                defaultValue=""
                data-cy="email_input"
                placeholder="your@email.com"
                validation={validationRules.email} />

            <LabelInput
                label="password"
                type="password"
                defaultValue=""
                data-cy="password_input"
                validation={validationRules.password} />

            <div className="login-form-bottom">
                <button
                data-cy="submit_btn"
                type="submit"
                disabled={loading}
                className= {`${isLoadingClass}loginbtn`}>
                Sign in
                </button>

                <button type="button" onClick={handleCancel}>
                Cancel
                </button>
            </div>
            </form>
        </div>
    </FormProvider>)};