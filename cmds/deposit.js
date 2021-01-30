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
 
 
  

  
  if(!cantidad1) return message.channel.send("How much you want deposit to your bank?");
  
  if(isNaN(cantidad1) && cantidad1 !== "all") return message.channel.send("Only numbers :'p") 
  
  if(cantidad1 < 1) return message.channel.send("You cant bug this lol 😔")
   let cantidad = parseFloat(cantidad1);
   let object = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
       id: `${message.author.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  
   let cash = await moneydb.get(`${message.guild.id}.${message.author.id}.cash`);
  if(cash === 0) return message.channel.send("You dont have enough cash .");
  if(cash < 1) return message.channel.send("You dont have cash.");
  
  if(cantidad1 === "all") {
     let lol = cash;
  
     let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank += cash
        tuObjeto2.cash -= cash
         tuObjeto2.save();
    return  message.channel.send("I deposited all your cash to your bank :p");
  }
   else if(cash < cantidad) {
    let lol = cash;
  
     let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank += cash
        tuObjeto2.cash -= cash
         tuObjeto2.save();
    return  message.channel.send("You dont have enough cash but i deposited all your cash to your bank");
  } else {


      let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank += cantidad
        tuObjeto2.cash -= cantidad
         tuObjeto2.save();
     return message.channel.send(`Deposited <:UrusCOIN:756959373309509783>${cantidad} to your bank.`)
  }
}