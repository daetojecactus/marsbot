import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import Node from '../models/nodeModel';

//для получения токена из .env
dotenv.config();

//токен
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Telegram bot token not found in environment variables.');
  process.exit(1);
}

//инициализация бота
const bot = new TelegramBot(token, { polling: true });

//обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = 'Привет! Чем могу помочь?';
  bot.sendMessage(chatId, welcomeMessage);
});

//обработчик текстовых сообщений
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    //ищем узел в бд по тексту сообщения и типу question
    const node: any = await Node.findOne({
      where: {
        text,
        type: 'question',
        parentId: null, //уточнение по отсутствию родительского узла
      },
    });

    if (node) {
      //усли нашли узел то получаем его дочерние узлы
      const children: any[] = await Node.findAll({
        where: { parentId: node.id },
      });

      if (children.length > 0) {
        const reply = children.map((child) => child.text).join('\n');
        bot.sendMessage(chatId, reply);
      } else {
        bot.sendMessage(chatId, 'Ошибка дочерних элементов.');
      }
    } else {
      //если узел не найден то отправляем сообщение об ошибке
      bot.sendMessage(chatId, 'Ваш запрос не понятен.');
    }
  } catch (error) {
    console.error('Error processing message:', error);
    bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
  }
});

export default bot;
