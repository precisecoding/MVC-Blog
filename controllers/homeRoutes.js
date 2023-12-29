const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// this route renders hompage handlebars via post
router.get('/', async (req, res) => {
  try {
    
    // Get all posts for the user and JOIN with user data, use attributes to return only username
    const postData = await Post.findAll({
      include: [
        {
          model: User, 
          attributes: ['username'],
        },
      ],
    });
    // Serialize data so the template can read it, which means converting back to pain javascript object from the JSON format.
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
    // res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /:id acts as a placeholder allowing post.id in the homepage.handlebars file to route here.
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User, 
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });
    // comment out below and uncomment res.status for testing in insomnia when wanting to see the data as json
    // when rendering data from post using destructuring to utilize with handlebars use format below as ...post then in hanldebars file must use {{comment or title or date etc}} instead of post.comment or post.title. *If your not using destructuring then you must use {{post.comment or post.title or post.data etc}} in the handlebars file
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
    // res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      // attributes: { exclude: ['password'] }, this returns all the values except for the password
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
