import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { message } from "antd";
const Downloads = () => {
  const [name, setName] = useState("");

  const [greetMsg, setGreetMsg] = useState("");

  async function greet(e) {
    e.preventDefault();
    message.success(`Hello ${name} from antd`);
    console.log(name);
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke("greet", { name }));
  }


  return (
    <>
      <h1>Downloads page</h1>

      <p>Enter a youtube link or video code below</p>
      <form
        className="row"
        onSubmit={(e) => {
          greet(e);
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="https://youtu.be/fIQZLRtPtyg?si=YCyjNr8coRPwIjGE"
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </>
  );
};

export default Downloads