import { Dispatch } from "@reduxjs/toolkit";
import { setUsername } from "../../store/mainSlice";
export const apiRegister = async (
  name: string,
  phoneNumber: string,
  password: string
) => {
  const res = await fetch(process.env.BaseUrl + "/user/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber,
      username: name,
      password,
      role: 0,
    }),
  });

  const res_json = await res.json();
  console.log(res_json);
};

export const apiLogin = async (phoneNumber: string, password: string, dispath: Dispatch) => {
  const res = await fetch(process.env.BaseUrl + "/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber,
      password,
      role: 0,
    }),
  });

  const res_json = await res.json();
  window.localStorage.setItem("token", res_json.data.token);
  window.localStorage.setItem("username", res_json.data.username);
  dispath(setUsername(res_json.data.username))
  console.log(res_json);
};
