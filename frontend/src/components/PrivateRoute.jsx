import React, {useState} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
    const {currentUser}=useSelector(state=>state.user)
  return (
    currentUser?<Outlet/>:<Navigate to="/auth/sign-up"/>
  )
}
