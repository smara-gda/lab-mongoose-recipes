const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // return Recipe.create({
    //   title: 'Asian Glazed Chicken Thighs',
    //   level: 'Amateur Chef',
    //   ingredients: [
    //     '1/2 cup rice vinegar',
    //     '5 tablespoons honey',
    //     '1/3 cup soy sauce (such as Silver Swan®)',
    //     '1/4 cup Asian (toasted) sesame oil',
    //     '3 tablespoons Asian chili garlic sauce',
    //     '3 tablespoons minced garlic',
    //     'salt to taste',
    //     '8 skinless, boneless chicken thighs'
    //   ],
    //   cuisine: 'Asian',
    //   dishType: 'main_course',
    //   image:
    //     'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    //   duration: 40,
    //   creator: 'Chef LePapu'
    // });
    return Recipe.create(data);
  })
  .then((recipe) => {
    // return Recipe.findOneAndUpdate(
    //   { title: 'Rigatoni alla Genovese' },
    //   { duration: 100 }
    // );
    // return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then((data) => {
    console.log('You deleted the recipe');
    // for (let k of recipe) {
    //   console.log(k.title);
    // }
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Connection closed!');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
