const express = require('express')
const bodyParser = require('body-parser')
const { createPool } = require('mysql')
const bcrypt = require("bcryptjs");
const sendMail = require('./sendmail')
const OtpUtil = require('./otp')
const app = express()
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
        // return console.log(res,'=---------------------')
        res.send(result)
    })
    // res.res('hiii hello ')

})
app.post('/postdata', (req, res) => {
    const data = req.body
    pool.query('select * from users where email = "' + data.email + '"', (err, result) => {
        if (result.length != 0 )  {
            console.log("this email alreay exist");
            return res.send({ msg: "this email alreay exist." });
        }
    })
    const passwordHash = bcrypt.hash(data.password, 10);
    if (data.password.length < 6)
        return res

            .send({ msg: "Password must be at least 6 characters." });
    if (!data.name || !data.email || !data.password)
        return res.send({ msg: "Please fill in all fields." });
    if (!validateEmail(data.email))
        return res.send({ msg: "Invalid emails." });
    console.log(data, '.................');
    pool.query('INSERT INTO users set ?'
        , data, (err, result, field) => {

            if (err) {


                return console.log(err)

            }

            else {
                res.send({msg:"Success"})

            }
        })

    const { otp, expires } = OtpUtil.generateOTP(data.email);

    const url = ` OTP: ${otp} `; //url for email

    sendMail.sendVerificationMail(data.email, url, "Verify your email address");

})
// // email validation
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
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
    console.log(id,'............');
    pool.query(`DELETE FROM users WHERE id= ${id}`,  (err, result) => {
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