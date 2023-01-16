import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import "./Display.css"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
export default function Showdata() {
    let navigate = useNavigate();

    const [users, setUsers] = React.useState([]);


    const Showdata = () => {
        axios.get('http://localhost:5000/')
            .then((res) => {
                const data1 = res.data
                // console.log(data1, ",==============")
                setUsers(data1)
            })

    }
    React.useEffect(() => {
        Showdata()
    }, [])
    const styles = {
        backgroundColor: 'white',
        width: '50px',
        marginBottom: '10px',
        padding: '10px',
        color: 'green',
        boxShadow: 'rgb(0,0,0,0.44) 0px 5px 5px',
    };
    const back = () => {

        navigate('/')


    }
    return (

        <div className="users">
            <table style={{ borderCollapse: "collapse", width: "80%", border: "1px solid black" }}>
                <tbody>
                    <tr style={{}}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                      
                        <th>Edit</th>
                        <th>DELETE</th>
                    </tr>

                    {users.map((user) => (

                        <tr key={user.email}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                           
                            <td><AiFillEdit /> </td>
                            <td><AiFillDelete /></td>
                             </tr>

                    ))}
                </tbody>
            </table>
            <button onClick={back}>ADD</button>
        </div>

    );
}


