import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {useDispatch, useSelector } from 'react-redux'
import {signInSuccess} from '../redux/userSlice'
import background from "../assets/signPageBg.svg";
import logo from "../assets/logo.svg";
import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";
import twitter from "../assets/twitter.svg";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [formData, setFormData] = useState({
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
      if(formData.email.trim() === "" || formData.password.trim() === "" ) {
        toast.error("All fields are required");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          body: JSON.stringify(formData),
          method: "POST",
          headers: { "Content-Type": "application/json"},
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("Logged in successfully");
          dispatch(signInSuccess(data));
          navigate("/");
        }else{
          toast.error(data.message);
        }
        console.log(data.user)
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
          <h5 className="font-heading">Sign In</h5>

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
          <button type="submit" className="btn-primary" onClick={(e)=>handleFormSubmit(e)}>
            Sign In
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
            Don't have an account?{" "}
            <Link
              to="/auth/sign-up"
              className="text-[var(--color-accent-primary)]"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
