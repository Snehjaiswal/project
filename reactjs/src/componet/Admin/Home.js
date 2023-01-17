import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Home() {
    const [getuser, setuser] = useState([]);

    const userId = localStorage.getItem('id')
    // console.log("userId", userId);

    console.log("getuser", getuser);
    const userGet = () => {
console.log("Run");
        var config = {
            method: 'post',
            url: 'http://localhost:5000/finduser',
            data: {
                id: userId
            }
        };

        axios(config)
            .then(function (response) {
                // console.log("okk=>", response.data.data[0]);
                setuser(response.data.data[0])
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        userGet()
    }, []);
    return (
        <>

<h3>Welcomme :-{getuser.name}</h3>
<h3>Permission :- {getuser.permission}</h3>
        </>
    )
}

export default Home