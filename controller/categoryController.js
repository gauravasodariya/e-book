const Category = require('../models/category');

async function readCategory(req,res) {
  try {
    let category = await Category.find()
    if (category) {
      return res.send(category);
    }
 }catch(err){
    return res.send(err)
 }
}
async function addCategory(req,res){
    try{
         if (req.user.role !== 'admin') {
           return res.status(403).json({ msg: 'Not authorized' });
    }
        const CategoryData = {
            category_name : req.body.name,            
        }
        const newCategory = new Book(categoryData);
        newCategory.save();
    }catch(err){
        res.send('Error in adding books')
    }
}
async function updateCategory(req, res) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    let book = await User.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'category not found' });

    category = await Category.findByIdAndUpdate(req.params.id,req.body);
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
async function deleteCategory(req,res){
    try{
         if (req.user.role !== 'author') {
           return res.status(403).json({ msg: 'Not authorized' });
        }
        const category  = await findById(req.params.id)
        if (!category) 
            return res.status(404).json({ msg: 'category not found' });

        await Book.findByIdAndDelete(req.params.id)
    }catch(err){
        return res.send('Error in deleting category')
    }
}
module.exports = {
  readCategory,
  addCategory,
  updateCategory,
  deleteCategory
};