const express = require("express")
const app = express();
const mongoose = require("mongoose")
const PORT = 8800
const dotenv = require("dotenv")
const authRoute = require('./controllers/auth')
const usersRoute = require('./controllers/users')


dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>{console.log("DB connection successfull!")})
.catch((err) => console.log(err))


// --------------------
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URL);
//   console.log("DB connection successfull!")
// } 

app.use(express.json())

app.use("/auth", authRoute)
app.use("/users", usersRoute)

app.listen(PORT,() =>{
    console.log(`Port ${PORT} backend server is running`)
})