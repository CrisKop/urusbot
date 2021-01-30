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
const Duration = require('humanize-duration');
exports.run = async(client, message, args, Discord) =>{
  if(args[0]) return;
  let object = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
    id: `${message.author.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  
let usuariocooldown = await cooldowns.get(`${message.guild.id}.${message.author.id}.daily`);
  
  
  if(await cooldowns.get(`${message.guild.id}.${message.author.id}.daily`) === undefined) { 
   
       let sumademoney = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
     let result222 = Math.floor((Math.random() * sumademoney.length));
    let cantidad = parseFloat(sumademoney[result222]);
    
  let tuObjeto = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto.totalmoney += cantidad
        tuObjeto.cash += cantidad
         tuObjeto.save();
  let timeoutwork = Date.now() + 86400000
  let object1 = cooldowns.set(`${message.guild.id}.${message.author.id}.daily`, timeoutwork)
  let object2 = cooldowns.create(`${message.guild.id}.${message.author.id}`, {
    work: "",
   crime: "",
    daily: `${timeoutwork}`,
    mine: "",
    rob: ""
});
  
   return message.channel.send(new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                         .setColor(0x05d400)
                         .setTimestamp()
                         .setDescription(`I gived you bonus money because you worked so good today! You received <:UrusCOIN:756959373309509783>`+sumademoney[result222])
                        );
   
  } else if(Date.now() > usuariocooldown) { 
     let sumademoney = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
     let result222 = Math.floor((Math.random() * sumademoney.length));
 let cantidad = parseFloat(sumademoney[result222]);
  let tuObjeto = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto.totalmoney += cantidad
        tuObjeto.cash += cantidad
         tuObjeto.save();
  let timeoutwork = Date.now() + 86400000
 let tuObjeto2 = await cooldowns.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.daily = Date.now() + 86400000
         tuObjeto2.save();
  
   return message.channel.send(new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                         .setColor(0x05d400)
                         .setTimestamp()
                          .setDescription(`I gived you bonus money because you worked so good today! You received <:UrusCOIN:756959373309509783>`+sumademoney[result222])
                        );
  } else if(Date.now() < usuariocooldown) {
    const shortSpanishHumanizer = Duration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      h: () => 'hrs',
      m: () => 'mins',
      s: () => 'segs'
    }
  }
})
    let timeremaing2 = shortSpanishHumanizer(usuariocooldown - Date.now(), { round: true });
    return message.channel.send('You can receive the daily money in **'+timeremaing2+'**');
  }
  
  
   
    
    
  }
