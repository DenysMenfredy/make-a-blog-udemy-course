require('dotenv').config();
const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 8080;

const articlesInfo = {
    'learn-react': {
        comments: [

        ]
    },
    'learn-node': {
        comments: [

        ]
    },
    'my-thoughts-on-learning-react': {
        comments: [

        ]
    },
}

app.get("/hello", (req, res) => {
    res.json({ message:"Hello World"} );
});

app.post("/user", (req, res) => {
    console.log(req.body);
    const { name, age } = req.body;
    res.json({ message: `Hello ${name}, you are ${age} years old` });
});

app.get("/hello/:name", (req, res) => {
    const { name } = req.params;
    res.json({ message: `Hello, ${name}` });
});

app.post("/api/articles/:name/add-comments", (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    articlesInfo[articleName].comments.push({ username, text });
    res.status(200).send(articlesInfo[articleName]);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})