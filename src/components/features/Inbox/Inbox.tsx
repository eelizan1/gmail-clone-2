import React, { useState, useEffect } from "react";
import InboxList from "./InboxList";
import InboxHeader from "./InboxHeader";
import { useSelector } from "react-redux";
import { IEmailModel } from "../../../interfaces/interface";

const Inbox = () => {
  const { count } = useSelector((state: any) => ({
    ...state.counterReducer,
  }));
  const inboxItems: IEmailModel[] = useSelector(
    (state: any) => state.inboxListReducer
  );
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [currentCount, setCurrentCount] = useState<number>(count);

  // check if need to filter by label
  useEffect(() => {
    if (count !== currentCount) {
      setIsAllChecked(false);
      setCurrentCount(count);
    }
  }, [count, currentCount]);

  // look out to diselect all boxes after a delete action
  useEffect(() => {
    setIsAllChecked(false);
  }, [inboxItems.length]);

  return (
    <div className="inbox-container">
      <InboxHeader
        isAllChecked={isAllChecked}
        setIsAllChecked={setIsAllChecked}
      />
      <InboxList isAllChecked={isAllChecked} />
    </div>
  );
};

export default Inbox;
