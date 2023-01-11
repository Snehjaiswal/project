import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ValidatedLoginForm = () => (

    //  [fields, updateFields] = useState(loginFields),

    <Formik
    
        initialValues={{name:"", email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 500);
            
        }}
        handleFormSubmit = {(event) => {
            event.preventDefault();
    
            console.log("Form submitted");
    
            let requestObject = {};
    
            // const data = fields.forEach((field) => {
            //     requestObject[field.name] = field.value;
            // });
    
            axios.post(
                `http://localhost:5000/postdata`,
                requestObject,
            )
                .then((response) => {
                    console.log('response', response);
                    // setBannerAlert(true);
    
                    setTimeout(() => {
                        // navigate("/show");
                    }, 2000);
                })
                .catch((error) => {
                    console.log("isss called");
                    // setErrorAlert(true);
    
                    console.log({ error });
                });
            }
        }
        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email()
            
                .required("Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number."),
             name:Yup.string()
                .required("please full fill name filed")
        })}
    >
    
        {props => 
        {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleFormSubmit
            } = props;
            return (
                <form  onSubmit={(event) => handleFormSubmit(event)} style={{
                   
                    marginLeft: "500px",
                    marginRight: "500px",
                    textAlign: "center",
                    paddingTop: "50px",
                    paddingBottom: "40px",
                    marginTop: "100px",
                    backgroundColor:"#9e7d8b"

                }}>

                    <label htmlFor="email">Name</label>
                    <input
                        name="name"

                        type="name"
                        placeholder="Enter your name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.name && touched.name && "error"}
                        style={{
                            padding: "10px",
                            margin: "10px"
                        }}
                    />
                    {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                    )}
                    <br></br>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
                        style={{
                            padding: "10px",
                            margin: "10px"
                        }}
                    />
                    {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                    )}
                    <br>
                    </br>
                    <label htmlFor="email">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                        style={{
                            padding: "10px",
                            margin: "10px"
                        }}
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                    <br></br>
                    <button type="submit" disabled={isSubmitting} style={{
                        padding: "5px",
                        margin: "5px"
                    }}>
                        Login
                    </button>
                </form>
            );
        }}
    </Formik>
);

export default ValidatedLoginForm;
