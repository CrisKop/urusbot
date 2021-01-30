const MeowDB = require("meowdb");
const cooldowns = new MeowDB({
    dir: __dirname,
    name: "../databases/cooldowns"
});
const moneydb = new MeowDB({
    dir: __dirname,
    name: "../databases/money"
});
const moment = require('moment');
exports.run = async(client, message, args, Discord) =>{
  let xde = args.join(" ") || message.author.tag;
  let usuario = message.mentions.members.first() || message.guild.members.find(u => new RegExp(`${xde}`, "gim").test(u.user.tag.toLowerCase())) || message.guild.members.get(args[0]);
  
  if(!usuario){
  let object = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
    id: `${message.author.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  
  let usuariototalmoney = await moneydb.get(`${message.guild.id}.${message.author.id}.totalmoney`);
  let usuariobank = await moneydb.get(`${message.guild.id}.${message.author.id}.bank`);
  let usuariocash = await moneydb.get(`${message.guild.id}.${message.author.id}.cash`);
  
 return message.channel.send(new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                             .addField('Efectivo:', `<:UrusCOIN:756959373309509783> ${usuariocash}`, true)
                             .addField('Banco:', `<:UrusCOIN:756959373309509783> ${usuariobank}`, true)
                             .addField('Total:', `<:UrusCOIN:756959373309509783> ${usuariototalmoney}`, true)
                             .setTimestamp()
                             .setColor(0x24caf0)
                             );
  } else {
    
    if(usuario.user.bot) return message.channel.send('Los bots no tienen dinero :p');
    
    
     let object = moneydb.create(`${message.guild.id}.${usuario.user.id}`, {
    nametag: `${usuario.user.username}#${usuario.user.discriminator}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  
  let usuariototalmoney = await moneydb.get(`${message.guild.id}.${usuario.user.id}.totalmoney`);
  let usuariobank = await moneydb.get(`${message.guild.id}.${usuario.user.id}.bank`);
  let usuariocash = await moneydb.get(`${message.guild.id}.${usuario.user.id}.cash`);
  
 return message.channel.send(new Discord.RichEmbed()
                        .setAuthor(usuario.user.tag, usuario.user.displayAvatarURL)
                             .addField('Efectivo:', `<:UrusCOIN:756959373309509783> ${usuariocash}`, true)
                             .addField('Banco:', `<:UrusCOIN:756959373309509783> ${usuariobank}`, true)
                             .addField('Total:', `<:UrusCOIN:756959373309509783> ${usuariototalmoney}`, true)
                             .setTimestamp()
                             .setColor(0x24caf0)
                             );
  }
  
}