const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
 
  try {
    const newPostData = await Post.create({
      // ... is "destructuring" allows for addition of an object to an existing object
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// '/:id' = placeholder, allows in the url of insomnia to use any value 1, 2, 3...etc to test use id generated with create post route in insomnia this will show if delete route is functioning it should delete the post with that "id"
router.delete('/:id',withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
