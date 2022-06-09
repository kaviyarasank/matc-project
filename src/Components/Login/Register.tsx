import "./Login.scss";
import { Button, Form, Input } from 'reactstrap';
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rolex.jpg"



interface data {
    name:string,
    mobileNo:string,
    email:string,
    password:string
}

function Register() {
  let navigate = useNavigate();

 

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email('Invalid email format').required(),
    password: Yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ).required(),
    mobileNo:  Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
  });
const handleLogin=()=>{
    navigate("/")
}
const handleRegister=(data:data)=>{
    console.log("data00-->",data)
    localStorage.setItem("name", JSON.stringify(data));
    navigate("/")
}
  return (
    <div className="container" style={{marginTop:"8rem", marginBottom:"10rem"}}>
      <div className="row m-5 no-gutters shadow-lg">
        <div className="col-md-6 d-none d-md-block">
          <img src={logo} className="img-fluid logoreg" alt="" style={{ height: "700px" }} />
        </div>

        <div className="col-md-6 bg-white p-5">
          <h3 className="pb-3">Welcome Back !</h3>
          
            <div className="form-style">
            <h3>Please Sign Up now</h3>
            <Formik
      initialValues={{
        name: "",
        email: "",
        mobileNo:"",
        password:""
      }}
      validationSchema={schema}
      onSubmit={(data) => handleRegister(data)}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div  className="pb-3">
            <label>Name</label>
            <Input
              type="text"
              className="inputBox"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="errorMesg">{formik.touched.name && formik.errors.name}</p>
          </div>
          <div  className="pb-3">
            <label>MobileNo</label>
            <Input
              type="text"
              className="inputBox"
              name="mobileNo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="errorMesg">{formik.touched.mobileNo && formik.errors.mobileNo}</p>
          </div>
          <div  className="pb-3">
            <label>Email</label>
            <Input
              type="text"
              name="email"
              className="inputBox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="errorMesg">{formik.touched.email && formik.errors.email}</p>
          </div>
          <div  className="pb-3">
            <label>Password</label>
            <Input
              type="password"
              name="password"
              className="inputBox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="errorMesg">{formik.touched.password && formik.errors.password}</p>
          </div>
          <div className="pb-2">
                <Button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">Submit</Button>
              </div>
        </form>
      )}
    </Formik>
            <div className="pt-4 text-center">
              You Already Have Account, Please ! <Button className="border-0 bg-light signup-text" onClick={handleLogin}>Login In</Button>
            </div>
          </div>
        </div>
      

      </div>
    </div>
  );
}

export default Register;
