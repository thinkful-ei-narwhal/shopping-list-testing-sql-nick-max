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

searchTerm("Bluffalo Wings");