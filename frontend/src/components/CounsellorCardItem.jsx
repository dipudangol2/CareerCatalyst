import React from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";

export default function CounsellorCardItem({name, position, description, image}) {
  
  return (
    <div className="relative flex flex-col items-center px-3 py-6 gap-4">
      <div className="w-full relative flex-center p-1 shadow-xl">
        <img
          src={image}
          alt="mentor-image"
          className="max-h-[350px] w-full object-cover object-[center_20%]"
        />
      </div>

      <div className="flex flex-col gap-[1px]">
        <p className="font-body font-semibold">{name}</p>
        <p className="font-body font-semibold text-accent-secondary">
          {position}
        </p>
      </div>

      <p className="font-body">
       {description}
      </p>

      <div className="flex gap-4">
        <Link to="#">
          <img
            src={facebook}
            alt="facebook-image"
            className="w-6 h-6 grayscale-100"
          />
        </Link>
        <Link to="#">
          <img
            src={twitter}
            alt="twitter-image"
            className="w-6 h-6 grayscale-100"
          />
        </Link>
      </div>
    </div>
  );
}
