const express = require('express')
const connectToMongo = require('./db');
var cors = require('cors')

connectToMongo();
const app = express();  
const port = 5000

app.use(cors())
app.use(express.json()) //now we can use this middleware to do or send request into body

app.use('/api/auth', require('./routes/auth'))
//yo milena may be the path decalaration is wrong
// api.use('/api/notes', require('./routes/notes'));
//app.use method used to get or link the path from folder and the first path is display as in url

app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iBook Backend app listening on port http://localhost:${port}`)

});

