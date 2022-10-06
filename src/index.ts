import express, { json, urlencoded } from 'express';
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user";
import postesRouter from './routes/posts';
import voteRouter from './routes/vote'
import { AppDataSource } from './routes/data-sourde';

const app = express();

config()
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/user", userRouter)
app.use('/posts', postesRouter)
app.use("/vote", voteRouter)


app.get('*', (req, res) => {
  res.status(404).json({ message: '404' });
});


app.listen(process.env.port, async () => {
  console.log(`Example app listening on port ${process.env.port}`);

  try {
    await AppDataSource.initialize();
    console.log("connected to the database");
  } catch (error) {
    console.log("conection Not Valid");
    console.log(error);
  }
});
