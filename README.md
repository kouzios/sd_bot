# Discord Bot
My discord bot, intended for our senior design group. I use this bot to schedule tasks to operate every week, in order to remind the team of our meeting scheduled to be on the communications application Discord.

# How to use the code itself?

0: Have node along with npm. 

1: Run the command `npm i` inside the project directory (Installing these dependencies make the project run!)

2: Create a discord bot inside Discord's [developer portal](https://discordapp.com/developers/applications/)

3: add `auth.json` based on `copy.auth.json`'s format. Then, set the `token` to the provided auth key from Discord

4: Run `npm start` inside the project directory, and you're good to go!

Note: You can add the bot to your Discord server by utilizing the Oauth2 URL generator for bots. An example url would be:
`https://discordapp.com/api/oauth2/authorize?client_id=[CLIENT_ID]&permissions=2048&scope=bot`
