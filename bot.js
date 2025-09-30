const TelegramBot = require('node-telegram-bot-api');

// Bot token - in production, use environment variables
const token = process.env.TELEGRAM_BOT_TOKEN || '8469336788:AAF-qIRDnk43b5uoiA48klDiAa5T67hYNDQ';

// Create bot instance with polling
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Chat Bot Tunduk is starting...');

// /start command handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'User';
    
    const welcomeMessage = `
🇰🇬 Добро пожаловать в Chat Bot Tunduk!

Привет, ${firstName}! Я помогу вам с государственными услугами Кыргызстана.

Доступные команды:
/help - Показать справку
/services - Список услуг

Просто напишите ваш вопрос!
    `;
    
    bot.sendMessage(chatId, welcomeMessage);
    console.log(`New user: ${firstName} (${chatId})`);
});

// /help command handler
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
📋 Справка по Chat Bot Tunduk

Команды:
• /start - Начать работу
• /help - Эта справка
• /services - Государственные услуги

💬 Напишите любой вопрос о государственных услугах!
    `;
    
    bot.sendMessage(chatId, helpMessage);
});

// /services command handler
bot.onText(/\/services/, (msg) => {
    const chatId = msg.chat.id;
    
    const servicesMessage = `
🏛️ Государственные услуги:

📄 Документы и справки
🏢 Бизнес услуги  
👥 Социальные услуги
💰 Налоги и платежи

Для получения информации напишите название услуги.
    `;
    
    bot.sendMessage(chatId, servicesMessage);
});

// Handle all other messages
bot.on('message', (msg) => {
    // Skip commands
    if (msg.text && msg.text.startsWith('/')) {
        return;
    }
    
    const chatId = msg.chat.id;
    const messageText = msg.text;
    
    if (messageText) {
        console.log(`Message from ${chatId}: ${messageText}`);
        
        // Simple response - will be replaced with AI
        const response = `
Получено: "${messageText}"

🤖 Базовая версия бота активна.
Скоро добавим ИИ для лучших ответов!

Попробуйте команды:
/services - Услуги
/help - Справка
        `;
        
        bot.sendMessage(chatId, response);
    }
});

// Error handling
bot.on('error', (error) => {
    console.error('Bot error:', error);
});

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('✅ Chat Bot Tunduk is ready!');

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('🛑 Stopping bot...');
    bot.stopPolling();
    process.exit();
});