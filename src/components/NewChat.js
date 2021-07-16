import { ArrowBack } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Api from "../Api";
import "./NewChat.css";

export default ({ user, chatList, show, setShow }) => {
  const [list, setList] = useState([]);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        let results = await Api.getContactList(user.id);
        setList(results);
      }
    };
    getList();
  }, [user]);

  const addNewChat = async (user2) => {
    await Api.addNewChat(user, user2);

    handleClose();
  };

  return (
    <div className="newChat" style={{ left: show ? 0 : -415 }}>
      <div className="newChat--head">
        <div className="newChat--backButton" onClick={handleClose}>
          <ArrowBack style={{ color: "#fff" }} />
        </div>
        <div className="newChat--headTitle">Nova Conversa</div>
      </div>
      <div className="newChat--list">
        {list.map((item, key) => (
          <div
            className="newChat--item"
            key={key}
            onClick={() => addNewChat(item)}
          >
            <img className="newChat--itemAvatar" src={item.avatar} alt="" />
            <div className="newChat-itemName">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
