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
const moment = require('moment');
exports.run = async(client, message, args, Discord) =>{
  let items = shopdb.get(message.guild.id);
  
  if(items === undefined) return message.channel.send(new Discord.RichEmbed()
                                        .setAuthor("Shop of "+message.guild.name, message.guild.iconURL)
                                        .setDescription("Nothing here...")
                                                     );
  const tiendaembed = new Discord.RichEmbed()
                     .setAuthor("Shop of "+message.guild.name, message.guild.iconURL)
  .setColor(0x24caf0)
  
   let datoslol = Object.entries(items)
  let leaderboard = datoslol.map(([_, obj], i) => {
   let rObj = {};
    rObj = tiendaembed.addField(`<:UrusCOIN:756959373309509783>${obj.precio} - ${obj.nombre}`, `${obj.descripcion}`);
   return rObj;
});
  
   
  return message.channel.send(tiendaembed);
  
  
}