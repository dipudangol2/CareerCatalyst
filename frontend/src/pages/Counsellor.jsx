import React from "react";
import CounsellorCardItem from "../components/CounsellorCardItem";

export default function Counsellor() {
  return (
    <section className="section-css">
      <h3 className="font-nav max-w-[500px] mx-auto font-semibold">
        Meet our Career Counsellors
      </h3>
      <p className="font-body lg:max-w-[75%] mx-auto">
        Get to meet our team of career counsellors and support staff
      </p>

      {/* counsellor card wrapper  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-7">
        <CounsellorCardItem />
        <CounsellorCardItem />
        <CounsellorCardItem />
        <CounsellorCardItem />
        <CounsellorCardItem />
        <CounsellorCardItem />
        <CounsellorCardItem />
        <CounsellorCardItem />
      </div>
    </section>
  );
}
