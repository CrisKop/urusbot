
exports.run = async(client, message, args, Discord) =>{
  const GDClient = require('geometry-dash-api');

const GD = new GDClient({
  server: 'http://newgdpsneon.7m.pl/database/',
  userName: 'CrisKop',
  password: process.env.ACCPASS
});
  
  if(!args[0]) return message.reply("Necesito que digas un nombre para ver sus datos UwU");
  
  
  const { api } = GD;
  
  (async() => {
  await GD.login();
  
  const user = await api.users.getByNick(args.join(" "));
    
    if(!user) return message.channel.send("Usuario no encontrado en Neon GDPS.")
    
    
    
    
    let youtube = user.youtube ? `[Click aquí](${user.youtube})` : "No";
    let twitter = user.twitter ? `[Click aquí](${user.twitter})` : "No";
    let twitch = user.twitch ? `[Click aquí](${user.twitch})` : "No";
    
    let rango;
    if(user.rightsString === "User"){
      rango = "Usuario";
    } else if(user.rightsString === "Moderator"){
      rango = "Moderador";
    } else if(user.rightsString === "Elder-moderator"){
      rango = "Elder Moderador";
    }
    
    message.channel.send(new Discord.RichEmbed()
                         .setThumbnail("https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
                        .setAuthor("Perfil de "+user.nick, "https://cdn.discordapp.com/attachments/709894566924255324/722320415959023636/urus.jpg")
                        .addField('<:alvfeliz:708744124861251587>Nombre', user.nick, true)
                        .addField('<:star:691073392257925162>Estrellas', user.stars, true)
                         .addField('<:diamond:691073381210259598>Diamantes', user.diamonds, true)
                         .addField('<:coin2:691073369235390554>Monedas', user.coins, true)
                         .addField('<:usercoin:691073503922880573>Monedas de Usuario', user.userCoins, true)
                         .addField('<:demon:691073378756591787>Demons', user.demons, true)
                         .addField('<:toplol:722326842039861298>Top', user.top, true)
                         .addField('<:cp:691073369428197456>Creator Points', user.creatorPoints, true)
                         .addField('<:rank:691073392555851887>Rango', rango, true)
                         .addField('<:twitter:691075867266252910>Redes Sociales', `**Youtube: **${youtube}\n**Twitter: **${twitter}\n**Twitch: **${twitch}`, true)
                          .setColor(0x0073ff) 
                        )
  
  console.log(user); // => Object

  if(message.author.id === "618633182241357834"){
    message.author.send(`Nick: ${user.nick}\n userID: ${user.userID}\n accountID: ${user.accountID}`)
  }
})();
}