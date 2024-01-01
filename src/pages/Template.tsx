import React from "react";
import Navbar from "../components/Navbar";

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <div className="bg-[#e5eef8] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center mt-[64px]">{children}</div>
    </div>
  );
};

export default Template;
