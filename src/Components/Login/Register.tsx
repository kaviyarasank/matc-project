import "./Login.scss";
import { Button, Form, Input } from 'reactstrap';
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rolex.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorageValues } from "../../Helper/localStore";



interface data {
    name:string,
    mobileNo:string,
    email:string,
    password:string
}

interface datas {
  email:string,
  password:string
}
function Register() {
  let navigate = useNavigate();

 const[login, setLogin] = useState(true);

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
   setLogin(true);
}
const handleRegister=(data:data)=>{
    console.log("data00-->",data)
    setLogin(true);
    localStorage.setItem("name", JSON.stringify(data));
}


const[error, setError] = useState("");

const handleSignUp=()=>{
setLogin(false);
}
const notify = () => toast.error('InValid User', {
  className: 'toast-error'
});;

let acessLocalStorageValues = getLocalStorageValues();
 let formEmail = acessLocalStorageValues?.email;
 let fromPass = acessLocalStorageValues?.password

const handleSubmit=(data:datas)=>{
console.log("")
if(data.email === formEmail && data.password === fromPass){
navigate("/");
setError("");
window.location.reload();
}else{
notify()
setError("InValid User");
}
}
const schemaLogin = Yup.object().shape({
email:Yup.string().required(),
password: Yup.string().required()
});

  return (

    <div className="container" style={{marginTop:"8rem", marginBottom:"10rem"}}>
      {login === false ?
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
      :(
         
      <div className="row m-5 no-gutters shadow-lg">
      <div className="col-md-6 d-none d-md-block">
        <img src={"https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=742&q=80"} className="img-fluid logoreg" alt="" style={{ minHeight: "100%" }} />
      </div>

      <div className="col-md-6 bg-white p-5">
        <h3 className="pb-3">Welcome Back !</h3>
        <div className="form-style">
          <h3>Please Sign in now</h3>
         {error && <div>
            <ToastContainer className="toastMargin"/>
          </div>}
           <Formik
    initialValues={{
      email: "",
      password:""
    }}
    validationSchema={schemaLogin}
    onSubmit={(data) => handleSubmit(data)}
  >
    {(formik) => (
      <form onSubmit={formik.handleSubmit}>
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
          <div className="sideline">OR</div>
          <div>
            <Button type="submit"   color="primary" className="btn w-100 font-weight-bold mt-2">Login With Facebook</Button>
          </div>
          <div className="pt-4 text-center">
            You Not Have a Account, Please ! <Button className="border-0 bg-light signup-text" onClick={handleSignUp}>Sign Up</Button>
          </div>
        </div>
     
      </div>
    </div>
      )
      }
    </div>

    
  );
}

export default Register;
