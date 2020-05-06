require("dotenv").config;
const shoppingListService = require("../src/shopping-list-service");
const knex = require("knex");

describe("Test suite CRUD files", () => {
  let testingDB;
  const testShoppingList = [
    {
      id: 1,
      name: "testName1",
      price: "12.20",
      date_added: new Date(),
      category: "Lunch",
      checked: false
    },
    {
      id: 2,
      name: "testName2",
      price: "15.00",
      date_added: new Date(),
      category: "Main",
      checked: false
    },
    {
      id: 3,
      name: "testName3",
      price: "8.97",
      date_added: new Date(),
      category: "Breakfast",
      checked: false
    },
  ];

  before(() => {
    return testingDB = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => testingDB("shopping_list").truncate());

  afterEach(() => {
    return testingDB("shopping_list").truncate();
  })

  after(() => {
    return testingDB.destroy();
  });

  context("table is populated", () => {
    beforeEach(() => {
      testingDB("shopping_list").truncate();
      return testingDB("shopping_list").insert(testShoppingList);
    });
    it("should return the entire database", () => {
      return shoppingListService.getShoppingList(testingDB)
        .then(actual => {
          expect(actual).to.eql(testShoppingList);
        });
      });
  });

  context("Row already exists", () => {
    const testObj =     {
      id: 1234567,
      name: "insertTest",
      price: "12.20",
      date_added: new Date(),
      category: "Lunch",
      checked: false
    };
    beforeEach(() => {
      testingDB('shopping_list').truncate();
      return testingDB("shopping_list").select('*').insert(testObj)
    });
    it("should insert new row into shopping_list", () => {
      return shoppingListService.updateShoppingList(testingDB, testObj.id, testObj)
        .then(actual => {
          console.log(actual);
          expect(actual).to.be.an('object')
          expect(actual).to.eql(testObj)
        });
    });
  });
  it("should replace existing row with new row", () => {
    const testObj = {
      id: 1234,
      name: "insertTest",
      price: "12.20",
      date_added: new Date(),
      category: "Lunch",
      checked: false
    };
    return shoppingListService.insertShoppingList(testingDB, testObj)
    .then(actual => {
      expect(actual).to.be.an('object')
      expect(actual).to.eql(testObj)
    });
  });
  it("should delete existing row", () => {
    const testObj = {
      id: 2,
      name: "insertTest",
      price: "12.20",
      date_added: new Date(),
      category: "Lunch",
      checked: false
    };
    return shoppingListService.deleteShoppingListItem(testingDB, testObj.id, testObj)
    .then(actual => {
      testingDB('shopping_list').select('*').where(testObj.id);
      expect(actual).to.be.an('undefined')
    });
  });
});