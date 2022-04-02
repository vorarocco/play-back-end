const express = require("express")
const app = express();
const mongoose = require("mongoose")
const PORT = process.env.PORT
const dotenv = require("dotenv")
const authRoute = require('./controllers/auth')
const usersRoute = require('./controllers/users')
const moviesRoute = require('./controllers/movies')
const listsRoute = require('./controllers/lists')
const cors = require('cors')


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
app.use(cors())
app.use(express.json())

app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/movies", moviesRoute)
app.use("/lists", listsRoute)

app.listen(PORT,() =>{
    console.log(`Port ${PORT} backend server is running`)
})