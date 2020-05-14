import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getEmailById,
  getLabelsById,
  stripHtml,
} from "../../helpers/MessageHelper";
import { formatDate } from "../../helpers/DateFormater";
import { IEmailModel } from "../../../interfaces/interface";
import profileImage from "../../../assets/img.jpg";

import "./Message.scss";
import MessageHeader from "./MessageHeader";
import Label from "../Label/Label";
import { useSelector } from "react-redux";

const Message: React.FC = () => {
  const inboxItems: IEmailModel[] = useSelector(
    (state: any) => state.inboxListReducer.initialListState
  );
  const { id } = useParams();
  const [message, setMessage] = useState<IEmailModel>();
  const [tags, setTags] = useState<string[] | undefined>();

  // get information from url param id
  useEffect(() => {
    setMessage(getEmailById(inboxItems, id));
    setTags(getLabelsById(inboxItems, id));
  }, [id, inboxItems]);

  return (
    <>
      <MessageHeader />
      <div className="message-wrapper">
        <div className="message-header">
          <label>{message?.subject}</label>
        </div>
        <div className="message-body">
          <div className="body-header">
            <img className="image" src={profileImage} alt="profile" />
            <label className="message-sender">{message?.sender}</label>
            <div className="message-tags">
              {tags &&
                tags.map((tag, index) => {
                  return <Label category={tag} key={index} />;
                })}
            </div>
            <label className="message-date">{formatDate(message?.date)}</label>
          </div>
          <div className="message-body-text"> {stripHtml(message!?.body)}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
