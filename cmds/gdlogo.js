exports.run = async(client, message, args, Discord) =>{
 if(!args[0]) return message.channel.send("Necesito texto xd") 
  
  
  
  let texto = args.join('%20');
  
  let attachment = new Discord.Attachment(`https://gdcolon.com/tools/gdlogo/img/${texto}`, 'logo.png')
  
  message.channel.send(attachment)
}