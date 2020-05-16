import React, { useState, useEffect } from "react";
import InboxList from "./InboxList";
import InboxHeader from "./InboxHeader";
import { useSelector } from "react-redux";

const Inbox = () => {
  const { filterId } = useSelector((state: any) => ({
    ...state.filterReducer,
  }));
  const inboxItemsLength: number = useSelector(
    (state: any) => state.inboxListReducer.count
  );
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<number>(filterId);

  // check if need to filter by label
  useEffect(() => {
    if (filterId !== currentFilter) {
      setIsAllChecked(false);
      setCurrentFilter(filterId);
    }
  }, [filterId, currentFilter]);

  // look out to diselect all boxes after a delete action
  useEffect(() => {
    setIsAllChecked(false);
  }, [inboxItemsLength]);

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
