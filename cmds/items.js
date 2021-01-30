const MeowDB = require("meowdb");
const cooldowns = new MeowDB({
    dir: __dirname,
    name: "../databases/cooldowns"
});
const moneydb = new MeowDB({
    dir: __dirname,
    name: "../databases/money"
});
const shopdb = new MeowDB({
    dir: __dirname,
    name: "../databases/shop"
});
const itemsdb = new MeowDB({
    dir: __dirname,
    name: "../databases/inventory"
});
const moment = require('moment');
exports.run = async(client, message, args, Discord) =>{
  
 let xde = args.join(" ") || message.author.tag;
  let usuario = message.mentions.members.first() || message.guild.members.find(u => new RegExp(`${xde}`, "gim").test(u.user.tag.toLowerCase())) || message.guild.members.get(args[0]);

  if(!usuario) {
  let items = itemsdb.get(`${message.guild.id}.${message.author.id}.items`);
  
  if(items === undefined) return message.channel.send(new Discord.RichEmbed()
                                        .setAuthor("Inventario de "+message.author.tag, message.author.displayAvatarURL)
                                        .setDescription("No hay items...")
                                                     );
 
  
   let datoslol = Object.entries(items)
  let leaderboard = datoslol.map(([_, obj], i) => {
   let rObj = {};
    rObj = `- **${obj.nombre}**\nPrecio: <:UrusCOIN:756959373309509783>${obj.precio}\n`
   return rObj;
});
  
   
   const tiendaembed = new Discord.RichEmbed()
                     .setAuthor("Inventario de "+message.author.tag, message.author.displayAvatarURL)
   .setDescription(`${leaderboard.join('\n')}`)
   .setColor(0x24caf0)
  return message.channel.send(tiendaembed);
    
  
  } else {
    
    
    
    
      let items = itemsdb.get(`${message.guild.id}.${usuario.user.id}.items`);
  
  if(items === undefined) return message.channel.send(new Discord.RichEmbed()
                                        .setAuthor("Inventario de "+usuario.user.tag, usuario.user.displayAvatarURL)
                                        .setDescription("No hay items...")
                                                     );
 
  
   let datoslol = Object.entries(items)
  let leaderboard = datoslol.map(([_, obj], i) => {
   let rObj = {};
     rObj = `- **${obj.nombre}**\nPrecio: <:UrusCOIN:756959373309509783>${obj.precio}\n`
   return rObj;
});
  
   
   const tiendaembed = new Discord.RichEmbed()
                     .setAuthor("Inventario de "+usuario.user.tag, usuario.user.displayAvatarURL)
   .setDescription(`${leaderboard.join('\n')}`)
  return message.channel.send(tiendaembed);
  }
}