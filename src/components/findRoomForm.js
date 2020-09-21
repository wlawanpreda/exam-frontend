import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modeState,roomState } from "../store/atoms";
import { toast } from 'react-toastify';

const FindRoomForm = () => {
  const [input, setInput] = useState();
  const setMode = useSetRecoilState(modeState);
  const setRoom = useSetRecoilState(roomState);

  const submitHandler = async (event) => {
    event.preventDefault();

    if(!input) {
      toast("Please set Room Name!");
      return false;
    }
    setRoom(input);
  };

  return (
    <div className="center">
      <p className="title">เข้าร่วมแชท</p>
      <form onSubmit={submitHandler}>
        <p>
          <input onChange={(e) => setInput(e.target.value)} />
        </p>
        <p>
          <button className="text" onClick={()=> setMode()}>กลับ</button>
          <button type="submit">ยืนยัน</button>
        </p>
      </form>
    </div>
  );
};

export default FindRoomForm;
