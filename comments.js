// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let comments = [];

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a specific comment by ID
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('Comment not found');
    res.json(comment);
});

// Create a new comment
app.post('/comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        text: req.body.text
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Update a comment by ID
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('Comment not found');
    comment.text = req.body.text;
    res.json(comment);
});

// Delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const commentIndex = comments.findIndex(c => c.id === parseInt(req.params.id));
    if (commentIndex === -1) return res.status(404).send('Comment not found');
    comments.splice(commentIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});