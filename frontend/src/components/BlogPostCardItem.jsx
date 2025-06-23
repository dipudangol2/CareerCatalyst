import React from "react";
import { Link } from "react-router-dom";

export default function BlogPostCardItem({ title, description, imgSrc }) {
  return (
    <div className="flex md:flex-1/2 lg:flex-1/3 flex-col text-start px-3 py-6 gap-5 ">
      <div className="relative p-1 shadow-xl w-full">
        <img
          src={imgSrc}
          alt="blog-image"
          className="w-full h-auto object-cover"
        />
      </div>

      <h6 className="font-body font-medium text-start">
        {title?.length > 50 ? `${title.slice(0, 50)}...` : title}
      </h6>
      <p className="text-start text-textColor-secondary">
        {description?.length > 100
          ? `${description.slice(0, 100)}...`
          : description}
      </p>

      <Link className="text-start flex justify-between items-center text font-medium text-textColor-secondary transition-default hover:text-textColor-primary">
        <span>Read more &gt;</span>
        <span>5 min read</span>
      </Link>
    </div>
  );
}
