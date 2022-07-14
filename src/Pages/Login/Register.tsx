import './Login.scss';
import { Button, Input } from 'reactstrap';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../Redux/login';
import Clock from './Login';
import { getLocalStorageValues } from '../../Helper/localStore';

interface registerInter {
  name: string;
  mobileNo: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface loginInter {
  email: string;
  password: string;
}

function Register() {
  const dispatch = useDispatch<AppDispatch>();

  let navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [sameError, setSameError] = useState('');

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email('Invalid email format').required(),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      )
      .required(),
    mobileNo: Yup.string().required().min(10).max(10),
    confirmPassword: Yup.string().required()
  });
  const handleLogin = () => {
    setLogin(true);
  };

  const handleRegister = (data: registerInter) => {
    if (data.password === data.confirmPassword) {
      localStorage.setItem('name', JSON.stringify(data));
      setLogin(true);
    } else {
      setSameError('Password and ConfirmPassword DoesNot Matched');
    }
  };

  const [error, setError] = useState('');

  const handleSignUp = () => {
    setLogin(false);
  };
  const invalidErrorToast = () =>
    toast.error('InValid User', {
      className: 'toast-error'
    });

  const loginToast = () =>
    toast.success('Login Successfully', {
      className: 'toast-success'
    });

  let acessLocalStorageValues = getLocalStorageValues();
  let formEmail = acessLocalStorageValues?.email;
  let fromPass = acessLocalStorageValues?.password;

  const handleSubmit = (data: loginInter) => {
    console.log('');
    if (data.email === formEmail && data.password === fromPass) {
      navigate('/');
      setError('');
      dispatch(postLogin(data));
      loginToast();
    } else {
      invalidErrorToast();
      setError('InValid User');
    }
  };
  const schemaLogin = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required()
  });

  return (
    <div className="container registerMainCon" style={{ marginTop: '5rem', marginBottom: '1rem' }}>
      {login === false ? (
        <div className="row divShadow">
          <div className="col-md-6 d-none d-md-block loginClocknone">
            <Clock />
          </div>

          <div className="col-md-6 bg-white xs-mx-2 md:mx-10 lg:mx-52 loginDivPadd">
            <div className="form-style">
              <h3 className="welcome">Please Sign Up now</h3>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  mobileNo: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={schema}
                onSubmit={(data) => handleRegister(data)}>
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="pb-3">
                      <label className="loginLabel">Name</label>
                      <Input
                        type="text"
                        className="inputBox mt-2"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="errorMesg">{formik.touched.name && formik.errors.name}</p>
                    </div>
                    <div className="pb-3">
                      <label className="loginLabel">MobileNo</label>
                      <Input
                        type="text"
                        className="inputBox mt-2"
                        name="mobileNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="errorMesg">
                        {formik.touched.mobileNo && formik.errors.mobileNo}
                      </p>
                    </div>
                    <div className="pb-3">
                      <label className="loginLabel">Email</label>
                      <Input
                        type="text"
                        name="email"
                        className="inputBox mt-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="errorMesg">{formik.touched.email && formik.errors.email}</p>
                    </div>
                    <div className="pb-3">
                      <label className="loginLabel">Password</label>
                      <Input
                        type="password"
                        name="password"
                        className="inputBox mt-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="errorMesg">
                        {formik.touched.password && formik.errors.password}
                      </p>
                    </div>
                    <div className="pb-3">
                      <label className="loginLabel">Confirm Password</label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        className="inputBox mt-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="errorMesg">
                        {(formik.touched.confirmPassword && formik.errors.confirmPassword) ||
                          sameError}
                      </p>
                    </div>
                    <div className="pb-2">
                      <Button
                        type="submit"
                        className="btn btn-dark loginSubBtn font-weight-bold mt-2">
                        Submit
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
              <div className="pt-4 text-center">
                You Already Have Account, Please !{' '}
                <Button className="border-0 bg-light signup-text" onClick={handleLogin}>
                  Login In
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row divShadow">
          <div className="col-md-6 d-none d-md-block loginClocknone">
            <Clock />
          </div>

          <div className="col-md-6 bg-white xs-mx-2 md:mx-10 lg:mx-52 loginDivPadd">
            <h3 className="pb-3 welcome">Welcome Back !</h3>
            <div className="form-style">
              <h3 className="welcome">Please Sign in now</h3>
              {error && (
                <div>
                  <ToastContainer className="toastMargin" />
                </div>
              )}
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={schemaLogin}
                onSubmit={(data) => handleSubmit(data)}>
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="pb-3 mt-3">
                      <label className="loginLabel">Email</label>
                      <Input
                        type="text"
                        name="email"
                        className="inputBox mt-3"
                        data-testid="email-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="errorMesg">{formik.touched.email && formik.errors.email}</p>
                    </div>
                    <div className="pb-3">
                      <label className="loginLabel">Password</label>
                      <Input
                        type="password"
                        name="password"
                        data-testid="email-Password"
                        className="inputBox mt-3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="errorMesg">
                        {formik.touched.password && formik.errors.password}
                      </p>
                    </div>
                    <div className="pb-2">
                      <Button
                        type="submit"
                        className="btn btn-dark font-weight-bold mt-2 loginSubBtn"
                        data-testid="submit-button">
                        Submit
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
              <div className="pt-4 text-center">
                You Not Have a Account, Please !{' '}
                <Button className="border-0 bg-light signup-text" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
