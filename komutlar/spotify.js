const Discord = require ('discord.js');
const db = require('quick.db')
module.exports.run = async (bot, message, args) => {


 if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`spotify` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }



  let kurulumkontrol = db.fetch(`kurulum${message.guild.id}`)

	if (kurulumkontrol === undefined || kurulumkontrol === null || kurulumkontrol === "pasif")

	{

		let hata = new Discord.RichEmbed()
		.setTitle("Sunucu Kurulumu Yapılmamış!")
			.setDescription("Botun komutlarının başarıyla kullanılması için sunucunu **prefixin!sunucukur** komutuyla kurman gerekmekte!")
			.setFooter(" ROLEPLAY SUNUCUSU İSİMİ  ")
			.setColor("RANDOM")

		message.channel.send(hata) 

 return;

	}


    var user = message.mentions.users.first() || message.author;
    if (!args[0]) return message.channel.send("**Şarkı bilgisini bulmam için Spotify'dan şarkı dinleyen birisini etiketlemen lazım.**")

    if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
        try {
            var trackImg = user.presence.game.assets.largeImageURL;
            var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
            var trackName = user.presence.game.details;
            var trackAlbum = user.presence.game.assets.largeText;
            var trackAuthor = user.presence.game.state;

            const embed = new Discord.RichEmbed()
                .setAuthor('Spotify Şarkı Bilgisi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2000px-Spotify_logo_without_text.svg.png')
                .setColor(0xdb954)
                .setThumbnail(trackImg)
                .setFooter(` | Spotify Sistemi ${message.author.username} tarafından istendi.`, "https://cdn.discordapp.com/emojis/515260605347659777.png?v=1")
                .setDescription(`
\ **Spotify**'da dinlediği şarkı;  \**${trackName}**\n
\ **Spotify**'da dinlediği albüm;  \**${trackAlbum}**\n
\ **Spotify**'da dinlediği sanatçı;  \**${trackAuthor}**\n
`)
                .addField('Spotify\'da Dinlediği Şarkı Linki;', `**[${trackUrl}](${trackUrl})**`, false);

            return message.channel.send(embed);

        } catch (error) {
            return message.channel.send(` **${user.tag}** kullanıcısı şuanda **Spotify**<:spotify:515260605347659777>'dan şarkı dinlemiyor.`);
        }

    } else {
        return message.channel.send(`**${user.tag}** kullanıcısı şuanda Discord'una **Spotify**<:spotify:515260605347659777>'ı eklememiş`);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['spo', 'spoti', 'soti', 'spotif', 'spotifyy'],
  permLevel: 0
};

exports.help = {
  name: 'spotify',
  description: '',
  usage: 'spotify'
};
