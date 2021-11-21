const express = require('express');
var cors = require('cors');
require('./config/db.config')
const app = express();

const port = 5000

app.get('/',(req,res) => {
    res.send('hello world');
})

app.use(cors());
app.use(express.json());

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})