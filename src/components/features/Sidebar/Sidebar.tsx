import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { IEmailModel } from "../../../interfaces/interface";
import { deleteArray } from "../../helpers/MessageHelper";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const inboxItemsLength: number = useSelector(
    (state: any) => state.inboxListReducer.count
  );

  const [isWorkTagSelected, setIsWorkTagSelected] = useState<boolean>(false);
  const [isTravelTagSelected, setIsTravelTagSelected] = useState<boolean>(
    false
  );
  const [isInboxSelected, setIsInboxSelected] = useState<boolean>(true);
  const [inboxCount, setInboxCount] = useState<number>(inboxItemsLength);

  // set select styles to proper label tag
  useEffect(() => {
    setInboxCount(inboxItemsLength);
  }, [inboxItemsLength]);

  // manual select of tag to filter inbox list
  const filterByTag = (value: number) => {
    // empty delete array
    deleteArray.length = 0;
    switch (value) {
      case 1:
        handleSelectStyle(value);
        updateList("inbox");
        break;
      case 3:
        handleSelectStyle(value);
        updateList("work");
        break;
      case 2:
        handleSelectStyle(value);
        updateList("travel");
        break;
    }
  };

  // helper method to apply filter logic for each case
  const handleSelectStyle = (value: number) => {
    switch (value) {
      case 1:
        setIsInboxSelected(true);
        setIsTravelTagSelected(false);
        setIsWorkTagSelected(false);
        break;
      case 3:
        setIsInboxSelected(false);
        setIsTravelTagSelected(false);
        setIsWorkTagSelected(true);
        break;
      case 2:
        setIsInboxSelected(false);
        setIsTravelTagSelected(true);
        setIsWorkTagSelected(false);
        break;
    }
  };

  // update store with filtered tag so inbox list
  // can determine what to show
  const updateList = (value: string) => {
    dispatch({
      type: value,
    });
  };

  return (
    <div className="sidebar-wrapper">
      <div className="compose-button">
        {" "}
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="compose-button"
          startIcon={<AddIcon />}
        >
          Compose
        </Button>
      </div>
      <div className="inbox-labels">
        <div
          className={"all-label " + (isInboxSelected ? "selected" : "")}
          onClick={() => filterByTag(1)}
        >
          <InboxIcon className="side-icon" color="action" />
          <label>Inbox</label>
          <span>{inboxCount}</span>
        </div>
        <div
          className={"work-label " + (isWorkTagSelected ? "selected" : "")}
          onClick={() => filterByTag(3)}
        >
          <WorkOutlineIcon className="side-icon" color="action" />
          <label>Work</label>
          <span></span>
        </div>
        <div
          className={"travel-label " + (isTravelTagSelected ? "selected" : "")}
          onClick={() => filterByTag(2)}
        >
          <FlightTakeoffIcon className="side-icon" color="action" />
          <label>Travel</label>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
