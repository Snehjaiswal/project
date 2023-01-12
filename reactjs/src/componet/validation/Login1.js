import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import '../../componet/validation/login1.css'
import axios from "axios";

function Login1() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const Login = () => {
        // if (name == "") {
        //     alert("Please fill name")
        // } else if (email == "") {
        //     alert("Please fill email")
        // } else if (password == "") {
        //     alert("Please fill PAssword")
        // } else {
        var data = JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/postdata',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios({
            method: 'post',
            url: 'http://localhost:5000/postdata',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
            .then(function (response) {
                if (response.data.success == true) {

                    navigate('/show')
                }
            })
            .catch(function (error) {
                const errorLen = error.response.data.errors
                for (let i = 0; i < errorLen.length; i++) {
                    console.log(errorLen[i].msg);
                }
            });

        // }
    }

    return (
        <div>
            <div className="container">
                <h3 style={{ textAlign: "center" }}>Login</h3>
                <div className='form' >
                    <div className="field email-field">
                        <div className="field name">
                            <div className="input-field">
                                <input
                                    type="name"
                                    placeholder="name"
                                    className="name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
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
export default Login1
