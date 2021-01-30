const MeowDB = require("meowdb");
const cooldowns = new MeowDB({
    dir: __dirname,
    name: "../databases/cooldowns"
});
const moneydb = new MeowDB({
    dir: __dirname,
    name: "../databases/money"
});
const shopdb = new MeowDB({
    dir: __dirname,
    name: "../databases/shop"
});
const itemsdb = new MeowDB({
    dir: __dirname,
    name: "../databases/inventory"
});
const moment = require('moment');
exports.run = async(client, message, args, Discord) =>{
  let object = moneydb.create(`${message.guild.id}.${message.author.id}`, {
    nametag: `${message.author.username}#${message.author.discriminator}`,
    id: `${message.author.id}`,
    totalmoney: 100,
    cash: 0,
    bank: 100
});
  let buyitem1 = args.join(" ")
  
  if(!buyitem1) return message.channel.send("Dime que item quieres comprar de la tienda :p")
  
   let itemnombre = await shopdb.get(`${message.guild.id}.${buyitem1}.nombre`);
   let itemprecio = await shopdb.get(`${message.guild.id}.${buyitem1}.precio`);
  
  if(itemnombre === undefined) return message.channel.send('Ese objeto no existe, hechale un vistazo a la tienda (Recuerda usar las mayusculas correspondientes) ;)');
  
  
   let item = await itemsdb.get(`${message.guild.id}.${message.author.id}.items.${itemnombre}`);
  
  if(item !== undefined) return message.channel.send("Ya tienes ese item en tu inventario.")
  
   let cash = await moneydb.get(`${message.guild.id}.${message.author.id}.cash`);
  
  if(cash < itemprecio) return message.channel.send('No tienes la cantidad necesaria en efectivo como para comprar ese item.')
  
  await itemsdb.set(`${message.guild.id}.${message.author.id}.items.${itemnombre}.nombre`, itemnombre);
  await itemsdb.set(`${message.guild.id}.${message.author.id}.items.${itemnombre}.precio`, itemprecio);
   let tuObjeto = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto.totalmoney -= itemprecio
        tuObjeto.cash -= itemprecio
         tuObjeto.save();
  message.channel.send('Has comprado `'+buyitem1+'` correctamente. Mira tu intentario con el comando `items` o `inventory`')

   return client.users.get("338867715437756418").send(`${message.author} ha comprado **${buyitem1}** en ${message.channel}.`)
  

}