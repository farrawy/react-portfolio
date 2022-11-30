import React from "react";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a href="https://www.linkedin.com/in/ahmadalfarra/" target="_blank">
          <AiFillLinkedin />
        </a>
      </div>
      <div>
        <a href="https://github.com/farrawy" target="_blank">
          <AiFillGithub />
        </a>
      </div>
      <div>
        <a target="_blank" href="https://twitter.com/istashajr">
          <BsTwitter />
        </a>
      </div>
      {/* <div>
        <a href="https://facebook.com/"></a>
        <FaFacebookF />
      </div> */}
      <div>
        <a href="https://instagram.com/istashajr" target="_blank">
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
