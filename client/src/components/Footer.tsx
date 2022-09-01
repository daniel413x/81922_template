import React from 'react';
import {
  faLocationDot, faHashtag, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF, faTwitter, faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer id="footer">
      <div className="info">
        <div className="contact box">
          <span className="label">
            Telephone &amp; Email
          </span>
          <br />
          <FontAwesomeIcon icon={faEnvelope} />
          {' '}
          hello@genericapp.com
          <br />
          <FontAwesomeIcon icon={faHashtag} />
          {' '}
          (703) 313-5388
          <br />
        </div>
        <div className="address box">
          <span className="label">
            Address
          </span>
          <br />
          <FontAwesomeIcon icon={faLocationDot} />
          {' '}
          4810 Wisconsin Ave NW, Washington, DC 20016
        </div>
        <div className="social-media box">
          <span className="label">
            Social media
          </span>
          <ul>
            <li>
              <a href="social-media">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a href="social-media">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="social-media">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* if you add any other columns to the footer then you will need to add flex-direction: column to the mobile breakpoint */}
      <div className="copyright text-center">
        Copyright &copy; 2022, Genericapp, All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
