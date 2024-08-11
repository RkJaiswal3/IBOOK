import React from "react";

export default function Alert(props) {
  const setCapital = (message) => {
    if(message === "danger"){
      message = "error";
    }
    return message.charAt(0).toUpperCase() + message.slice(1);
  };
  return (
    <div style={{height: '50px'}}>
      {props.alertshow && (
        <div
          className={`alert alert-${props.alertshow.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{setCapital(props.alertshow.type)} </strong>:{" "}
          {props.alertshow.msg}
        </div>
      )}
    </div>
  );
}
