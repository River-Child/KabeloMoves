const express = require('express');
const router = express.Router();
const axios = require('axios')
const asyncHandler = require('express-async-handler')

router.route('/')
.get( asyncHandler(async (req,res) => {
    
    const n = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d4f7b87d7cedfdfbbb297f46aa3e8779&language=en-US&page=1')
    
    console.log(n.data.results[2])

    res.send('Awesome Movies API working...')
    
}))

module.exports = router
