import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { useWindowWidth } from "@react-hook/window-size";
import { formatDate } from "../../helpers/DateFormater";

import "./InboxRow.scss";
import { IEmailModel } from "../../../interfaces/interface";
import Label from "../Label/Label";
import { useSelector } from "react-redux";
import { deleteArray } from "../../helpers/MessageHelper";

interface IInboxRowProps {
  isAllChecked: boolean;
  email: IEmailModel;
  onClick?: () => void;
}

const InboxRow: React.FC<IInboxRowProps> = ({
  isAllChecked,
  email,
  onClick = () => false,
}) => {
  const { count } = useSelector((state: any) => ({
    ...state.counterReducer,
  }));
  const inboxItemsLength: number = useSelector(
    (state: any) => state.inboxListReducer.count
  );
  const width = useWindowWidth();
  const [finalCheckedState, setFinalCheckedState] = useState<boolean>(false);

  // have individual check state match select all state
  useEffect(() => {
    setFinalCheckedState(isAllChecked);
  }, [isAllChecked, count, inboxItemsLength]);

  // add or remove items from delete array by check state
  useEffect(() => {
    if (finalCheckedState) {
      deleteArray.push(email);
    } else {
      let index = deleteArray
        .map(function (item) {
          return item.id;
        })
        .indexOf(email.id);
      deleteArray.splice(index, 1);
    }
  }, [email, finalCheckedState]);

  // handle manual individial check state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!finalCheckedState) {
      setFinalCheckedState(true);
    } else {
      setFinalCheckedState(false);
    }
  };

  return (
    <div
      className={
        !finalCheckedState ? "inbox-row-wrapper" : "inbox-row-wrapper checked"
      }
    >
      <Checkbox
        checked={finalCheckedState}
        className="checkbox"
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}
        onChange={handleChange}
      />
      <div className="sender" onClick={onClick}>
        {email.sender}
      </div>

      {width > 600 ? (
        <div className="subject-message" onClick={onClick}>
          <div className="subject">
            {email.tags &&
              email.tags.map((tag, index) => {
                return <Label category={tag} key={index} />;
              })}

            {email.subject}
          </div>
          <div className="message">{email.body.substring(3, 40)}...</div>
        </div>
      ) : (
        <>
          <div className="subject" onClick={onClick}>
            {email.subject}{" "}
            {email.tags &&
              email.tags.map((tag, index) => {
                return <Label category={tag} key={index} />;
              })}
          </div>
          <div className="message" onClick={onClick}>
            {email.body.substring(3, 40)}...
          </div>
        </>
      )}

      <div className="date" onClick={onClick}>
        {formatDate(email.date)}
      </div>
    </div>
  );
};

export default InboxRow;
