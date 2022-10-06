import { Router } from 'express';
import { Post } from '../entities/Post';
import { Comment } from '../entities/Comment';
import { User } from '../entities/User';
import { Vote } from '../entities/Vote';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({
      relations: { user: true, comment: true, votes: true },
    });

    const postsData = posts.map((post) => {
      return {
        ...post,
        totalVoteUp: post.votes.filter((vote) => +vote.value === 1).length,
        totalVoteDown: post.votes.filter((vote) => +vote.value === -1).length,
      };
    });
    const postData = await Vote.find({ relations: { user: true, post: true } });

    res.json({
      data: postsData,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    const user = await User.findOne({
      where: { id: +userId },
      relations: { posts: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    const post = Post.create({
      title,
      body,
      user,
    });

    await post.save();
    res.json({ data: post });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    const post = await Post.findOne({
      where: { id },
      relations: { user: true, comment: true, votes: true },
    });

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }
    res.json({ data: post });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    const posts = await Post.delete(id);
    res.json({ data: posts });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:id/comment', async (req, res) => {
  const { id } = req.params;
  try {
    const { body, userId } = req.body;

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    const post = await Post.findOne({
      where: { id: +id },
    });

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    const comment = Comment.create({
      body,
      user,
      post,
    });

    await comment.save();
    res.json({ data: comment });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
