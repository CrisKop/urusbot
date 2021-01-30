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
 
 
  

  
  if(!cantidad1) return message.channel.send("Necesito que me digas cuanto quieres retirar de tu banco");
  
  if(isNaN(cantidad1) && cantidad1 !== "all") return message.channel.send("Los numeros no llevan letras :'p") 
  
  if(cantidad1 < 1) return message.channel.send("Eso que intentas es ilegal para mi :p")
   let cantidad = parseFloat(cantidad1);
   let object = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
       id: `${message.author.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  
   let bank = await moneydb.get(`${message.guild.id}.${message.author.id}.bank`);
  if(bank === 0) return message.channel.send("No tienes dinero para retirar a efectivo.");
  if(bank < 1) return message.channel.send("No tienes dinero para retirar a efectivo.");
  
  if(cantidad1 === "all") {
     let lol = bank;
  
     let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank -= bank
        tuObjeto2.cash += bank
         tuObjeto2.save();
    return  message.channel.send("He retirado todo tu dinero exitosamente :p");
  }
   else if(bank < cantidad) {
    let lol = bank;
  
     let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank -= bank
        tuObjeto2.cash += bank
         tuObjeto2.save();
    return  message.channel.send("No tienes tanto dinero en efectivo, pero acabo de retirar todo tu dinero :p");
  } else {


      let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank -= cantidad
        tuObjeto2.cash += cantidad
         tuObjeto2.save();
     return message.channel.send(`Retirados <:UrusCOIN:756959373309509783>${cantidad} de tu banco exitosamente.`)
  }
}