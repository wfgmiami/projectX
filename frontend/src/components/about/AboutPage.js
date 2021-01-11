import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => (
  <div>
    <h2>About</h2>
    <p>
      Provide tools to help ordinary people manage investments and accumulate
      wealth
    </p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn More
    </Link>
  </div>
);

export default AboutPage;
