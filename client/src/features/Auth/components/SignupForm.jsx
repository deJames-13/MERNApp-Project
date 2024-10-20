import { FormikForm } from '@common/components';
import { Button } from 'react-daisyui';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../auth.api';
import { setCredentials } from '../auth.slice';
import { signupValidation } from '../auth.validation.js';

const signupSchema = [
  { label: 'Username', name: 'username', type: 'text' },
  { label: 'Email Address', name: 'email', type: 'email' },
  { label: 'Enter Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'confirm_password', type: 'password' },
];
const signupFormik = {
  initialValues: signupSchema.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {}),
  validationSchema: signupValidation,
};
function SignupFrom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = authApi.useRegisterMutation();

  const handleSignup = async (values) => {
    try {
      const res = await register(values).unwrap();
      dispatch(
        setCredentials({
          userInfo: res.user,
          token: res.token,
        })
      );
      navigate('/dashboard');
      toast.success('Signup successfully');
    } catch (e) {
      toast.error(e?.data?.message || e.error);
    }
  };
  return (
    <FormikForm
      formikProps={{ ...signupFormik, onSubmit: handleSignup }}
      formSchema={signupSchema}
      element={({ isSubmitting, ...rest }) => {
        return (
          <>
            <Button
              variant="outline"
              color="primary"
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              Sign Up
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
              Alread have an account?
              <Link
                to="/login"
                className="link link-secondary"
              >
                Login
              </Link>
            </div>
          </>
        );
      }}
    />
  );
}

export default SignupFrom;
