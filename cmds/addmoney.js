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
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need administrator to add money.");
  
    let xde = args.join(" ") || message.author.tag;
  let usuario = message.mentions.members.first() || message.guild.members.find(u => new RegExp(`${xde}`, "gim").test(u.user.tag.toLowerCase())) || message.guild.members.get(args[0]);
    let cantidad1 = args[1];
 
  let guardado;
  if(args[2]) {
  guardado = args[2];
  } else {
  guardado = "cash"
  }
  
  if(!usuario) return message.channel.send("Send the id or mention the user.");
  if(!args[0]) return message.channel.send("Send the id or mention the user.");
  
  if(!cantidad1) return message.channel.send("I need the quantity you want add to **"+ usuario.user.tag+"**");
  
  if(isNaN(cantidad1)) return message.channel.send("Only Numbres") 
  
  if(cantidad1 < 1) return message.channel.send("If you want remove money to someone use the command `removemoney` :p")
   let cantidad = parseFloat(cantidad1);
   let object = moneydb.create(`${message.guild.id}.${usuario.user.id}`, {
    nametag: `${usuario.user.username}#${usuario.user.discriminator}`,
      id: `${usuario.user.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});

  if(guardado === "cash") {
  let tuObjeto = await moneydb.get(`${message.guild.id}.${usuario.user.id}`);
        tuObjeto.totalmoney += cantidad
        tuObjeto.cash += cantidad
         tuObjeto.save();
    return message.channel.send(`Added <:UrusCOIN:756959373309509783>${args[1]} to the **${usuario.user.tag}** cash.`)
  } else if (guardado === "bank"){
      let tuObjeto2 = await moneydb.get(`${message.guild.id}.${usuario.user.id}`);
        tuObjeto2.totalmoney += cantidad
        tuObjeto2.bank += cantidad
         tuObjeto2.save();
     return message.channel.send(`Added <:UrusCOIN:756959373309509783>${args[1]} to the **${usuario.user.tag}** bank`)
  } else if (guardado !== "cash" || "bank") {
   return message.channel.send("You only can add money to cash or bank :)");
  }}