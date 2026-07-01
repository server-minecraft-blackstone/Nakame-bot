const {
    Client,
    GatewayIntentBits,
    PermissionsBitField
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ⚠️ Remplace par ton NOUVEAU token
const TOKEN = "token";

// ID du salon de bienvenue
const WELCOME_CHANNEL = "1392870337733197898";

// =======================
// BOT PRÊT
// =======================

client.once("clientReady", () => {
    console.log(`✅ ${client.user.tag} connecté !`);
});

// =======================
// BIENVENUE
// =======================

client.on("guildMemberAdd", async (member) => {

    console.log(`${member.user.tag} a rejoint ${member.guild.name}`);

    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL);

    if (!channel) {
        return console.log("❌ Salon de bienvenue introuvable.");
    }

    const permissions = channel.permissionsFor(member.guild.members.me);

    if (
        !permissions.has(PermissionsBitField.Flags.ViewChannel) ||
        !permissions.has(PermissionsBitField.Flags.SendMessages)
    ) {
        return console.log("❌ Le bot n'a pas la permission d'envoyer des messages.");
    }

    try {
        await channel.send(
`👋 Bienvenue ${member} !

Nous sommes ravis de t'accueillir sur **${member.guild.name}** 🎉

Passe un bon moment parmi nous ❤️`
        );

        console.log("✅ Message de bienvenue envoyé.");

    } catch (err) {
        console.error("Erreur :", err);
    }

});

// =======================
// MESSAGES
// =======================

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    const contenu = message.content.toLowerCase();

    if (contenu.includes("67")) {

        await message.delete().catch(() => {});

        const msg = await message.channel.send(
            `${message.author}, merci de ne pas envoyer ce message.`
        );

        setTimeout(() => {
            msg.delete().catch(() => {});
        }, 5000);

        return;
    }

    if (
        contenu.includes("free palestine") ||
        contenu.includes("free palestien")
    ) {
        message.reply("❤️ Je t'aime ❤️");
    }

});

client.login(TOKEN);