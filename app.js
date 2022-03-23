const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');



const indexRouter = require('./routes/index');
const auth = require('./middlewares/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// app.use(passport.initialize());
// app.use(passport.session());


mongoose.connect(
        'mongodb+srv://haystack:haystack@cluster0.bwzed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology: true ,  useNewUrlParser: true }
    )
    .then(result => {
        app.listen(8080);
        console.log("Running !")
    })
    .catch(err => console.log(err));
app.use('/', indexRouter);








app.listen(8000);
