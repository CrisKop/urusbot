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
  
  
  let minerales = {
   "an alga": 2,
        "1 small fish": 5,
        "1 medium fish": 8,
        "1 bug fish": 12,
        "1 puffer fish": 16,
   "1 rare fish": 22,
        "1 toxic fish": 25,
        "1 rainbow fish": 30
      };
  
let usuariocooldown = await cooldowns.get(`${message.guild.id}.${message.author.id}.fish`);
  
  
  if(await cooldowns.get(`${message.guild.id}.${message.author.id}.fish`) === undefined) { 
   
   let minerales1 = ["an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "1 small fish", "1 small fish", "1 small fish", "1 small fish", "1 small fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 puffer fish", "1 puffer fish", "1 puffer fish", "1 puffer fish", "1 puffer fish", "1 rare fish", "1 rare fish", "1 rare fish", "1 rare fish", "1 toxic fish", "1 toxic fish", "1 toxic fish",  "1 rainbow fish"]
     let result222 = Math.floor((Math.random() * minerales1.length));

    let minerales2 = minerales1[result222];
    let minerales3 = minerales[minerales2];
    console.log(minerales3)
    
  let tuObjeto = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto.totalmoney += minerales3
        tuObjeto.cash += minerales3
         tuObjeto.save();
  let timeoutwork = Date.now() + 1200000
let object1 = cooldowns.set(`${message.guild.id}.${message.author.id}.fish`, timeoutwork)

  let object2 = cooldowns.create(`${message.guild.id}.${message.author.id}`, {
    work: "",
   crime: "",
    daily: "",
    mine: "",
    rob: "",
    fish: `${timeoutwork}`
});
  
   
  
   return message.channel.send(new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                         .setColor(0x05d400)
                         .setTimestamp()
                         .setDescription(`You've fished **${minerales2}** and you selled it for <:UrusCOIN:756959373309509783>`+minerales3)
                        );
   
  } else if(Date.now() > usuariocooldown) { 
    let minerales1 = ["an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "an alga", "1 small fish", "1 small fish", "1 small fish", "1 small fish", "1 small fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 medium fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 bug fish", "1 puffer fish", "1 puffer fish", "1 puffer fish", "1 puffer fish", "1 puffer fish", "1 rare fish", "1 rare fish", "1 rare fish", "1 rare fish", "1 toxic fish", "1 toxic fish", "1 toxic fish",  "1 rainbow fish"]
     let result222 = Math.floor((Math.random() * minerales1.length));

    let minerales2 = minerales1[result222];
    let minerales3 = minerales[minerales2];
    console.log(minerales3)
    
  let tuObjeto = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto.totalmoney += minerales3
        tuObjeto.cash += minerales3
         tuObjeto.save();
  let timeoutwork = Date.now() + 1200000
 let tuObjeto2 = await cooldowns.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.fish = Date.now() + 1200000
         tuObjeto2.save();
  
   return message.channel.send(new Discord.RichEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                         .setColor(0x05d400)
                         .setTimestamp()
                         .setDescription(`You've fished **${minerales2}** and you selled it for <:UrusCOIN:756959373309509783>`+minerales3)
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
    return message.channel.send('You can fish again in **'+timeremaing2+'** since you are now tired.');
  
  }
  
  
   
    
    
  }
