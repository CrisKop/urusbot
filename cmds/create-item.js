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
const moment = require('moment');
exports.run = async(client, message, args, Discord) =>{
 if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Uh :c, Necesitas administrador para crear un item.");

  let itemnombre3 = args.slice(0).join(' ').split('| ');
  
   let itemnombre = itemnombre3.slice(0).join('| ').split('| ').shift();
 
  let itemprecio1 = itemnombre3.slice(1).join().split(' ');
  
  let itemdescription = itemprecio1.slice(1).join(" ");

  


  


  
  if(!itemnombre) return message.channel.send('> **Falta el nombre del item**\n**Uso del comando:** `create-item <Nombre Del Item> | <Precio> <Una descripcion del item>`\nPD: El nombre debe ser separado con un `|` de el precio y la descripcion.');
  if(!itemprecio1) return message.channel.send('> **Falta el precio del item**\n**Uso del comando:** `create-item <Nombre Del Item> |<Precio> <Una descripcion del item>`\nPD: El nombre debe ser separado con un `|` de el precio y la descripcion.');
  if(!itemprecio1.slice(0).join() && !itemprecio1.slice(1).join()) return message.channel.send('> **Falta el precio del item**\n**Uso del comando:** `create-item <Nombre Del Item> | <Precio> <Una descripcion del item>`\nPD: El nombre debe ser separado con un `|` de el precio y la descripcion.');
  if(isNaN(itemprecio1.slice(0).join(" ").split(" ").shift())) return message.channel.send('> **Precio del item no válido**\n**Uso del comando:** `create-item <Nombre Del Item> | <Precio> <Una descripcion del item>`\nPD: El nombre debe ser separado con un `|` de el precio y la descripcion.');
  if(itemprecio1.slice(0).join() && !itemprecio1.slice(1).join()) return message.channel.send('> **Falta la descripcion del item**\n**Uso del comando:** `create-item <Nombre Del Item> | <Precio> <Una descripcion del item>`\nPD: El nombre debe ser separado con un `|` de el precio y la descripcion.');
  if(!itemdescription) return message.channel.send('> **Falta la descripcion del item**\n**Uso del comando:** `create-item <Nombre Del Item> | <Precio> <Una descripcion del item>`\nPD: El nombre debe ser separado con un `|` de el precio y la descripcion.');
  if(isNaN(parseFloat(itemprecio1))) return message.channel.send("El precio no es válido.") 
    let itemnombre4 = itemnombre.replace(/\s+/g, ' ').trim();
  let itemnombre5 = itemnombre4.replace(/\s*$/,'');
  let itemnombre2 = await shopdb.get(`${message.guild.id}.${itemnombre5}.nombre`);
  
    let masde12 = await shopdb.get(`${message.guild.id}`);

  if(masde12 !== undefined){
   let datoslol = Object.entries(masde12)
  let items = datoslol.map(([_, obj], i) => {
   let rObj = {};
    rObj = `${obj.nombre}`
   return rObj;
});
let xd222 = items.join(' | ').split(' | ');
   if(xd222.length > 11) return message.channel.send("No puedes agregar mas de 12 objetos a la tienda")
  }

 if(itemnombre2 !== undefined) return message.channel.send('Ese objeto ya existe, hechale un vistazo a la tienda ;)');
  let itemprecio = parseFloat(itemprecio1);

  
   await shopdb.set(`${message.guild.id}.${itemnombre5}.nombre`, itemnombre5);
  await shopdb.set(`${message.guild.id}.${itemnombre5}.precio`, itemprecio);
   await shopdb.set(`${message.guild.id}.${itemnombre5}.descripcion`, itemdescription);
  
  message.channel.send("Item **"+itemnombre5+"** creado correctamente.")
}