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
  
  
  
     let xde = args.join(" ") || message.author.username;
  let usuario = message.mentions.members.first() || message.guild.members.find(u => new RegExp(`${xde}`, "gim").test(u.user.tag.toLowerCase())) || message.guild.members.get(args[0]);
    let cantidad1 = args[1];
 
  
  
  if(!usuario) return message.channel.send("Escribe la id o menciona al usuario al que le quieres pagarle dinero :p");
  
 if(!usuario) return message.channel.send("Escribe la id o menciona al usuario al que le quieres pagar dinero");
  if(usuario.user.id === message.author.id) return message.channel.send("Escribe la id o menciona al usuario al que le quieres pagar dinero");

  
  if(!cantidad1) return message.channel.send("Necesito que me digas cuanto quieres pagarle a **"+ usuario.user.tag+"**");
  
  if(isNaN(cantidad1)) return message.channel.send("Los numeros no llevan letras :'p") 
  
  if(cantidad1 < 1) return message.channel.send("No puedes quitarle dinero :u")
   let cantidad = parseFloat(cantidad1);
   let object = moneydb.create(`${message.guild.id}.${usuario.user.id}`, {
    nametag: `${usuario.user.username}#${usuario.user.discriminator}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
   let object1 = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});

 let cash = await moneydb.get(`${message.guild.id}.${message.author.id}.cash`);
  
  if(cash < cantidad) return message.channel.send('No tienes el dinero necesario en efectivo para pagar esa cantidad de dinero.')
  let tuObjeto = await moneydb.get(`${message.guild.id}.${usuario.user.id}`);
        tuObjeto.totalmoney += cantidad
        tuObjeto.cash += cantidad
         tuObjeto.save();
   let tuObjeto1 = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto1.totalmoney -= cantidad
        tuObjeto1.cash -= cantidad
         tuObjeto1.save();
    return message.channel.send(`Le has pagado <:UrusCOIN:756959373309509783>${cantidad} a **${usuario.user.tag}**`)

}