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
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Uh :c, Necesitas administrador para crear un item.");
   let xde = args.join(" ") || message.author.tag;
  let usuario = message.mentions.members.first() || message.guild.members.find(u => new RegExp(`${xde}`, "gim").test(u.user.tag.toLowerCase())) || message.guild.members.get(args[0]);
    let cantidad1 = args[1];
 
  let guardado;
  if(args[2]) {
  guardado = args[2];
  } else {
  guardado = "cash"
  }
  
  if(!usuario) return message.channel.send("Escribe la id o menciona al usuario al que le quieres remover dinero :p");
   if(!args[0]) return message.channel.send("Escribe la id o menciona al usuario al que le quieres remover dinero :p");
  
  if(!cantidad1) return message.channel.send("Necesito que me digas cuanto quieres removerle a **"+ usuario.user.tag+"**");
  
  if(isNaN(cantidad1)) return message.channel.send("Los numeros no llevan letras :'p") 
  
  if(cantidad1 < 1) return message.channel.send("Si quieres añadirle dinero a alguien usa el comando `addmoney` :p")
   let cantidad = parseFloat(cantidad1);
   let object = moneydb.create(`${message.guild.id}.${usuario.user.id}`, {
    nametag: `${usuario.user.username}#${usuario.user.discriminator}`,
       id: `${usuario.user.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});

  if(guardado === "cash") {
    let cash = await moneydb.get(`${message.guild.id}.${usuario.user.id}.cash`);
     const command = args.shift().toLowerCase();
    if(cash < 1) return message.channel.send('**'+usuario.user.tag+'** No tiene dinero en efectivo, trata de poner `'+`${message.content.split(' ').shift()} @${usuario.user.tag} ${cantidad} bank`+'`')
    
    if(cantidad > cash) {
       let tuObjeto = await moneydb.get(`${message.guild.id}.${usuario.user.id}`);
        tuObjeto.totalmoney = 0
        tuObjeto.cash = 0
         tuObjeto.save();
    return  message.channel.send('No puedes quitarle mas efectivo del que tiene, pero el efectivo de **'+usuario.user.tag+'** ha sido puesto en 0')
    } else {
    
  let tuObjeto = await moneydb.get(`${message.guild.id}.${usuario.user.id}`);
        tuObjeto.totalmoney -= cantidad
        tuObjeto.cash -= cantidad
         tuObjeto.save();
    return message.channel.send(`Removidos <:UrusCOIN:756959373309509783>${cantidad} del efectivo de **${usuario.user.tag}**`)
    }
  } else if (guardado === "bank"){
     let bank = await moneydb.get(`${message.guild.id}.${usuario.user.id}.bank`);
     const command = args.shift().toLowerCase();
    if(bank < 1) return message.channel.send('**'+usuario.user.tag+'** No tiene dinero en el banco, trata de poner `'+`${message.content.split(' ').shift()} @${usuario.user.tag} ${cantidad} cash`+'`')
    
     if(cantidad > bank) {
       let tuObjeto = await moneydb.get(`${message.guild.id}.${usuario.user.id}`);
        tuObjeto.totalmoney = 0
        tuObjeto.bank = 0
         tuObjeto.save();
    return  message.channel.send('No puedes quitarle mas dinero del banco del que tiene, pero el banco de **'+usuario.user.tag+'** ha sido puesto en 0')
    } else {
    
      let tuObjeto2 = await moneydb.get(`${message.guild.id}.${usuario.user.id}`);
        tuObjeto2.totalmoney -= cantidad
        tuObjeto2.bank -= cantidad
         tuObjeto2.save();
     return message.channel.send(`Removidos <:UrusCOIN:756959373309509783>${args[1]} del banco de **${usuario.user.tag}**`)
    }
  } else if (guardado !== "cash" || "bank") {
   return message.channel.send("Solo puedes agregar dinero al bank o al cash :)");
  
  }}