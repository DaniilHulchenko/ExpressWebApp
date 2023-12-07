const { Router } = require('express')
const Posts = require('../models/posts')
const router = Router()

router.get('/', async (req, res) => {
  const posts = await Posts.find({}).lean()
    res.render('index', {
      title: 'Posts list',
      isIndex: true,
      posts
    })
  })

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create post',
    isCreate: true
  })
})

router.post('/create', async (req, res) => {
  const post = new Posts({
    title: req.body.title
  })

  await post.save()
  res.redirect('/')
})

router.post('/like', async (req, res) => {
  const post = await Posts.findById(req.body.id)

  post.liked = !! req.body.liker
  await post.save()

  // res.redirect('/')
})

router.post('/delete', async (req, res) => {
  try {
    await Posts.findByIdAndDelete(req.body.id);
    res.redirect('/');
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router