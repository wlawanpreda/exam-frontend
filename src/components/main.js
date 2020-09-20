import React from "react";

import { NameForm, NewRoomForm, FindRoomForm, ChatRoom } from "./";

import { useRecoilState, useRecoilValue } from "recoil";
import { modeState, nameState, roomState } from "../store/atoms";

const Main = () => {
  const [mode, setMode] = useRecoilState(modeState);
  const name = useRecoilValue(nameState);
  const room = useRecoilValue(roomState);
  if (!name) return <NameForm />;
  if (room) return <ChatRoom />;

  if (mode && mode === "newRoom") return <NewRoomForm />;
  if (mode && mode === "findRoom") return <FindRoomForm />;

  return (
    <div className="center">
      <p className="title">คุณ {name}</p>
      <p>
        <button onClick={() => setMode("newRoom")}>สร้างห้องใหม่</button>
      </p>
      <p>
        <button className="text" onClick={() => setMode("findRoom")}>เข้าร่วมแชท</button>
      </p>
    </div>
  );
};

export default Main;
