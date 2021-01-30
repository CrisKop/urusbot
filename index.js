const express = require("express");
var app = require("express")();
app.use(express.static("public"));
app.use(require("express").urlencoded())
app.get("/*", function(req, res){
if(req.path == "/"){
res.sendFile(__dirname + "/views/index.html")
}
})
app.listen(3000);

//COMIENZO DEL CODIGO DEL BOT

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const Weez = require("weez");
const weez = new Weez.WeezAPI("yrvbfov8pQculzhVfR2LwzRlAr7zw2mHrNEu"); 
let prefix = "u?"


const MeowDB = require("meowdb");
const cooldowns = new MeowDB({
    dir: __dirname,
    name: "/databases/cooldowns"
});
const moneydb = new MeowDB({
    dir: __dirname,
    name: "/databases/money"
});
const shopdb = new MeowDB({
    dir: __dirname,
    name: "/databases/shop"
});

const mongodb = require("./database/database.js");
mongodb.then(() => console.log("Mongodb Conectado"))


const dailydb = require("./database/models/dailys.js")
const weeklydb = require("./database/models/weeklys.js")

//status
client.on("ready", () => {
  const estados = [`Urus GDPS`, `Prefix | u?`,`${client.guilds.get("536974224443834369").members.size} users.`]
    console.log("Encendido");
    client.user.setStatus('online')
    setInterval(() => {
      let result = Math.floor((Math.random() * estados.length));
           client.user.setActivity(estados[result]); 
}, 7000)

// daily
   setInterval(() => {
 const GDClient = require('geometry-dash-api');

const GD = new GDClient({
  server: 'http://newgdpsneon.7m.pl/database/',
  userName: 'CrisKop',
password: process.env.ACCPASS
});
  
  
  
  
  const { api } = GD;
  
  (async() => {
  await GD.login();

  const user =  await api.levels.getDaily();


let datos = await dailydb.findOne({
daily: `${user.levelID}`
})

if(!datos){
  client.channels.get("752654690356953139").send("**Nuevo Daily!**",
    new Discord.RichEmbed()
                         .setThumbnail("https://vignette.wikia.nocookie.net/geometry-dash/images/9/93/Daily_-_ButtonIcon.png/revision/latest?cb=20200426135631&path-prefix=es")
                        .setAuthor("Nuevo Daily! ", "https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
                        .addField('<:Cool:708744611421618186>Nombre', user.name, true)
                         .addField('<:alvfeliz:708744124861251587>ID', user.levelID, true)
                        .addField('<:star:691073392257925162>Estrellas', user.stars, true)
                         .addField('<:demon:691073378756591787>Dificultad', user.diff, true)
                         
                         .addField('<:usercoin:691073503922880573>Monedas', user.coins, true)
                         .addField('<:downloads:691073381617107034>Descargas', user.downloads, true)
                         .addField('<:like:691073387602247711>Likes', user.likes, true)
                         .addField('<:time:691073392484286515>Duracion', user.length, true)
                      //   .addField('Descripcion', descripcion, true)
                        
                          .setColor(0x0073ff) 
  )

 let tosave = new dailydb({
  daily: `${user.levelID}`
})
    
await tosave.save();

}





})();

     }, 600000)





     //weekly

      setInterval(() => {
 const GDClient = require('geometry-dash-api');

const GD = new GDClient({
  server: 'http://newgdpsneon.7m.pl/database/',
  userName: 'CrisKop',
password: process.env.ACCPASS
});
  
  
  
  
  const { api } = GD;
  
  (async() => {
  await GD.login();

  const user =  await api.levels.getWeekly();


let datos = await weeklydb.findOne({
weekly: `${user.levelID}`
})

if(!datos){
  client.channels.get("752654690356953139").send("**Nuevo Weekly!**",
    new Discord.RichEmbed()
                         .setThumbnail("https://vignette.wikia.nocookie.net/geometry-dash/images/c/c8/Demonweekly.png/revision/latest?cb=20171113010830&path-prefix=es")
                        .setAuthor("Nuevo Weekly! ", "https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
                        .addField('<:Cool:708744611421618186>Nombre', user.name, true)
                         .addField('<:alvfeliz:708744124861251587>ID', user.levelID, true)
                        .addField('<:star:691073392257925162>Estrellas', user.stars, true)
                         .addField('<:demon:691073378756591787>Dificultad', user.diff, true)
                         
                         .addField('<:usercoin:691073503922880573>Monedas', user.coins, true)
                         .addField('<:downloads:691073381617107034>Descargas', user.downloads, true)
                         .addField('<:like:691073387602247711>Likes', user.likes, true)
                         .addField('<:time:691073392484286515>Duracion', user.length, true)
                      //   .addField('Descripcion', descripcion, true)
                        
                          .setColor(0x0073ff) 
  )

 let tosave = new weeklydb({
  weekly: `${user.levelID}`
})
    
await tosave.save();

}





})();

     }, 2400000)
 });




//bienvenida
 



//despedida
 



client.on("message",async (message) => {
	
 const args = message.content.slice(prefix.length).split(/ +/g);
       const command = args.shift();
  
  if(message.content === '!pruebaBienvenida') {
     let bienvenida = new Weez.Bienvenida()
  .avatar(message.author.displayAvatarURL)
  .fondo("https://cdn.glitch.com/302cf278-8e86-4ba8-9241-67bf5e1ebd26%2Fintento%20fondo.png?v=1584892391228")
  .textoTitulo(`Bienvenido ${message.author.username}`)
  .textoDesc("Disfruta de el servidor!")
  .textoColor('ffffff')
     .acceso(weez)
 
let img = await Weez.bienvenidaRender(bienvenida)
 
message.channel.send({files: [img]})
  }
  
  
  
 

                                                  
  
  
  
  
  
  
  
  
  
   if(message.author.bot) return;
if (!message.content.startsWith(prefix)) return; 
 try{
   let x = require(`./cmds/${command}`)
   x.run(client, message, args, Discord)
 }catch(e){
   console.log(`No existe el cmd: ${command}\n${e}` )
 }finally{
   console.log(`Comando ejecutado: ${command} por: ${message.author.tag}`)
 }
 
  
});
client.login(process.env.TOKEN);