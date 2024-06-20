import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';
import { sequelize } from './db';

dotenv.config();

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.use(cors());
app.use(express.json());

//подключаем роутеры
app.use('/api', router);

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

async function startServer() {
  try {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

startServer();