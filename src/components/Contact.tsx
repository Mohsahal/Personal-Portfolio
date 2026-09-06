import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:mohammedsahal1243@gmail.com"
                data-cursor="disable"
              >
                mohammedsahal1243@gmail.com
              </a>
            </p>
            <p>
              <a
                href="tel:+917306093151"
                data-cursor="disable"
              >
                +91 7306093151
              </a>
            </p>
            <p style={{ color: "var(--accentColor)", fontSize: "14px", marginTop: "5px" }}>
              Kerala, Kannur, India
            </p>
            <h4>Education</h4>
            <p>
              B.E – Information Science, Yenepoya Institute of Technology (VTU) — 2022–2026
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/mohsahal"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammedsahalpk/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="mailto:mohammedsahal1243@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
            <a
              href="/Mohammed_Sahal_PK.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Resume PDF <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Mohammed Sahal PK</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
