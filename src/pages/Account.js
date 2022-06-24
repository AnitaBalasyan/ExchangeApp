import React, { useContext, useState } from "react";
import { RouteContext } from "../App";

const Account = () => {
  const setCurrentRoute = useContext(RouteContext);


  return (
    <div>
      Account
      <button
        onClick={() => {
          setCurrentRoute("/");
        }}
      >
        Go to home
      </button>
    </div>
  );
};

export default Account;
