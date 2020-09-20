import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modeState,roomState } from "../store/atoms";

const FindRoomForm = () => {
  const [input, setInput] = useState();
  const setMode = useSetRecoilState(modeState);
  const setRoom = useSetRecoilState(roomState);

  const submitHandler = async (event) => {
    event.preventDefault();

    if(!input) {
      alert("Please set Room Name!")
      return false
    }
    // check room!!!
    setRoom(input);
  };

  return (
    <div className="center">
      <p className="title">สร้างห้องใหม่</p>
      <form onSubmit={submitHandler}>
        <p>
          <input onChange={(e) => setInput(e.target.value)} />
        </p>
        <p>
          <button className="text" onClick={()=> setMode()}>กลับ</button>
          <button type="submit">ยินยัน</button>
        </p>
      </form>
    </div>
  );
};

export default FindRoomForm;
