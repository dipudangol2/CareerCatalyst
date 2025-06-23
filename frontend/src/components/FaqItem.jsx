import React, {useState} from "react";

export default function FaqItem({title, description}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="faq-button" onClick={() => setIsOpen(!isOpen)}>
        <p>{title}</p>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {/* hidden part  */}
      <div className={isOpen ? "faq-hidden active " : "faq-hidden"}>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
}
