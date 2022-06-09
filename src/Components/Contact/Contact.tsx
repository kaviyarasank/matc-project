import { useEffect } from "react";
import "./Contact.scss"

function Contact(){
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return(
        <div className="mainDivContact">
<div className="contactSecondDiv">
    
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
                            <input type="text" id="name" name="name" className="form-control mt-2"></input>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <label className="colorWhite">Your email</label>
                            <input type="text" id="email" name="email" className="form-control mt-2"></input>
                        </div>
                    </div>

                </div>

                <div className="row">

<div className="col-md-6">
    <div className="md-form mb-0">
        <label className="colorWhite mt-2">Contact Number</label>
        <input type="text" id="name" name="name" className="form-control mt-2"></input>
    </div>
</div>

<div className="col-md-6">
    <div className="md-form mb-0">
        <label className="colorWhite mt-2">Address</label>
        <input type="text" id="email" name="email" className="form-control mt-2"></input>
    </div>
</div>

</div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <label className="mt-2 colorWhite">Subject</label>
                            <input type="text" id="subject" name="subject" className="form-control mt-2"></input>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-12">

                        <div className="md-form">
                            <label className="mt-2 colorWhite">Your message</label>
                            <textarea  id="message" name="message" className="form-control md-textarea" mt-2></textarea>
                        </div>

                    </div>
                </div>

            </form>

            <div className="text-center text-md-left mt-3">
                <button className="btn btn-light red sendbtn">Send</button>
            </div>
            <div className="status"></div>
        </div>

        <div className="col-md-3 text-center mt-4">
            <ul className="list-unstyled mb-0">
                <li><i className="fas fa-map-marker-alt fa-2x colorWhite"></i>
                    <p className="colorWhite">Buttonwood, California.
Rosemead, CA 91770</p>
                </li>

                <li><i className="fas fa-phone mt-4 fa-2x colorWhite"></i>
                    <p className="colorWhite"> +1 253 565 2365</p>
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