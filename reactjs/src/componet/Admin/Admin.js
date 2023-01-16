import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';



function Admin() {

    const [show, setShow] = useState(false);

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [roleId, setroleId] = useState("");
    const [data1, setdata1] = useState([]);
    const [getuser, setuser] = useState([]);

    // console.log("roleId", roleId);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        RoleGet()
        userGet()
    }, []);


    const columns = [
        {
            name: 'S No.',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'password',
            selector: row => row.password,
        },
        {
            name: 'Role ',
            selector: row => row.Role,
        },
        {
            name: 'create Date',
            selector: row => row.create_at.split('T')[0],
        }
    ];


    const userAdd = () => {
        console.log("check=>", name, email, password, roleId);
        var config = {
            method: 'post',
            url: 'http://localhost:5000/adduser',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "name": name,
                "email": email,
                "password": password,
                "role_id": roleId
            }
        };

        axios(config)
            .then(function (response) {
                // console.log("response-", response.data);
                handleClose()
            })
            .catch(function (error) {
                console.log(error);
            });

    }



    const userGet = () => {

        var config = {
            method: 'get',
            url: 'http://localhost:5000/user',
        };

        axios(config)
            .then(function (response) {
                // console.log("okk=>", response.data);
                setuser(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const RoleGet = () => {

        var config = {
            method: 'get',
            url: 'http://localhost:5000/role',
        };

        axios(config)
            .then(function (response) {
                // console.log("okk", response.data);
                setdata1(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }





    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Create User</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">


                    </div>
                </div>
            </nav>




            <Button variant="primary" onClick={handleShow}>
                Create User
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setname(e.target.value)} />
                            <div id="emailHelp" className="form-text">Enter Your Name .</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setemail(e.target.value)} />
                            <div id="emailHelp" className="form-text">Enter Your email.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setpassword(e.target.value)} />
                            <div id="emailHelp" className="form-text">Enter Your password.</div>
                        </div>   <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Role Id</label>
                            {/* <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e)=>setroleId(e.target.value)} /> */}
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    Dropdown Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu > 
                                    {data1.map((val) =>(

                                        <Dropdown.Item onClick={() => setroleId(val.id)} key={val.id}>{val.Role}</Dropdown.Item>
                                    )

                                    )}

                                </Dropdown.Menu>
                            </Dropdown>

                            <div id="emailHelp" className="form-text">Decide which Role.</div>
                        </div>

                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => userAdd()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>






            <DataTable
                columns={columns}
                data={getuser}

            />

        </>
    )
}

export default Admin