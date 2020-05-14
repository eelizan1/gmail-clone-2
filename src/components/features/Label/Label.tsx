import React from "react";
import "./Label.scss";

interface ILabelProps {
  category: string;
}

const Label: React.FC<ILabelProps> = ({ category }) => {
  return <span className="message-label">{category}</span>;
};

export default Label;
