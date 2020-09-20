import React, { useState } from "react";

import { useSetRecoilState } from "recoil";
import { nameState } from "../store/atoms";

const NameForm = () => {
  const [input, setInput] = useState();
  const setName = useSetRecoilState(nameState);

  const submitHandler = (event) => {
    event.preventDefault();
    setName(input)
  }

  return (
    <div className="center">
      <p className="title">ชื่อของคุณ</p>
      <form onSubmit={submitHandler}>
        <p><input onChange={e => setInput(e.target.value)} /></p>
        <p>{input && <button type="submit">ยืนยัน</button>}</p>
      </form>
    </div>
  );
};

export default NameForm;