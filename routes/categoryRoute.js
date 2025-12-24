const express = require('express');
const app = express()
const categoryController = require('../../controller/categoryController');

app.get('/:id', auth, categoryController.readCategory);
app.post('/add-category', auth, bookController.addCategory);
app.put('/:id', auth, bookController.UpdateCategiory);
app.delete('/:id', auth, bookController.DeleteCategory);

module.exports = router;

