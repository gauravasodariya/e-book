const express = require('express');
const app = express()
const commentController = require('../../controller/commentController');

router.get('/:id', commentController.readsComment);
router.post('/add-comment',commentController.addComment);
router.put('/:id',commentController.UpdateComment);
router.delete('/:id',commentController.DeleteComment);

module.exports = router;

