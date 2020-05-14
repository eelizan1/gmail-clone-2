import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./Dashboard.scss";
import Inbox from "../Inbox/Inbox";
import Message from "../message/Message";
import Sidebar from "../Sidebar/Sidebar";
import google from "../../../assets/gmail-logo-2.png";
import emails from "../../../data/email.json";
import { useDispatch } from "react-redux";
import { storeList } from "../../../app/redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  // load inital email list
  useEffect(() => {
    dispatch(storeList(emails.messages.reverse()));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="box header">
        <img className="google-image" src={google} alt="header-logo" />
      </div>
      <Sidebar />
      <div className="box content">
        <Switch>
          <Route exact path="/inbox" component={Inbox} />
          <Route exact path="/inbox/:id" children={<Message />} />
          <Redirect to="/inbox" />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
