import { useEffect } from 'react';
import './About.scss';
import { AboutVideo } from '../../Helper/Constants';

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aboutMain">
      <div className="firstDivabout">
        <video className="videoPlayAbout" autoPlay loop>
          <source src={AboutVideo} type="video/mp4" />
        </video>
      </div>
      <div className="container aboutLineCon">
        <div className="sidelineabout">History</div>
        <p className="mt-3 aboutcontent">
          Rolex’s story began when founder Hans Wilsdorf created the first waterproof wristwatch –
          the Oyster – and developed into a range of timepieces that have become icons of
          watchmaking. Discover Rolex watches on the wrists of pioneers, artists, athletes and
          visionaries and journey to the very highest summits and the deepest part of the
          oceans.msan.
        </p>
        <p className="aboutcontent">
          Rolex watches are designed and built to last thanks to the dedicated watchmakers,
          designers and engineers whose skills and knowledge are transferred into each and every
          Rolex timepiece. Rolex is proud to present the work of these outstanding specialists.
        </p>
        <p className="aboutcontent">
          Rolex has registered over 500 patents in the course of its history. Few companies have
          been so consistently identified with the pursuit of excellence, the quest for the
          absolute, the discovery of original approaches and innovative solutions.
        </p>
        <p className="aboutcontent">
          We call this perpetual spirit. It is based on a fundamental belief in unlimited human
          potential, in continuous improvement and lasting excellence, in always pushing the
          boundaries and taking the long-term view. Our watches are built to last. So is our
          contribution to future generations. Discover more about our corporate commitments on
          Rolex.org
        </p>

        <div className="sidelineabout mt-5">Our Vision</div>
        <p className="mt-3 aboutcontent">
          Clearly identify the corporate culture, values, strategy and view of the future by
          interviewing employees, suppliers and customers Address the commitment the firm has to its
          key stakeholders, including customers, employees, shareholders and communities Ensure that
          the objectives are measurable, the approach is actionable and the vision is achievable
          Communicate the message in clear, simple and precise language Develop buy-in and support
          throughout the organization
          <br />
          Guide management’s thinking on strategic issues, especially during times of significant
          change Help define performance standards Inspire employees to work more productively by
          providing focus and common goals Guide employee decision making Help establish a framework
          for ethical behavior
        </p>

        <div className="sidelineabout mt-5">Our Mision</div>
        <p className="mt-3 aboutcontent">
          Clearly identify the corporate culture, values, strategy and view of the future by
          interviewing employees, suppliers and customers Address the commitment the firm has to its
          key stakeholders, including customers, employees, shareholders and communities Ensure that
          the objectives are measurable, the approach is actionable and the vision is achievable
          Communicate the message in clear, simple and precise language Develop buy-in and support
          throughout the organization
          <br />
          Guide management’s thinking on strategic issues, especially during times of significant
          change Help define performance standards Inspire employees to work more productively by
          providing focus and common goals Guide employee decision making Help establish a framework
          for ethical behavior
        </p>

        <div className="sidelineabout mt-5">Our Benefits</div>
        <p className="mt-3 aboutcontent">
          Of course, you have a homepage and dedicated pages for your products, but summarizing your
          offerings on the About Us page is crucial to tie them in with brand values in your
          messaging. Highlight the benefits and showcase what you do (and why it is unique).
        </p>
      </div>
    </div>
  );
}
export default About;
