import './Login.scss';
import { Button, Input } from 'reactstrap';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorageValues } from '../../Helper/localStore';
import { AppDispatch } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../Redux/login';
import Clock from './Login';
import Analog from './Analog';

interface registerInter {
  name: string;
  mobileNo: string;
  email: string;
  password: string;
}

interface loginInter {
  email: string;
  password: string;
}
function Register() {
  const dispatch = useDispatch<AppDispatch>();

  let navigate = useNavigate();

  const [login, setLogin] = useState(true);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
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
    mobileNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required()
  });
  const handleLogin = () => {
    setLogin(true);
  };
  const handleRegister = (data: registerInter) => {
    console.log('data00-->', data);
    setLogin(true);
    localStorage.setItem('name', JSON.stringify(data));
  };

  const [error, setError] = useState('');

  const handleSignUp = () => {
    setLogin(false);
  };
  const notify = () =>
    toast.error('InValid User', {
      className: 'toast-error'
    });

  const notifyLog = () =>
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
      notifyLog();
    } else {
      notify();
      setError('InValid User');
    }
  };
  const schemaLogin = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required()
  });

  return (
    <div className="container" style={{ marginTop: '8rem', marginBottom: '10rem' }}>
      {login === false ? (
        <div className="row no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <Analog />
          </div>

          <div className="col-md-6 bg-white xs-mx-2 md:mx-10 lg:mx-52">
            <h3 className="pb-3 welcome mt-5">Welcome Back !</h3>

            <div className="form-style">
              <h3 className="welcome">Please Sign Up now</h3>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  mobileNo: '',
                  password: ''
                }}
                validationSchema={schema}
                onSubmit={(data) => handleRegister(data)}>
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="pb-3">
                      <label className="loginLabel">Name</label>
                      <Input
                        type="text"
                        className="inputBox"
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
                        className="inputBox"
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
                        className="inputBox"
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
                        className="inputBox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="errorMesg">
                        {formik.touched.password && formik.errors.password}
                      </p>
                    </div>
                    <div className="pb-2">
                      <Button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">
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
        <div className="row no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block loginClocknone">
            <Clock />
          </div>

          <div className="col-md-6 bg-white xs-mx-2 md:mx-10 lg:mx-52">
            <h3 className="pb-3 welcome mt-5">Welcome Back !</h3>
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
                        className="inputBox"
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
                        className="inputBox"
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
                        className="btn btn-dark w-100 font-weight-bold mt-2"
                        data-testid="submit-button">
                        Submit
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
              <div className="sideline">OR</div>
              <div>
                <Button
                  type="submit"
                  color="primary"
                  className="btn w-100 font-weight-bold mt-2"
                  href="https://www.facebook.com/login/">
                  Login With Facebook
                </Button>
              </div>
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
