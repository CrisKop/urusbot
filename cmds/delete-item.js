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
 if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Uh :c, Necesitas administrador para crear un item.");
  let itemnombre = args.join(" ");
  

  


  


  
  if(!args[0]) return message.channel.send('> **Falta el nombre del item**\n**Uso del comando:** `delete-item <Nombre Del Item>`');
    let itemnombre4 = itemnombre.replace(/\s+/g, ' ').trim();
  let itemnombre5 = itemnombre4.replace(/\s*$/,'');
  let itemnombre2 = await shopdb.get(`${message.guild.id}.${itemnombre5}`);
  




 if(itemnombre2 === undefined) {return message.channel.send('Ese objeto no existe.');
                               }else{
                      message.channel.send('> '+message.author+', Estás seguro que quieres eliminar el objeto "`'+itemnombre5+'`"?\nSi quieres eliminarlo escribe `Si`, si no lo quieres eliminar, escribe `No`')
                                 const filter = m => m.author.id === message.author.id;
const collector = message.channel.createMessageCollector(filter, { time: 30000 });
collector.on('collect', m => {
  if(m.content.toLowerCase() === `si`){
    shopdb.delete(`${message.guild.id}.${itemnombre5}`);

  
  message.channel.send("Item **"+itemnombre5+"** eliminado correctamente.")
   return collector.stop();
  }
  
  if(m.content.toLowerCase() === "no"){
    message.channel.send("Ok, no lo eliminaré :p.")
    return collector.stop();
  }
});
                               }

  
 
}