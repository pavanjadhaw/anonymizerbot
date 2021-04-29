const { Telegraf } = require('telegraf');

const help =
  `Welcome to @anonomiserBot\n\n` +
  `Forward any message, photos, files, etc. to this bot.\n` +
  `The bot will reply your message, without any indication where this message is from.\n` +
  `When forwarding it to everywhere you want, nobody will know the origin or original caption.`;

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply(help));
bot.help(ctx => ctx.reply(help));

bot.on('message', async ctx => {
  try {
    await ctx.telegram.sendCopy(ctx.from.id, ctx.message);
  } catch (error) {
    console.error(error);
  }
});

bot.launch();
bot.catch(error => console.error(error));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
