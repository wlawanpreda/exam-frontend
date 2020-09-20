import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modeState, roomState } from "../store/atoms";
import { gql, useMutation } from '@apollo/client';

const CREATE_ROOM = gql`
  mutation CreateRoom($roomName: String!) {
    createRoom(roomName: $roomName) {
      successful
    }
  }
`;

const RoomForm = () => {
  const [input, setInput] = useState();
  const setMode = useSetRecoilState(modeState);
  const setRoom = useSetRecoilState(roomState);
  const [createRoom, { data }] = useMutation(CREATE_ROOM);

  const submitHandler = async (event) => {
    event.preventDefault();

    if(!input) {
      alert("Please set Room Name!")
      return false
    }
    
    await createRoom({ variables: { roomName: input } });
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
          <button type="button" className="text" onClick={()=> setMode()}>กลับ</button>
          <button type="submit">ยืนยัน</button>
        </p>
      </form>
    </div>
  );
};

export default RoomForm;
