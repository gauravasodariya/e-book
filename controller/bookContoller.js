const Book = require('../models/book');

async function readBooks(req, res) {
  try {
    let book = await Book.findOne(req.params.id);
    if (user) {
      return res.send(book);
    }
 }catch(err){
    return res.send(err)
 }
}
async function addBooks(req,res){
    try{
        if (req.user.role !== 'author') {
           return res.status(403).json({ msg: 'Not authorized' });
        }
        const bookdata = {
            name : req.body.name,
            user : req.user.id,
            category : req.body.category_name,
        }
        const newBook = new Book(bookData);
        newBook.save();
    }catch(err){
        res.send('Error in adding books')
    }
}
async function updateBook(req, res) {
  try {
    if (req.user.role !== 'author') {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    let book = await User.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    user = await Book.findByIdAndUpdate(req.params.id,req.body);
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
async function deleteBook(req,res){
    try{
         if (req.user.role !== 'author') {
           return res.status(403).json({ msg: 'Not authorized' });
        }
        const book  = await findById(req.params.id)
        if (!book) 
            return res.status(404).json({ msg: 'Book not found' });

        await Book.findByIdAndDelete(req.params.id)
    }catch(err){
        return res.send('Error in deleting books')
    }
}
module.exports = {
  readBooks,
  addBooks,
  updateBook,
  deleteBook
};