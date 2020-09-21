import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { modeState, nameState, roomState } from "../store/atoms";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import { toast } from "react-toastify";

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

const COMMENTS_SUBSCRIPTION = gql`
  subscription NewMessage($roomName: String!) {
    newMessage(roomName: $roomName) {
      id
      body
      from {
        name
      }
    }
  }
`;

const ChatRoom = () => {
  const [message, setMessage] = useState();

  const setMode = useSetRecoilState(modeState);
  const name = useRecoilValue(nameState);
  const [roomName, setRoomName] = useRecoilState(roomState);

  const { loading, error, data: dataQuery, refetch } = useQuery(GET_MESSAGE, {
    variables: { roomName },
  });
  const [sendMessage, { data: dataMutation }] = useMutation(SEND_MESSAGE);

  const {
    data: dataSubscription,
    loading: subLoading,
  } = useSubscription(COMMENTS_SUBSCRIPTION, { variables: { roomName } });

  const actionSendMessage = async (event) => {
    if (!message) {
      toast.error("Please set Message!", { autoClose: 2000 });
      return false;
    }
    const variables = { message, roomName, user: name };
    await sendMessage({ variables });
    setMessage("");
    refetch();
  };

  useEffect(() => {
    if (dataSubscription && dataSubscription.newMessage.from.name !== name) {
      console.log("PJ-LOG: dataSubscription", dataSubscription);
      toast("New Message!", { autoClose: 2000 });
      refetch();
    }
  }, [dataSubscription]);

  if (loading) return "loading...";
  if (error) {
    toast.error("Cann't find Room!", { autoClose: 2000 });
    setRoomName();
    setMode("findRoom");
    return `error: ${error}`;
  }

  return (
    <>
      <p className="title chat-title">ห้อง {roomName}</p>
      <div className="chat-blog">
        {dataQuery.messages &&
          dataQuery.messages.length > 0 &&
          dataQuery.messages.map((msg, key) => {
            return (
              <span key={key}>
                <p className="chat-from">คุณ {msg.from.name}</p>
                <span className="chat-message">{msg.body}</span>
              </span>
            );
          })}
      </div>
      <input
        style={{ width: "100%" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) =>
          e.key === "Enter" || e.keyCode === 13 ? actionSendMessage() : null
        }
      />
    </>
  );
};

export default ChatRoom;
