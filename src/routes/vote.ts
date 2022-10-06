import { Router } from "express"
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";




const router = Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findOne({ where: { id: +id } })
    if (!post) {
      return res.status(404).json({ msg: "not found" })
    }
    const { userId, value } = req.body
    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      return res.status(404).json({ msg: "not found" })
    }
    const vote = Vote.create({ user, post, value })
    await vote.save()
    res.json({ vote })


  } catch (error) {
    console.log(error);

    res.json({ msg: "server is down" })
  }
}
)
export default router;