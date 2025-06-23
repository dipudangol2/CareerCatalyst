import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";
import twitter from "../assets/twitter.svg";

export default function Footer() {
  return (
    <footer className=" border-t border-gray-500/20 ">
      <div className="px-xAxis-sm lg:px-xAxis-lg py-10 flex gap-10 flex-wrap justify-between items-center">
      <div className="flex-center">
        <img src={logo} alt="logo" className="w-auto md:w-[350px]" />
      </div>

      <div className="flex grow gap-10 justify-evenly flex-wrap">
        <ul className="flex flex-col gap-2">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/find-job">Find Job</Link>
          </li>
          <li className="nav-link">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="nav-link">
            <Link to="/about">About Us</Link>
          </li>
          <li className="nav-link">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li className="nav-link">
            <Link to="/">Resources</Link>
          </li>
          <li className="nav-link">
            <Link to="/find-job">Job</Link>
          </li>
          <li className="nav-link">
            <Link to="/resources">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/about">Services</Link>
          </li>
          <li className="nav-link">
            <Link to="/contact"> mentor</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/find-job">Find Job</Link>
          </li>
          <li className="nav-link">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="nav-link">
            <Link to="/about">About Us</Link>
          </li>
          <li className="nav-link">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      </div>

      <div className="flex border-t border-gray-400/30 justify-between items-center px-xAxis-sm lg:px-xAxis-lg py-6">
            <p>&copy; CareerCatalyst 2023</p>

      {/* social media  */}
            <div className="flex gap-8">
                <Link to="#"><img src={facebook} alt="facebook"  className="w-6 h-6 grayscale-100"/></Link>
                <Link to="#"><img src={google} alt="google"  className="w-6 h-6 grayscale-100"/></Link>
                <Link to="#"><img src={twitter} alt="twitter"  className="w-6 h-6 grayscale-100"/></Link>
            </div>
      </div>
    </footer>
  );
}
