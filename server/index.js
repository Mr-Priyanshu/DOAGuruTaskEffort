const express = require('express') ;
const cors = require('cors');
const routes = require('./routes.js')  // Correct path to routes.js

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
