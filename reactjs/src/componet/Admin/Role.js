import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import axios from 'axios'


function Role() {

  const [show, setShow] = useState(false); 
   const [role, setrole] = useState("");
  const [summery, setsummery] = useState("");
  const [data1, setdata1] = useState([]);
  console.log("data1",data1);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const RoleAdd = ()=>{

    var config = {
      method: 'post',
      url: 'http://localhost:5000/addrole',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        "role": role,
        "summery": summery
      }
    };
    
    axios(config)
    .then(function (response) {
    console.log(response.data);
    handleClose()
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  
  const columns = [
    {
      name: 'S No.',
      selector: row => row.id,
    },
    {
      name: 'Name',
      selector: row => row.Role,
    },
    {
      name: 'Role',
      selector: row => row.role_summery,
    }
   
  ];

function RoleGet(){

  var config = {
    method: 'get',
    url: 'http://localhost:5000/role',
  };
  
  axios(config)
  .then(function (response) {
    console.log("okk",response.data);
    setdata1(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}

useEffect(() => {
  RoleGet()
},[]);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Create Role</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
       

          </div>
        </div>
      </nav>
      <Button variant="primary" onClick={handleShow}>
        Create Role
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Role Name</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e)=>setrole(e.target.value)}/>
              <div id="emailHelp" className="form-text">Enter You create role.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Role summery</label>
              <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e)=>setsummery(e.target.value)} />
              <div id="emailHelp" className="form-text">Role work summery.</div>

            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>RoleAdd()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <DataTable
        columns={columns}
        data={data1}
     
      />

    </>
  )
}

export default Role