import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { nameState, roomState } from "../store/atoms";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_MESSAGE = gql`
  query Messages($roomName: String!) {
    messages(roomName: $roomName) {
      id
      body
      from {
        name
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($roomName: String!, $message: String!, $user: String) {
    sendMessage(roomName: $roomName, message: $message, user: $user) {
      successful
    }
  }
`;

const ChatRoom = () => {
  const [message, setMessage] = useState();
  const name = useRecoilValue(nameState);
  const roomName = useRecoilValue(roomState);

  const { loading, error, data, refetch } = useQuery(GET_MESSAGE, {
    variables: { roomName },
  });
  const [sendMessage, { data: dataSet }] = useMutation(SEND_MESSAGE);

  const actionSendMessage = async (event) => {
    if (!message) {
      alert("Please set Message!");
      return false;
    }

    await sendMessage({ variables: { message, roomName, user: name } });
    refetch();
  };

  if (loading) return "loading...";
  if (error) throw error;

  return (
    <div>
      <p className="title chat-title">ห้อง {roomName}</p>
      <div className="chat-blog">
        {data.messages &&
          data.messages.length > 0 &&
          data.messages.map((msg, key) => {
            return (
              <span key={key}>
                <p className="chat-from">คุณ {msg.from.name}</p>
                <span className="chat-message">{msg.body}</span>
              </span>
            );
          })}
      </div>
      <p>
        <input
          style={{ width: "100%" }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) =>
            e.key === "Enter" || e.keyCode === 13 ? actionSendMessage() : null
          }
        />
      </p>
    </div>
  );
};

export default ChatRoom;
