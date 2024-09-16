require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Options, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
     ],
});

let status = [
  {
    name: 'try !help',
      type: ActivityType.Streaming,
      url: 'https://www.twitch.tv/bkkpro1980',
  }, {
    name: 'try !rules',
      type: ActivityType.Streaming,
      url: 'https://www.twitch.tv/bkkpro1980',
  }, {
    name: 'try applications',
      type: ActivityType.Streaming,
      url: 'https://www.twitch.tv/bkkpro1980',
  },
]

client.on('ready', (c) => {
    console.log(`🟢 ${c.user.tag} is online.`);

    setInterval(() => {
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random]);
    }, 15000);
});

client.on('interactionCreate', async (interaction) => {
    try {
      if (!interaction.isButton()) return;
      await interaction.deferReply({ ephemeral: true });
  
      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        interaction.editReply({
          content: "I couldn't find that role.",
        });
        return;
      }
  
      const hasRole = interaction.member.roles.cache.has(role.id);
  
      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
      }
  
      await interaction.member.roles.add(role);
      await interaction.editReply(`The role ${role} has been added.`);
    } catch (error) {
      console.log(error);
    }
  });

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    
    if (message.content === 'hi') {
        message.reply('Hello!');
    }
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    
    if (message.content === '!rules') {
      const staff = message.member.roles.cache.has('1284751544167956564');
      
      if (!staff) {
        console.log('Not Staff.')
        return;
      }
      
      const embed = new EmbedBuilder()
        .setTitle('<:Guidelines:1284879379612176455> Server Rules')
        .setDescription(`Please note that the rules listed below are an abridged version of the full list of rules, and may not contain everything.
        
        No NSFW content or gore.
        
        Be respectful to all members.
        
        Don't spam or be annoying.
        
        Only speak in English.
        
        Do not post malicious content.
        
        No NSFW or unpingable profiles.
        
        No advertising.
        
        Don't bypass automod.
        
        Don't use loopholes.
        
        Follow Discord's Terms of Service and Community Guidelines.
        
        :link: Discord's Terms of service [here](<https://discord.com/terms>)
        
        :link: View the full set of rules [here](<https://docs.google.com/document/d/1KQt4l3ePOdhV4IDVpZbR1C963vgL62Q4HdS4lcc2myU/edit?usp=sharing>)
        
        Any unlisted NBTF discord rules apply to this server.`)
        .setImage('https://raw.githubusercontent.com/bkkpro1980/public/main/AnimatedBanner-Cropped.gif')
        .setThumbnail('https://raw.githubusercontent.com/bkkpro1980/public/main/GroupIcon-CircleCropped.png')
        .setColor(0x0096FF)

        message.channel.send({embeds: [embed] });
    }
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    
    const staff = message.member.roles.cache.has('1206132762839621662');
      
      if (!staff) {
        console.log('Not Staff.')
        return;
      }

    if (message.content === '!help') {
        const embed = new EmbedBuilder()
        .setTitle('Help')
        .setDescription(`**Prefix:** !
        **Commands: **
        !help 
        !applications 
        !rules`)
        
        message.channel.send({embeds: [embed] });
    }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
      return;
  }

  const staff = message.member.roles.cache.has('1206132762839621662');
      
      if (!staff) {
        console.log('Not Staff.')
        return;
      }
  
  if (message.content === '!applications') {
      const embed = new EmbedBuilder()
      .setTitle('Applications')
      .setDescription(`Staff Application: -
        There are no applications open ATM.`)
      
      message.channel.send({
        embeds: [embed],
      });
  }
});

client.login(process.env.TOKEN);
