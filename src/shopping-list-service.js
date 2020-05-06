module.exports = {
  getShoppingList(db) {
    //get all
    return db("shopping_list").select();
  },

  insertShoppingList(db, id) {
    //add item
    return db("shopping_list").select();
  },

  updateShoppingList(db, id, newItem) {
   //edit 
    return db("shopping_list").where({id}).update(newItem)
  },

  deleteShoppingListItem(db, id) {
    return db("shopping_list").where()
  },
  getById(db, id){
    return db("shopping_list").select('*').where('id', id).first();
  }
};