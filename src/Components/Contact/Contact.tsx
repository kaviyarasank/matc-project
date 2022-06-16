import { useEffect, useState } from "react";
import "./Contact.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Contact(){
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const[value, setValue] = useState({
        name:"",
        email:"",
        mobileNo:"",
        Address:"",
        subject:"",
        message:""
    })
    const handleChange=(e:any)=>{
        setValue({...value,[e.target.name]:e.target.value})
    }
    const notify = () => toast.success('Message Send Successfully', {
        className: 'toast-success'
      });
      const notifyFail = () => toast.error('All Field Should Be Mandatory', {
        className: 'toast-error'
      });
    const handleButton=()=>{
if(value.name !== "" && value.email !=="" && value.Address !== "" && value.message !== "" && value.mobileNo !== "" && value.subject !== ""){
    notify();
    setValue({
        name:"",
        email:"",
        mobileNo:"",
        Address:"",
        subject:"",
        message:""
    })
}else{
    notifyFail();
}
    }
    return(
        <div className="mainDivContact">
<div className="contactSecondDiv">
<ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className={"toastMargin"}
          />
<section className="mb-4 formsections container px-5 py-4">

    <h2 className="h1-responsive font-weight-bold text-center colorWhite">Contact us</h2>
    <p className="text-center w-responsive mx-auto mt-5 colorWhite">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

    <div className="row mt-5">
        <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form">
                <div className="row">

                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <label className="colorWhite">Your name</label>
                            <input type="text" id="name" name="name" value={value.name} className="form-control mt-2" onChange={handleChange}></input>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <label className="colorWhite">Your email</label>
                            <input type="text" id="email" name="email" value={value.email} className="form-control mt-2" onChange={handleChange}></input>
                        </div>
                    </div>

                </div>

                <div className="row">

<div className="col-md-6">
    <div className="md-form mb-0">
        <label className="colorWhite mt-2">Contact Number</label>
        <input type="text" id="name" name="mobileNo" value={value.mobileNo} className="form-control mt-2" onChange={handleChange}></input>
    </div>
</div>

<div className="col-md-6">
    <div className="md-form mb-0">
        <label className="colorWhite mt-2">Address</label>
        <input type="text" id="email" name="Address" value={value.Address} className="form-control mt-2" onChange={handleChange}></input>
    </div>
</div>

</div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <label className="mt-2 colorWhite">Subject</label>
                            <input type="text" id="subject" name="subject" value={value.subject} className="form-control mt-2" onChange={handleChange}></input>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-12">

                        <div className="md-form">
                            <label className="mt-2 colorWhite">Your message</label>
                            <textarea  id="message" name="message" value={value.message} className="form-control md-textarea" onChange={handleChange} mt-2></textarea>
                        </div>

                    </div>
                </div>

            </form>

            <div className="text-center text-md-left mt-3">
                <button className="btn btn-light red sendbtn" onClick={handleButton}>Send</button>
            </div>
            <div className="status"></div>
        </div>

        <div className="col-md-3 text-center mt-4 contactAddress">
            <ul className="list-unstyled mb-0">
                <li><i className="fas fa-map-marker-alt fa-2x colorWhite"></i>
                    <p className="colorWhite">Bloom Plaza, Thillainagar.
Trichy, 620018</p>
                </li>

                <li><i className="fas fa-phone mt-4 fa-2x colorWhite"></i>
                    <p className="colorWhite"> +91 6383285582</p>
                </li>

                <li><i className="fas fa-envelope mt-4 fa-2x colorWhite"></i>
                    <p className="colorWhite">support@watch.com</p>
                </li>
            </ul>
        </div>

    </div>

</section>
</div>
        </div>
    )
}
export default Contact;