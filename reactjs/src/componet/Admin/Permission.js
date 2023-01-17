import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import axios from 'axios'


function Permission() {
  const [refresh, setRefresh] = useState(false);

  const [show, setShow] = useState(false);
  const [permission, setpermission] = useState("");
  const [work, setwork] = useState("");
  const [data1, setdata1] = useState([]);
  console.log("data1", data1);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addPermission = () => {

    var config = {
      method: 'post',
      url: 'http://localhost:5000/addPermission',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "permission": permission,
        "work": work
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        handleClose()
        setRefresh(!refresh)
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
      name: 'Permission Name',
      selector: row => row.permission,
    },
    {
      name: 'work',
      selector: row => row.work,
    }

  ];

  const permission_user = () => {

    var config = {
        method: 'get',
        url: 'http://localhost:5000/permission',
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

  useEffect(() => {

    permission_user()
  },[refresh]);


  return (
    <>
   
      <Button variant="primary" onClick={handleShow}>
        Create Permission
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">permission Name</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setpermission(e.target.value)} />
              <div id="emailHelp" className="form-text">Enter You create role.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">permission summery</label>
              <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setwork(e.target.value)} />
              <div id="emailHelp" className="form-text">Role work summery.</div>

            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addPermission()}>
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

export default Permission