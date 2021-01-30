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
  if(args[0]) return;
  let object = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
      id: `${message.author.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  
let usuariocooldown = await cooldowns.get(`${message.guild.id}.${message.author.id}.work`);
  
  
  if(await cooldowns.get(`${message.guild.id}.${message.author.id}.work`) === undefined) { 
   
       let sumademoney = [8, 9, 10, 11, 12];
     let result222 = Math.floor((Math.random() * sumademoney.length));
     let cantidad = parseFloat(sumademoney[result222]);

  let tuObjeto = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto.totalmoney += cantidad
        tuObjeto.cash += cantidad
         tuObjeto.save();
  let timeoutwork = Date.now() + 3600000
  let object1 = cooldowns.set(`${message.guild.id}.${message.author.id}.work`, timeoutwork)
  let object2 = cooldowns.create(`${message.guild.id}.${message.author.id}`, {
    work: `${timeoutwork}`,
   crime: "",
    daily: "",
    mine: "",
    rob: ""
});
  
   return message.channel.send(new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                         .setColor(0x05d400)
                         .setTimestamp()
                         .setDescription(`Thanks to your hard work you have won <:UrusCOIN:756959373309509783>`+sumademoney[result222])
                        );
   
  } else if(Date.now() > usuariocooldown) { 
    let sumademoney = [8, 9, 10, 11, 12];
     let result222 = Math.floor((Math.random() * sumademoney.length));
     let cantidad = parseFloat(sumademoney[result222]);
    
  let tuObjeto = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto.totalmoney += cantidad
        tuObjeto.cash += cantidad
         tuObjeto.save();
  let timeoutwork = Date.now() + 3600000
 let tuObjeto2 = await cooldowns.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.work = Date.now() + 3600000
         tuObjeto2.save();
  
   return message.channel.send(new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                         .setColor(0x05d400)
                         .setTimestamp()
                         .setDescription(`Thanks to your hard work you have won <:UrusCOIN:756959373309509783>`+sumademoney[result222])
                        );
  } else if(Date.now() < usuariocooldown) {
        const Duration = require('humanize-duration');
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
    return message.channel.send('You can work again in **'+timeremaing2+'**. ;)');
  }
  
  
   
    
    
  }
