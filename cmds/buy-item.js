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
  
  if(!buyitem1) return message.channel.send("What you want buy? :p")
  
   let itemnombre = await shopdb.get(`${message.guild.id}.${buyitem1}.nombre`);
   let itemprecio = await shopdb.get(`${message.guild.id}.${buyitem1}.precio`);
  
  if(itemnombre === undefined) return message.channel.send('That item dont exist, see the shop (remember to use the correct capital letters) ;)');
  
  
   let item = await itemsdb.get(`${message.guild.id}.${message.author.id}.items.${itemnombre}`);
  
  if(item !== undefined) return message.channel.send("You already have that item in the inventory.")
  
   let cash = await moneydb.get(`${message.guild.id}.${message.author.id}.cash`);
  
  if(cash < itemprecio) return message.channel.send('You dont have enough cash to buy that.')
  
  await itemsdb.set(`${message.guild.id}.${message.author.id}.items.${itemnombre}.nombre`, itemnombre);
  await itemsdb.set(`${message.guild.id}.${message.author.id}.items.${itemnombre}.precio`, itemprecio);
   let tuObjeto = await moneydb.get(`${message.guild.id}.${message.author.id}`);
        tuObjeto.totalmoney -= itemprecio
        tuObjeto.cash -= itemprecio
         tuObjeto.save();
  message.channel.send('You bought `'+buyitem1+'` correctly. See your inventory with the command `items` or `inventory`')
  

  return client.users.get("338867715437756418").send(`${message.author} ha comprado **${buyitem1}** en ${message.channel}.`)

}