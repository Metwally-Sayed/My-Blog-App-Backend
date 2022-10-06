import { Router } from "express"
import { userInfo } from "os";
import { User } from "../entities/User";

const router = Router();



router.get("/", async (req, res) => {
  const users = await User.find()
  res.json({ data: users })
})


router.post("/", async (req, res) => {
  const { firstname, lastname, email, } = req.body

  try {
    const respond = await User.create({
      firstname,
      lastname,
      email
    });
    await respond.save()
    res.json({ "mes": respond })
  } catch (error) {
    res.json({ msg: "server is down" })
  }

})

router.get("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const user = await User.findOne({
      where: { id },
      relations: { posts: true },
    });

    if (!user) {
      return res.status(404).json({ msg: "user not found" })
    }

    res.json({ data: user })
  } catch (error) {
    res.status(500).json({ mesg: error })
  }
})


router.delete("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const user = await User.delete(id);
    res.json({ data: user })
  } catch (error) {
    res.status(500).json({ mesg: error })
  }
})



export default router;