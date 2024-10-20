import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../auth.api';
import { setCredentials } from '../auth.slice';
import { loginValidation } from '../auth.validation.js';

const loginSchema = [
  { label: 'Email Address', name: 'email', type: 'email' },
  { label: 'Enter Password', name: 'password', type: 'password' },
];
const loginFormik = {
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: loginValidation,
};

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = authApi.useLoginMutation();

  const handleLogin = async (values) => {
    try {
      const res = await login(values).unwrap();
      console.log(res)
      dispatch(
        setCredentials({
          userInfo: res.user,
          token: res.token,
        })
      );
      navigate('/dashboard');
      toast.success('Logged in successfully');
    } catch (e) {
      toast.error(e?.data?.message || e.error);
    }
  };
  return (
    <FormikForm
      formikProps={{ ...loginFormik, onSubmit: handleLogin }}
      formSchema={loginSchema}
      element={({ isSubmitting }) => {
        return (
          <>
            <Button
              variant="outline"
              color="primary"
              disabled={isSubmitting || isLoading}
              type="submit"
            >
              Log In
            </Button>

            <div className="divider my-0">or</div>
            <div className="social-media login flex gap-2 justify-center">
              <Button onClick={() => { }}>
                <FaGoogle />
              </Button>
              <Button onClick={() => { }}>
                <FaFacebook />
              </Button>
            </div>
            <div className="flex justify-center gap-2">
              Doesn&apos;t have an account?
              <Link
                to="/signup"
                className="link link-secondary"
              >
                Sign Up
              </Link>
            </div>
          </>
        );
      }}
    />
  );
}
export default LoginForm;
