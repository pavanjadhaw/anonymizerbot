const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const config = require('./config.js');

const keyboard = Markup.inlineKeyboard([
	Markup.callbackButton('Delete', 'delete'),
]);

const help =
	`Welcome to @anonomiserBot\n\n` +
	`Forward any message, photos, files, etc. to this bot.\n` +
	`The bot will reply your message, without any indication where this message is from.\n` +
	`When forwarding it to everywhere you want, nobody will know the origin or original caption.`;

const bot = new Telegraf(config.botApiKey);
bot.start(ctx => ctx.reply(help));
bot.help(ctx => ctx.reply(help));
bot.on('message', ctx =>
	ctx.telegram.sendCopy(ctx.from.id, ctx.message, Extra.markup(keyboard))
);
bot.action('delete', ({ deleteMessage }) => deleteMessage());
bot.startPolling();
