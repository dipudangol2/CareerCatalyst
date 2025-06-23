import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import background from "../assets/signPageBg.svg";
import logo from "../assets/logo.svg";
import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";
import twitter from "../assets/twitter.svg";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // form validation 
    if(formData.fullName.trim() === "" || formData.email.trim() === "" || formData.password.trim() === "" ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        body: JSON.stringify(formData),
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully");
        navigate("/auth/sign-in");
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
   
  };

  return (
    <section className="h-full w-full flex-center px-4">
      {/* background image  */}
      <div className="h-full w-full absolute inset-0 z-0">
        <img
          src={background}
          alt="bg-image"
          className="object-cover h-full w-full object-center"
        />
      </div>

      {/* form wrapper  */}
      <div className="relative max-w-[700px] px-7 sm:px-15 py-10 backdrop-blur-2xl bg-white/50 rounded-2xl z-100 pop-in">
        {/* logo wrapper */}
        <div className="flex-center">
          <img
            src={logo}
            alt="logo"
            className="w-[150px] h-auto object-cover"
          />
        </div>

        {/* form wrapper  */}
        <form className="mt-10 text-center flex flex-col gap-5">
          <h5 className="font-heading">Sign Up</h5>

          <div className="form-item">
            <label htmlFor="fullName">Full name</label>
            <input
              value={formData.fullName}
              onChange={(e) => handleChange(e)}
              type="text"
              name="fullName"
              id="fullName"
              placeholder="full name"
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              value={formData.email}
              onChange={(e) => handleChange(e)}
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              value={formData.password}
              onChange={(e) => handleChange(e)}
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            onClick={(e) => handleFormSubmit(e)}
          >
            Sign Up
          </button>
        </form>

        {/* rest content  */}
        <div className="flex flex-col gap-5 mt-5 font-body text-center">
          <p className="text-xs text-gray-500">or sign in with </p>

          {/* social media login  */}
          <div className="flex gap-3 justify-center">
            <button className="flex-center bg-white px-3 py-2 rounded-xl">
              <img
                src={facebook}
                alt="media-icon"
                className="h-3 w-3 object-cover"
              />
            </button>
            <button className="flex-center bg-white px-3 py-2 rounded-xl">
              <img
                src={google}
                alt="media-icon"
                className="h-3 w-3 object-cover"
              />
            </button>
            <button className="flex-center bg-white px-3 py-2 rounded-xl">
              <img
                src={twitter}
                alt="media-icon"
                className="h-3 w-3 object-cover"
              />
            </button>
          </div>

          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/auth/sign-in" className="text-[var(--color-accent-primary)]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
