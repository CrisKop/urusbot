
exports.run = async(client, message, args, Discord) =>{
  const GDClient = require('geometry-dash-api');

const GD = new GDClient({
  server: 'http://newurusgdps.7m.pl/database/',
  userName: 'CrisKop',
password: process.env.ACCPASS
});
  
  if(!args[0]) return message.reply("Necesito que digas la id del nivel :)");
  
  
  const { api } = GD;
  
  (async() => {
  await GD.login();
  /*
    if(isNaN(args.join(" "))){
      const user2 = await api.levels.find({query: args.join(" ")});
        console.log(user2); // => Object
       if(!user2) return message.channel.send("Nivel no encontrado en Urus GDPS.")
      
      console.log(`${user2.levels.slice(0).levelID} es la id`)
      
        const user = await api.levels.getById({levelID: user2.levels.levelID});
      
      
       message.channel.send(new Discord.RichEmbed()
                         .setThumbnail("https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
                        .setAuthor("Stats de "+user.name, "https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
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
  


      
      
    } else {
    */
  const user = await api.levels.getById({levelID: args.join(" ")});
    
    
    
    
    if(!user) return message.channel.send("Nivel no encontrado en Urus GDPS.")
    
    
    
    

    
    
    
//const utf8 = require('nodejs-utf8');
    
    
  //  let descripcion = utf8.decode(user.desc)
    
    
    
    
    
    
    message.channel.send(new Discord.RichEmbed()
                         .setThumbnail("https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
                        .setAuthor("Stats de "+user.name, "https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
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
  
  console.log(user); // => Object
    //}
})();
  
}