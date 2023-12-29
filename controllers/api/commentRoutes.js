const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/',withAuth, async (req, res) => {
  try {
    const newCommentData = await Comment.create({
      // ... is "destructuring" allows for addition of an object to an existing object
      ...req.body,
      user_id: req.session.user_id,
      // for testing use post_id: "1, 2, 3 etc" the number inserted here will be associated with the new comment created and getting that comment once created will require matching the id: in the get post to the number inserted here, (id: inserted here)
    //   post_id: 2; keep post_id: "2" in insomnia then leave it blank here to allow for more testing and integration to the front end insuring the post_id will have a value to reference.
    });
    res.status(200).json(newCommentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// '/:id' = placeholder, allows in the url of insomnia to use any value 1, 2, 3...etc to test use id generated with create post route in insomnia this will show if delete route is functioning it should delete the comment with that "id"
router.delete('/:id',withAuth, async (req, res) => {
    try {
      console.log("hello")
      const newCommentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!newCommentData) {
        res.status(404).json({ message: 'No commnent found with this id!' });
        return;
      }
  
      res.status(200).json(newCommentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
