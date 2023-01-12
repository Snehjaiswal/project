const express = require('express')
const bodyParser = require('body-parser')
const { createPool } = require('mysql')
const bcrypt = require("bcryptjs");
const sendMail = require('./sendmail')
const OtpUtil = require('./otp')
const app = express()
const { signupValidation, loginValidation } = require('./validation.js');
const { body, validationResult, check } = require('express-validator');

const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const pool = createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
})


app.get('/', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    pool.query(`select * from users`, (err, result, field) => {
        if (err) {
            return console.log(err)

        }
        res.send(result)
    })

})
app.post('/postdata',
    signupValidation,
    (req, res) => {
        const errors = validationResult(req);
        const data = req.body

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        pool.query('INSERT INTO users set ?'

            , data, (err, result, field) => {

                if (err) {
                    res.send(err)
                }
                else {
                    res.status(200).json({
                        success: true,
                        message: 'Login successful',
                    })
                }
            })

        const { otp, expires } = OtpUtil.generateOTP(data.email);

        const url = ` OTP: ${otp} `; //url for email

        sendMail.sendVerificationMail(data.email, url, "Verify your email address");



        console.log("Error", Error);

    })


app.put(`/update/:Id`, (req, res) => {
    console.log(req.params.Id, '.....................');
    const data = [req.body.name, req.body.lastname, req.body.phone, req.body.roll, req.params.Id]
    console.log(req.body.name, '...................');
    pool.query(`update users set name =?,email=?,password=? where Id=?`, data, (err, result) => {
        if (err) {
            res.send(err, "_____===============")
        }
        else {
            res.json(200, {
                result: result
            });
        }
    })
})
app.delete("/delete/:Id", (req, res) => {
    const id = req.params.Id
    console.log(id, '............');
    pool.query(`DELETE FROM users WHERE id= ${id}`, (err, result) => {
        if (err) {
            res.send(err, "_____===============")
        }
        else {
            res.json(200, {
                result: result
            });
        }
    })
})
app.listen(port, () => console.log(`Listening on port ${port}`))