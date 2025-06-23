import React from 'react'
import {Link} from 'react-router-dom'
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";

export default function CounsellorCardItem() {
  return (
    <div className="flex flex-col items-center px-3 py-6 gap-4">
          <div className="flex-center p-1 shadow-xl">
            <img
              src="https://plus.unsplash.com/premium_photo-1747852228953-48b53593fa80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
              alt="mentor-image"
              className=" object-cover object-top"
            />
          </div>

          <div className="flex flex-col gap-[1px]">
            <p className="font-body font-semibold">John Doe</p>
            <p className="font-body font-semibold text-accent-secondary">Career Counsellor</p>
          </div>

          <p className="font-body">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

          <div className="flex gap-4">
              <Link to="#"><img src={facebook} alt="facebook-image" className="w-6 h-6 grayscale-100" /></Link>
              <Link to="#"><img src={twitter} alt="twitter-image" className="w-6 h-6 grayscale-100" /></Link>
          </div>
        </div>
  )
}
