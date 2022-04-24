const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./database');
const router = require('./Routers/userRoute');
const { notFound, ErrorHandler } = require('./ErrorHandler/ErrorHandler');

const app = express();
dotenv.config();
dbConnect();
app.use(express.json());

app.use('/api/user', router);

const port = process.env.PORT || 5000;

app.use(notFound);
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})