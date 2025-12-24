const express = require('express');
const app = express()
const bookController = require('../../controller/bookController');

router.get('/:id', auth, bookController.readsBooks);
router.post('/add-book', auth, bookController.addBooks);
router.put('/:id', auth, bookController.UpdateBooks);
router.delete('/:id', auth, bookController.DeleteBooks);

module.exports = router;

