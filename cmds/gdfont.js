exports.run = async(client, message, args, Discord) =>{
 if(!args[0]) return message.channel.send("Elije por favor la fuente, usa `u?gdfont list` para ver lista de fuentes") 
  
  if(args[0].toLowerCase() === "list") {
    return message.reply(new Discord.RichEmbed()
                         .setColor(0x0073ff) 
                         .setTitle("Lista de fuentes.")
                        .setImage("https://cdn.glitch.com/302cf278-8e86-4ba8-9241-67bf5e1ebd26%2F2263c7fe-8832-47a2-b33d-999a87fbb08f.image.png?v=1592320238537")
                        )
  }
  
  
  if(isNaN(args[0]) && args[0] !== "gold") return message.channel.send("Fuente no válida, usa `u?gdfont list` para ver lista de fuentes")
  
  
  if(args[0] !== "gold" && args[0] < 1) return message.channel.send("Fuente no válida, usa `u?gdfont list` para ver lista de fuentes")
if(args[0] !== "gold" && args[0] > 12) return message.channel.send("Solo hay 12 fuentes de texto :)")
  
  if(!args[1]) return message.channel.send("Necesito texto ;)")
  
  
  
  let texto = args.slice(1).join('%20');
  
  let attachment = new Discord.Attachment(`https://gdcolon.com/tools/gdfont/img/${texto}?font=${args[0]}`, 'logo.png')
  
  message.channel.send(attachment)
}