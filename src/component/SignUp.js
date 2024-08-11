import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const SignUp = (props) => {

  const {showAlert} = props;

  const [credential, setCredential] = useState({name: "",  email: "",password: "", cpassword: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    //submit code
    e.preventDefault();
    const {name, email, password} = credential;
    const userResponse = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password}),

    });

    const json = await userResponse.json();
    console.log(json)
      //saved the auth token and redirect
    if(json.success){
      localStorage.setItem('token', json.authtoken)
      navigate("/login");
      showAlert("You have created the account !", "success");    
    }else{
      showAlert("Invalid Credential", "danger");
    } 


  }
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }


  return (
    <div>
       <h2>Sign Up to Continue iBook</h2><br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onchange} aria-describedby="nameHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp" />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" minLength={5} onChange={onchange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} onChange={onchange} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
