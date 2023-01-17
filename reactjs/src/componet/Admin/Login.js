import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import '../validation/login1.css'
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const Login = () => {

        var data = JSON.stringify({

            "email": email,
            "password": password
        });



        axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
            .then(function (response) {
                console.log("response", response.data.data[0].role_id);
                if (response.data.msg == "Login success!") {

                    if (response.data.data[0].role_id == 1) {
                        localStorage.setItem("roleId", response.data.data[0].role_id)
                        localStorage.setItem("id", response.data.data[0].id)

                        navigate('/admin')
                    }else{
                        localStorage.setItem("roleId", response.data.data[0].role_id)
                        localStorage.setItem("id", response.data.data[0].id)
                        navigate('/home')
                    }


                }
            })
            .catch((err) => {
                console.log("err", err);
            });

        // }
    }

    return (
        <div className='body1'>
            <div className="container">
                <h3 style={{ textAlign: "center" }}>Login</h3>
                <div className='form' >
                    <div className="field email-field">

                        <div className="input-field">
                            <input type="email" placeholder="Enter your email" className="email" onChange={(e) => setemail(e.target.value)} />
                        </div>

                    </div>
                    <div className="field create-password">
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Create Password"
                                className="password"
                                onChange={(e) => setpassword(e.target.value)}
                            />

                        </div>
                    </div>
                    <div className="field button-field input-field">
                        <input type="submit" value="Submit Now" onClick={() => Login()} />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Login
