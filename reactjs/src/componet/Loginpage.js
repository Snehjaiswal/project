import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Loginpage = () => {
    let navigate = useNavigate();
    const [bannerAlert, setBannerAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    let loginFields = [
        {
            placeholder: "name",
            value: "",
            name: "name",
            type: "text",
            hasError: false,
            required: true
        },
        {
            placeholder: "email",
            value: "",
            name: "email",
            type: "email",
            hasError: false,
            required: true,
            // className:{errors.email && touched.email && "error"}

        },
        {
            placeholder: "password",
            value: "",
            name: "password",
            type: "password",
            hasError: false,
            required: true
        },

    ];

    let feedbackObject = {
        process: "",
        feedback: "",
        closable: false,
    };

    const [fields, updateFields] = useState(loginFields);
    const setFieldValue = (value, index) => {
        let fieldData = [...fields];
        fieldData[index].value = value;
        fieldData[index].hasError = value === "";
        updateFields(fieldData);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log("Form submitted");

        let requestObject = {};

        const data = fields.forEach((field) => {
            requestObject[field.name] = field.value;
        });

        axios.post(
            `http://localhost:5000/postdata`,
            requestObject,
        )
            .then((response) => {
                console.log('response', response);
                setBannerAlert(true);

                setTimeout(() => {
                    navigate("/show");
                }, 2000);
            })
            .catch((error) => {
                console.log("isss called");
                setErrorAlert(true);

                console.log({ error });
            });
    };

    const click = () => {
        navigate('/show')

    }
    const successBanner = {
        color: "#fff",
        backgroundColor: "green",
        borderRadius: 2, padding: '2%',
        justifyContent: 'center'
    };
    const errorBanner = {
        color: "#fff",
        backgroundColor: "red",
        borderRadius: 2, padding: '2%',
        justifyContent: 'center'
    }
    return (
        <>

            <div className={"auth-container"}>
                <div className={"auth-content"} >
                    <form
                        method={"post"}
                        action={""}
                        onSubmit={(event) => handleFormSubmit(event)}
                        style={{
                            color: "blue",
                            padding: "14px",
                            marginLeft: "530px",
                            borderRadius: "2px",
                            marginRight: "590px",
                            marginTop: "200px",
                            backgroundColor: "#1b102e",
                            textAlign: "center"

                        }}
                    >

                        <div className={"input-list centered-data"}>
                            <h4 style={{ color: "white", marginTop: "5px", textAlign: "center" }}>Login page</h4>
                            {fields.map((field, index) => {
                                return (
                                    <div className={`input-control`} key={index}>
                                        <br></br>
                                        <input
                                            type={field.type}
                                            value={field.value}
                                            name={field.name}
                                            onChange={(event) =>
                                                setFieldValue(event.target.value, index)
                                            }
                                            placeholder={field.placeholder}
                                            className={`${field.hasError ? "input-error" : ""}`}
                                            style={{ padding: "10px" }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        {bannerAlert &&
                            <div style={successBanner}>
                                <span className="d-flex justify-content-center">
                                    Login successfully !!
                                </span>
                            </div>
                        }
                        {errorAlert &&
                            <div style={errorBanner}>
                                <span className="d-flex justify-content-center">
                                    This email is already exist try another Email !!
                                    <span> &nbsp;&nbsp;&nbsp;&nbsp;x </span>
                                </span>
                            </div>
                        }
                        <br></br>
                        <button
                            style={{ color: "white", backgroundColor: "grey", borderColor: "black" }}
                            type={"submit"}
                            disabled={
                                fields.filter((field) => field.value === "").length > 0
                            }
                        >
                            Login
                        </button>

                    </form>
                    <button onClick={click}>show Users</button>
                </div>
            </div>

        </>
    );
};

export default Loginpage;
