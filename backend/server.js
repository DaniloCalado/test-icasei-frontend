const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); 
const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use('/mf_drawer', express.static(path.join(__dirname, '../mf_drawer')));
app.use('/mf_videos', express.static(path.join(__dirname, '../mf_videos')));
app.use(express.json());

app.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Request failed');
    }
});

app.get('/videos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`);
        res.json(response.data.items[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Request failed');
    }
});


app.get('/mf_drawer', (req, res) => {
    res.sendFile(path.join(__dirname, '../mf_drawer', 'index.html'));
});

app.get('/mf_videos', (req, res) => {
    res.sendFile(path.join(__dirname, '../mf_videos', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
