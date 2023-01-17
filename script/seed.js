"use strict";

const {
  db,
  models: { User, Puppy },
} = require("../server/db");
const axios = require("axios");
const Order = require("../server/db/models/Order");
const Session = require("../server/db/models/Session");

const possibleColors = [
  "brown",
  "white",
  "black",
  "golden",
  "beige",
  "brindle",
  "spotted",
];

const possibleBreeds = [
  "affenpinscher",
  "african",
  "airedale",
  "akita",
  "appenzeller",
  "basenji",
  "beagle",
  "bluetick",
  "borzoi",
  "bouvier",
  "boxer",
  "brabancon",
  "briard",
  "bulldog",
  "bullterrier",
  "cattledog",
  "chihuahua",
  "chow",
  "clumber",
  "cockapoo",
  "collie",
  "coonhound",
  "corgi",
  "dachshund",
  "dalmatian",
  "dane",
  "deerhound",
  "dhole",
  "dingo",
  "doberman",
  "elkhound",
  "entlebucher",
  "eskimo",
  "greyhound",
  "groenendael",
  "havanese",
  "husky",
  "keeshond",
  "kelpie",
  "komondor",
  "kuvasz",
  "labradoodle",
  "labrador",
  "leonberg",
  "lhasa",
  "malamute",
  "malinois",
  "maltese",
  "mastiff",
  "mix",
  "newfoundland",
  "otterhound",
  "ovcharka",
  "papillon",
  "pekinese",
  "pembroke",
  "pinscher",
  "pitbull",
  "pointer",
  "pomeranian",
  "poodle",
  "pug",
  "puggle",
  "pyrenees",
  "redbone",
  "retriever",
  "ridgeback",
  "rottweiler",
  "saluki",
  "samoyed",
  "schipperke",
  "schnauzer",
  "segugio",
  "setter",
  "sharpei",
  "sheepdog",
  "shiba",
  "shihtzu",
  "spaniel",
  "spitz",
  "springer",
  "terrier",
  "tervuren",
  "vizsla",
  "waterdog",
  "weimaraner",
  "whippet",
  "wolfhound",
];

const dogGenerator = async (num) => {
  let dogArray = [];
  while (num > 0) {
    try {
      let breed =
        possibleBreeds[Math.floor(Math.random() * possibleBreeds.length)];
      let color =
        possibleColors[Math.floor(Math.random() * possibleColors.length)];
      let age = Math.floor(Math.random() * 18 + 1);
      let price = Math.floor(Math.random() * 999) + 0.99;
      let description =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      let fullNameData = await axios.get(
        "https://random-data-api.com/api/v2/users"
      );
      let name = fullNameData.data.first_name;
      let fullBreedData = await axios.get(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      let photoURL = fullBreedData.data.message;
      dogArray.push({
        name: name,
        breed: breed,
        color: color,
        age: age,
        description: description,
        photoURL: photoURL,
        price: price,
      });
    } catch (err) {
      console.log("API request failed.");
    }
    num--;
  }
  return dogArray;
};

const userGenerator = async (num) => {
  let userArray = [];
  while (num > 0) {
    try {
      let fullUserData = await axios.get(
        "https://random-data-api.com/api/v2/users"
      );
      let firstName = fullUserData.data.first_name;
      let lastName = fullUserData.data.last_name;
      let password = fullUserData.data.password;
      let username = fullUserData.data.email;
      let isAdmin = Math.random() < 0.2;
      userArray.push({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        isAdmin: isAdmin,
      });
    } catch (err) {
      console.log("API request failed.");
    }
    num--;
  }
  return userArray;
};

const dogsToMake = 50;
const usersToMake = 50;

const dogPromise = dogGenerator(dogsToMake);
const userPromise = userGenerator(usersToMake);

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");

    // Creating Users
    /*const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);*/

    let dogsGenerated = [];
    await dogPromise.then((value) => {
      dogsGenerated = value;
    });

    const dogs = await Promise.all(
      dogsGenerated.map((dog) => {
        return Puppy.create(dog);
      })
    );

    let usersGenerated = [];
    await userPromise.then((value) => {
      usersGenerated = value;
    });

    usersGenerated.push({
      username: "normalUser@gmail.com",
      password: "normal",
      firstName: "Norm",
      lastName: "Alan",
    });

    usersGenerated.push({
      username: "admin@gmail.com",
      password: "admin",
      firstName: "Addie",
      lastName: "Min",
      isAdmin: true,
    });

    const orders = [{ userId: 1, closed: false }];

    const sessions = [
      { orderId: 1, puppyId: 1 },
      { orderId: 1, puppyId: 2 },
    ];

    const users = await Promise.all(
      usersGenerated.map((user) => {
        return User.create(user);
      })
    );

    await Promise.all(
      orders.map((order) => {
        return Order.create(order);
      })
    );

    await Promise.all(
      sessions.map((session) => {
        return Session.create(session);
      })
    );

    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${dogs.length} puppies`);
    console.log(`seeded successfully`);
  } catch (err) {
    console.log("Database connection failed.");
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
