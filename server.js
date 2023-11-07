const express = require('express');
const app = express();
const port = 8000;

// object return by JSON
let projectData = {};

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("website"));
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Callback function to complete POST '/all'
app.post('/add', async (req, res) => {
    const info = await req.body;
    projectData = info;
    res.send(projectData);
});

// Callback function to complete GET '/all'
app.get("/all", async (req, res) => {
    if (projectData) {
        res.send(projectData);
    }
});

app.listen(port, _ => console.log(`listening on port ${port}`));