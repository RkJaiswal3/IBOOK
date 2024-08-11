import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = (props) => {

const [credential, setCredential] = useState({email: "", password: ""})
let navigate  = useNavigate();
const {showAlert} = props;

const handleSubmit = async (e) =>{
    //submit code

    e.preventDefault();
    const userResponse =await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: credential.email, password: credential.password}),

      });

      const json = await userResponse.json();
      console.log(json)
      if (json.success === true) {
        //saved the auth token and redirect
        localStorage.setItem('token', json.authToken)
        showAlert("Successfully Logged In!", "success");
        navigate("/");

      }else{
        showAlert("Invalid Details", "danger");
      }
}

const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
}
    return (
        <div>
            <h2>Login to Continue iBook</h2><br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={credential.email} onChange={onchange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credential.password} onChange={onchange} id="password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
