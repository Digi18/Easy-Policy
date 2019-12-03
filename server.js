const express =  require('express');

const app = express();

app.use(require('./routes/saveDetails.js'));
app.use(require('./routes/getDetails.js'));

const port = process.env.PORT || 3000;

app.listen(port,() => {

    console.log(`Server is running on ${port}.`);
});