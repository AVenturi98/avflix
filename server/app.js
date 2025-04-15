const express = require('express');
const app = express();
const port = 3033;
const router = require('./routers/router');
const cors = require('cors')

app.use(cors());


app.use('/', router)


app.listen(port, () => {
    console.log(`My app to listen to ${port}`)
})