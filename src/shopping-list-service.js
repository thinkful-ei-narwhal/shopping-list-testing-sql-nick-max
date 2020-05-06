module.exports = {
  getShoppingList(db) {
    //get all
    return db("shopping_list").select();
  },
  insertShoppingList(db, newItem) {
    //add item
    //return db("shopping_list").select('*').insert(newItem);
    return db.insert(newItem).into('shopping_list').returning('*').then(rows => rows[0]);
  },
  updateShoppingList(db, id, newItem) {
    return db("shopping_list").where({id}).update(newItem).returning('*').then(rows => rows[0]);
  },
  deleteShoppingListItem(db, id) {
    return db("shopping_list").where({id}).del();
  },
  getById(db, id){
    return db("shopping_list").select('*').where({id}).first();
  }
};