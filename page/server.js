require("dotenv").config()

const express = require("express")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const nodemailer = require("nodemailer")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/send", async (req,res)=>{

const {name,email,message,phone} = req.body

const text = `
Новое сообщение

Имя: ${name}
Email: ${email}
Телефон: ${phone}
Сообщение: ${message}
`

// Telegram

try {
await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:process.env.CHAT_ID,
text:text
})
})
} catch (err) {
console.log("Telegram error:", err)
}

// Gmail

let transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.EMAIL,
pass:process.env.EMAIL_PASS
}
})

await transporter.sendMail({
from:process.env.EMAIL,
to:process.env.EMAIL,
subject:"Новое сообщение с сайта",
text:text
})

res.send("Сообщение отправлено!")

})

app.listen(3000,()=>{
console.log("Server started")
})