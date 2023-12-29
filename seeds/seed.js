const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
// below changed projectData to post
const postData = require('./postData.json');

const commentData = require('./commentData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
// connects data "fields or columns" from postData.json, then including user_id: in the .create() method assigns the connected data fields or columns from postData.json to the user_id:
  for (const post of postData) {
    // for(const post of postData) ({post}) "for off loop"-> returns the data fields in the brackets sequencially in order 1, 2, 3, etc. the object variable "...post" selects all fields inside of the starting/ending curly brackets of the the postData.json file which is stored in variable, "postData". example of "for off loop", for (const x of y) {await Modelelement.method({...post,}) 
    await Post.create({
      ...post,
      // math.floor(()) assigns a random number to the user_id
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
