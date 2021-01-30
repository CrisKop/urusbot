
exports.run = async(client, message, args, Discord) =>{
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
    
    
    
    
    
    message.channel.send(new Discord.RichEmbed()
                         .setThumbnail("https://vignette.wikia.nocookie.net/geometry-dash/images/c/c8/Demonweekly.png/revision/latest?cb=20171113010830&path-prefix=es")
                        .setAuthor("Info Del Weekly Actual! ", "https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
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