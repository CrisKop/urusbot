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
    let cantidad1 = args[0];
 
 
  

  
  if(!cantidad1) return message.channel.send("How many money you want withdraw?");
  
  if(isNaN(cantidad1) && cantidad1 !== "all") return message.channel.send("Only numbers :'p") 
  
  if(cantidad1 < 1) return message.channel.send("You cant bug this lol :p")
   let cantidad = parseFloat(cantidad1);
   let object = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
       id: `${message.author.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  
   let bank = await moneydb.get(`${message.guild.id}.${message.author.id}.bank`);
  if(bank === 0) return message.channel.send("You dont have money in your bank to withdraw");
  if(bank < 1) return message.channel.send("You dont have money in your bank to withdraw.");
  
  if(cantidad1 === "all") {
     let lol = bank;
  
     let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank -= bank
        tuObjeto2.cash += bank
         tuObjeto2.save();
    return  message.channel.send("I withdrawn all your money to your cash :p");
  }
   else if(bank < cantidad) {
    let lol = bank;
  
     let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank -= bank
        tuObjeto2.cash += bank
         tuObjeto2.save();
    return  message.channel.send("You dont have enough money, but i withdraw all your money :p");
  } else {


      let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank -= cantidad
        tuObjeto2.cash += cantidad
         tuObjeto2.save();
     return message.channel.send(`Withdrawn <:UrusCOIN:756959373309509783>${cantidad} of your bank correctly.`)
  }
}