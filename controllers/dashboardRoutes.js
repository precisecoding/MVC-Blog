const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// this route renders hompage handlebars via post
router.get('/', withAuth, async (req, res) => {
  try {
    
    // Get all posts for the user and JOIN with user
    const postData = await Post.findAll({
     where: {
        user_id: req.session.user_id,
     }
    });
    // Serialize data so the template can read it, which means converting back to pain javascript object from the JSON format.
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
    // res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
