const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

const config = require('./configs/key');


/****************************************************************************************************
 * MongoDB 연결
 ****************************************************************************************************/
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
.then(() => console.log('MongoDB is connected!'))
.catch(err => console.log('MongoDB connection error : ' + err));


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Start server at ${port} port!`);
}); 