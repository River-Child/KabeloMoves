require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')

console.log(process.env.NODE_ENV)

app.use(logger)

app.use(cors())
app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));

app.use('/awesomemovies', require('./routes/awesomemovies'));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.join({message: '404 Not found'})
    } else {
        res.type('txt').send('404 not found')
    }
        
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



