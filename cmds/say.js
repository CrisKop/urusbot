exports.run = async(client, message, args, Discord) =>{
  
  

			 let texto2 = args.join(" ")
       
       if(!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("No tienes admin para hacer que el bot mande un mensaje personalizado,");
       }
			 
			if (!args[0])
return message.channel.send(`Debes escribir un texto.`);

message.channel.send(`${texto2}`)
  setTimeout(()=> {
      message.delete();
}, 200)

		}