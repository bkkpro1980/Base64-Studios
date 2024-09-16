require('dotenv').config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: '1192798860674871296',
    label: 'Facility Personnel',
  },
  {
    id: '1192799033786376252',
    label: 'Non-Facility',
  },
  {
    id: '1192806374816628828',
    label: 'Civillian',
  },
];

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1205887927574331443');
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: 'Claim or remove (a) role(s) below.',
      components: [row],
    });
console.log('Sent successfully!')

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);