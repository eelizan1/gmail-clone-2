import React, { useState, useEffect } from "react";
import InboxRow from "./InboxRow";
import { IEmailModel } from "../../../interfaces/interface";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMessagesByTagFromArray } from "../../helpers/MessageHelper";

interface IInboxListProps {
  isAllChecked: boolean;
}

const InboxList: React.FC<IInboxListProps> = ({ isAllChecked }) => {
  // get inbox items from store
  const inboxItems: IEmailModel[] = useSelector(
    (state: any) => state.inboxListReducer.initialListState
  );
  const inboxItemsLength: number = useSelector(
    (state: any) => state.inboxListReducer.count
  );
  // get the current label filter from the store
  const { count } = useSelector((state: any) => ({
    ...state.counterReducer,
  }));
  const [emailList, setEmailList] = useState<IEmailModel[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<IEmailModel>();
  const history = useHistory();

  // set the current list from store based on label
  useEffect(() => {
    // with current items from store, filter by label
    setEmailList(getMessagesByTagFromArray(inboxItems, count));

    // navigate to individial message details
    if (selectedMessage) {
      history.push("/inbox/" + selectedMessage.id);
    }
  }, [history, selectedMessage, inboxItems, inboxItemsLength, count]);

  return (
    <div className="inbox-list-wrapper">
      {emailList &&
        emailList.map((email, index) => {
          return (
            <InboxRow
              isAllChecked={isAllChecked}
              email={email}
              key={index}
              onClick={() => setSelectedMessage(email)}
            />
          );
        })}
    </div>
  );
};

export default InboxList;
