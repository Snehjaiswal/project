import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';



function Admin() {

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const [refresh, setRefresh] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [roleId, setroleId] = useState("");
    const [data1, setdata1] = useState([]);
    const [data2, setdata2] = useState([]);

    const [editData, seteditData] = useState([]);


    const [getuser, setuser] = useState([]);

    // console.log("roleId", roleId);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose1 = () => setShow(false);
    const handleShow1 = (e, row) => {
        console.log("row121", row);
        seteditData(row)
        setShow(true);

    }


    useEffect(() => {
        RoleGet()
        userGet()
        permission_user()
    }, [refresh]);


    const columns = [
        {
            name: 'S No.',
            selector: row => row.user_id,
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
        },
        {
            name: 'Action',
            selector: row =>
                <>
                    <span><i class="fas fa-edit" onClick={(e) => handleShow1(e, row)}></i></span>
                    <span> <i class="fa-solid fa-trash" onClick={(e) => deleteRow(e, row)}></i></span>
                </>
            ,


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



    const deleteRow = (e, row) => {

        console.log("row", row);


        var config = {
            method: 'post',
            url: 'http://localhost:5000/delete_user',
            data: {
                id: row.user_id
            }
        };

        axios(config)
            .then(function (response) {
                setRefresh(!refresh)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    console.log("editData", editData);


    return (
        <>





            <Button variant="primary" onClick={handleShow}>
                Create User
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div>

                        <div class="row">
                            <div class="col-sm">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setname(e.target.value)} />
                                    <div id="emailHelp" className="form-text">Enter Your Name .</div>
                                </div>

                            </div>

                            <div class="col-sm">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setemail(e.target.value)} />
                                    <div id="emailHelp" className="form-text">Enter Your email.</div>
                                </div>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setpassword(e.target.value)} />
                                <div id="emailHelp" className="form-text">Enter Your password.</div>
                            </div>


                            <div class="col-sm">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                        Select Role
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        {data1 && data1.map((val) => (

                                            <Dropdown.Item onClick={() => setroleId(val.id)} >{val.Role}</Dropdown.Item>
                                        )

                                        )}

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div class="col-sm">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                        Permission
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        {data2 && data2.map((val) => (

                                            <Dropdown.Item onClick={() => setroleId(val.id)} >{val.permission}</Dropdown.Item>
                                        )

                                        )}

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                        </div>
                    </div>
<br /> 


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






            {/* Edit table */}
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>{editData.name} Edit</Modal.Title>
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




                        <span>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    Select Role
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {data1 && data1.map((val) => (

                                        <Dropdown.Item onClick={() => setroleId(val.id)} >{val.Role}</Dropdown.Item>
                                    )

                                    )}

                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    Permission
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {data2 && data2.map((val) => (

                                        <Dropdown.Item onClick={() => setroleId(val.id)} >{val.permission}</Dropdown.Item>
                                    )

                                    )}

                                </Dropdown.Menu>
                            </Dropdown>


                        </span>


                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
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