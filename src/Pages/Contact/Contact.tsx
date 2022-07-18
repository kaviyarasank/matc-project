import { useEffect, useState } from 'react';
import './Contact.scss';
import { toast } from 'react-toastify';
import { checkAuth } from '../../Helper/CheckAuth';
import { ContactVideo } from '../../Helper/Constants';

function Contact() {
  const [value, setValue] = useState({
    name: '',
    email: '',
    mobileNo: '',
    Address: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState<any>('');
  useEffect(() => {
    window.scrollTo(0, 0);
    checkAuth();
  }, []);
  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };
  const notify = () =>
    toast.success('Message Send Successfully', {
      className: 'toast-success'
    });

  const handleButton = () => {
    var errorobject = { name: '', email: '', Address: '', message: '', mobileNo: '', subject: '' };
    let emailPattern = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    let numberPattern = /^[0-9]{10}$/;
    if (!value.name) {
      errorobject.name = 'Name is required';
    } else {
      setError({ ...error, name: '' });
    }

    if (!value.email) {
      errorobject.email = 'Email is required ';
    } else if (!emailPattern.test(value.email)) {
      errorobject.email = 'Email is InValid format ';
    } else {
      setError({ ...error, email: '' });
    }

    if (!value.Address) {
      errorobject.Address = 'Address is required ';
    } else {
      setError({ ...error, Address: '' });
    }

    if (!value.message) {
      errorobject.message = 'message is required ';
    } else {
      setError({ ...error, message: '' });
    }

    if (!value.mobileNo) {
      errorobject.mobileNo = 'mobileNo is required ';
    } else if (!numberPattern.test(value.mobileNo)) {
      errorobject.mobileNo = 'mobileNo Accept Only 10 Degit';
    } else {
      setError({ ...error, mobileNo: '' });
    }

    if (!value.subject) {
      errorobject.subject = 'subject is required ';
    } else {
      setError({ ...error, subject: '' });
    }

    if (
      value.name !== '' &&
      value.email !== '' &&
      value.Address !== '' &&
      value.message !== '' &&
      value.mobileNo !== '' &&
      value.subject !== ''
    ) {
      notify();
      setValue({
        name: '',
        email: '',
        mobileNo: '',
        Address: '',
        subject: '',
        message: ''
      });
      return true;
    } else {
      setError(errorobject);
      return false;
    }
  };
  return (
    <div className="mainDivContact">
      <div className="contactSecondDiv">
        <video className="videoPlayContact" autoPlay loop>
          <source src={ContactVideo} type="video/mp4" />
        </video>
        <div className="mainInput">
          <section className="mb-4 formsections container px-5 py-4">
            <h2 className="h1-responsive font-weight-bold text-center colorWhite">Contact us</h2>
            <p className="text-center w-responsive mx-auto mt-5 colorWhite">
              Do you have any questions? Please do not hesitate to contact us directly. Our team
              will come back to you within a matter of hours to help you.
            </p>

            <div className="row mt-5">
              <div className="col-md-9 mb-md-0 mb-5">
                <form id="contact-form" name="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label className="colorWhite">Your name</label>
                        <input
                          type="text"
                          data-testid="con-name"
                          id="name"
                          name="name"
                          value={value.name}
                          className="form-control mt-2"
                          onChange={handleChange}></input>
                      </div>
                      {error && error?.name && (
                        <small className="mb-3 text-normal errorTextColor">{error.name}</small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label className="colorWhite">Your email</label>
                        <input
                          type="email"
                          data-testid="con-email"
                          id="email"
                          name="email"
                          value={value.email}
                          className="form-control mt-2"
                          onChange={handleChange}></input>
                      </div>
                      {error && error?.email && (
                        <small className="mb-3 text-normal errorTextColor">{error.email}</small>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label className="colorWhite mt-2">Contact Number</label>
                        <input
                          type="number"
                          data-testid="con-mobileNo"
                          id="name"
                          name="mobileNo"
                          value={value.mobileNo}
                          className="form-control mt-2"
                          onChange={handleChange}></input>
                      </div>
                      {error && error?.mobileNo && (
                        <small className="mb-3 text-normal errorTextColor">{error.mobileNo}</small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label className="colorWhite mt-2">Address</label>
                        <input
                          type="text"
                          data-testid="con-Address"
                          id="email"
                          name="Address"
                          value={value.Address}
                          className="form-control mt-2"
                          onChange={handleChange}></input>
                      </div>
                      {error && error?.Address && (
                        <small className="mb-3 text-normal errorTextColor">{error.Address}</small>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label className="mt-2 colorWhite">Subject</label>
                        <input
                          type="text"
                          data-testid="con-subject"
                          id="subject"
                          name="subject"
                          value={value.subject}
                          className="form-control mt-2"
                          onChange={handleChange}></input>
                      </div>
                      {error && error?.subject && (
                        <small className="mb-3 text-normal errorTextColor">{error.subject}</small>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="md-form">
                        <label className="mt-2 colorWhite">Your message</label>
                        <textarea
                          data-testid="con-message"
                          id="message"
                          name="message"
                          value={value.message}
                          className="form-control md-textarea"
                          onChange={handleChange}></textarea>
                      </div>
                      {error && error?.message && (
                        <small className="mb-3 text-normal errorTextColor">{error.message}</small>
                      )}
                    </div>
                  </div>
                </form>

                <div className="text-center text-md-left mt-3">
                  <button
                    className="btn btn-light red sendbtn choicesbutton"
                    data-testid="con-button"
                    onClick={handleButton}>
                    Send
                  </button>
                </div>
                <div className="status"></div>
              </div>

              <div className="col-md-3 text-center mt-4 contactAddress">
                <ul className="list-unstyled mb-0">
                  <li>
                    <i className="fas fa-map-marker-alt fa-2x colorWhite"></i>
                    <p className="colorWhite">Bloom Plaza, Thillainagar. Trichy, 620018</p>
                  </li>

                  <li>
                    <i className="fas fa-phone mt-4 fa-2x colorWhite"></i>
                    <p className="colorWhite"> +91 6383285582</p>
                  </li>

                  <li>
                    <i className="fas fa-envelope mt-4 fa-2x colorWhite"></i>
                    <p className="colorWhite">support@watch.com</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Contact;
