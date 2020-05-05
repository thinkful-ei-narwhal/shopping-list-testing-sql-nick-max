const config = require("./config");
require("dotenv");

const knexDB = require("knex")({
  client: "pg",
  version: "7.2",
  connection: "postgresql://localhost/knex-practice",
});

//get all items that contain text
function searchTerm(searchStr) {
  knexDB("shopping_list")
    .select("name").where("name", "ILIKE", `%${searchStr}`)
    .then(res => console.log(res));
}

//The function will query the shopping_list table using Knex methods and select the pageNumber
// page of rows paginated to 6 items per page.

function pageNumber(pageNum) {
  const productsPerPage = 10;
  const offset = productsPerPage * (pageNum - 1);

  knexDB("shopping_list")
    .select("id", "name", "price", "category", "checked", "date_added")
    .limit(productsPerPage)
    .offset(offset)
    .then(result => console.log(result));
}



function itemsAfterDate(daysAgo) {
  knexDB("shopping_list")
    .select("id", "name", "price", "category", "checked", "date_added")
    .where("date_added", ">", knexDB.raw("now() - '?? days':: INTERVAL", daysAgo))
    .then(result => console.log(result));
}



// searchTerm("Bluffalo Wings");
// pageNumber(2);
itemsAfterDate(2);