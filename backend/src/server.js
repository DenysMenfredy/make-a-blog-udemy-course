require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const { withDB } = require('./db');


const port = process.env.PORT || 8080;


// const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.xbkot.mongodb.net/test`
// console.log(uri);
app.get('/api/articles/:name', (req, res) => {
    const { name } = req.params;

    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: name });
        if (articleInfo) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.status(200).json(articleInfo);
        }
        return res.status(404).json({ message: 'Article not found' });
    }, res);

});

app.get('/api/articles', (req, res) => {
    withDB(async (db) => {
        const articles = await db.collection('articles').find({}).toArray();
        if (articles) {
            return res.status(200).json(articles);
        }
        return res.status(404).json({ message: 'No articles found' });
            
    }, res);
})

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

    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        if (articleInfo) {
            await db.collection('articles').updateOne({ name: articleName }, {
                $set: {
                    comments: articleInfo.comments.concat({ username, text })
                },
            });
            const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
            // res.header('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            return res.status(200).json(updatedArticleInfo);
    } else {
        return res.status(404).json({ message: 'Article not found' });
    }
}, res);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
