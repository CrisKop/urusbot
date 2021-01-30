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
 
 
  

  
  if(!cantidad1) return message.channel.send("Necesito que me digas cuanto quieres depositar a tu banco");
  
  if(isNaN(cantidad1) && cantidad1 !== "all") return message.channel.send("Los numeros no llevan letras :'p") 
  
  if(cantidad1 < 1) return message.channel.send("No creo que quieras tirar el dinero así 😔")
   let cantidad = parseFloat(cantidad1);
   let object = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
       id: `${message.author.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  
   let cash = await moneydb.get(`${message.guild.id}.${message.author.id}.cash`);
  if(cash === 0) return message.channel.send("No tienes dinero para depositar en tu banco.");
  if(cash < 1) return message.channel.send("No tienes dinero para depositar en tu banco.");
  
  if(cantidad1 === "all") {
     let lol = cash;
  
     let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank += cash
        tuObjeto2.cash -= cash
         tuObjeto2.save();
    return  message.channel.send("He depositado todo tu dinero en el banco exitosamente :p");
  }
   else if(cash < cantidad) {
    let lol = cash;
  
     let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank += cash
        tuObjeto2.cash -= cash
         tuObjeto2.save();
    return  message.channel.send("No tienes tanto dinero en efectivo, pero acabo de depositar todo tu dinero en tu banco :p");
  } else {


      let tuObjeto2 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto2.bank += cantidad
        tuObjeto2.cash -= cantidad
         tuObjeto2.save();
     return message.channel.send(`Depositados <:UrusCOIN:756959373309509783>${cantidad} a tu banco exitosamente.`)
  }
}