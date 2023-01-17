import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';



function Admin() {

    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [roleId, setroleId] = useState("");
    const [data1, setdata1] = useState([]);
    const [data2, setdata2] = useState([]);

    const [getuser, setuser] = useState([]);

    // console.log("roleId", roleId);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        RoleGet()
        userGet()
        permission_user()
    }, [refresh]);


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
            name: 'Permission ',
            selector: row => row.permission,
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

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height

            }, background: {
                default: '#000',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };
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
                setRefresh(!refresh)
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

    const permission_user = () => {

        var config = {
            method: 'get',
            url: 'http://localhost:5000/permission',
        };

        axios(config)
            .then(function (response) {
                // console.log("okk", response.data);
                setdata2(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (
        <>
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex  ms-auto">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Permission</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={()=>navigate('/role')}>Role</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Profile</a>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav> */}




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
                        </div>


                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputPassword1" className="form-label">Role Id</label> */}

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    Select Role
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {data1 && data1.map((val) => (

                                        <Dropdown.Item onClick={() => setroleId(val.id)} key={val.id}>{val.Role}</Dropdown.Item>
                                    )

                                    )}

                                </Dropdown.Menu>
                            </Dropdown>


                            <div id="emailHelp" className="form-text">Decide which Role.</div>
                        </div>


                        <div className="mb-3">

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    Permission
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {data2 && data2.map((val) => (

                                        <Dropdown.Item onClick={() => setroleId(val.id)} key={val.id}>{val.permission}</Dropdown.Item>
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
                customStyles={customStyles}
            />

        </>
    )
}

export default Admin