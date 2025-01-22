const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require ('dotenv');
const connectDb = require('./config/connectDb');
const errorHandler = require('./middlewares/errorMiddleware');
const path = require('path')

//routes paths
const authRoutes = require('./routes/authRoutes');
const openaiRoutes = require('./routes/openaiRoutes');


//config dotenv file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan('dev'));//configure morgan
app.use(express.json());
app.use(cors())
app.use(errorHandler)

//routes
 app.get('/', (req,res) => {
    res.send('Hello from server!')
 })

//port
const PORT = 8080 || process.env.PORT

//api routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/openai",openaiRoutes);

//static file reading
app.use(express.static(path.join(__dirname, '/client/build' )))

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


//listen server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});