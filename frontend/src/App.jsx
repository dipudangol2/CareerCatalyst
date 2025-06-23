import React, { useState, useEffect } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FindJob from "./pages/FIndJob";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";

export default function App() {
  const {currentUser} =useSelector(state=>state.user)
  return (
    <BrowserRouter>
      {currentUser && <Navbar />}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/find-job' element={<FindJob/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Route>
        <Route path="/auth/sign-up" element={currentUser ?<Navigate to="/" replace/>: <SignUp />} />
        <Route path="/auth/sign-in" element={currentUser ? <Navigate to="/" replace/> : <SignIn />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="light"
        transition={Bounce}
      />
      {currentUser && <Footer />}
    </BrowserRouter>
  );
}
