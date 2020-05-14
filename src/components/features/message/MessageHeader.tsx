import React from "react";
import { useHistory } from "react-router-dom";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import IconButton from "@material-ui/core/IconButton";

import "./MessageHeader.scss";

const MessageHeader = () => {
  const history = useHistory();
  const handleBack = () => {
    history.push("/inbox");
  };

  return (
    <div className="message-header-wrapper">
      {" "}
      <IconButton aria-label="back" onClick={handleBack}>
        <ArrowBackOutlinedIcon className="back-icon" color="action" />
      </IconButton>
    </div>
  );
};

export default MessageHeader;
