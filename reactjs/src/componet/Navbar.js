import React from 'react'
import { Route, Routes, useLocation ,useNavigate} from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    const location = useLocation()

    // console.log("location", location.pathname);
    return (
        <>


            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{location.pathname.split('/')}</a>
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
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/admin')}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/permission')}>Permission</a>
                            </li>
                            <li className="nav-9item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/role')}>Role</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => navigate('/ ')}>Profile</a>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>


        </>
    )
}

export default Navbar