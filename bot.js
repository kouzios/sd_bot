const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var schedule = require('node-schedule');

require('dotenv').config()

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const bot = new Discord.Client();
bot.login(auth.token);

bot.on('ready', () => {
    logger.info('Connected');
});

/**
 * Handles whenever a message is sent into the discord server, irrespective of channels
 */
bot.on('message', msg => {
    var command = "";
    var params = "";
    const content = msg.content;

    if(content.startsWith("!")) {
        var args = content.substr(1); // Strip away !

        //If there's a given parameter
        if(args.indexOf(' ') != -1) {
            command = args.substr(0, args.indexOf(' ')); // Break off param
            params = args.substr(args.indexOf(' ') + 1).split(' '); //Break off command
        } else {
            command = args;
        }

        //Switch through to determine how we handle the command
        switch(command){
            case "meeting":
                if(params.length != 2) {
                    msg.reply("Please specify a proper datetime to set weekly reminders for! (Example: !meeting 3:00pm Tuesday)");
                    logger.info("User " + msg.author.username + " requested a meeting without specifying a datetime");
                    return;
                }

                var time = params[0];
                var day = getDay(params[1]);

                const timeDate = new Date("Dec 2019 " + time);
                const isValidTime = (Boolean(+timeDate))
                const isValidDay = day != -1;

                if(isValidTime == false && isValidTime == false) {
                    msg.reply("Neither argument is valid! A valid example is: !meeting 17:00 thursday");
                    logger.info("User " + msg.author.username + " requested a meeting with an invalid time, and day");
                    return;
                } else if(isValidTime == false) {
                    msg.reply("That is an incorrect time given! A valid example is: !meeting 17:00 thursday");
                    logger.info("User " + msg.author.username + " requested a meeting with an invalid time");
                    return;
                } else if(isValidDay == false) {
                    msg.reply("That is an incorrect day given! A valid example is: !meeting 17:00 thursday");
                    logger.info("User " + msg.author.username + " requested a meeting with an invalid day");
                    return;
                }
                
                logger.info("User " + msg.author.username + " requested a datetime for: " +  params);
                datetime(msg, timeDate.getHours(), timeDate.getMinutes(), day, params[1].toLowerCase());
            break;
        }
    }
});

function getDay(day) {
    switch(day.toLowerCase()) {
        case "sunday":
            return 0;
        case "monday":
            return 1;
        case "tuesday":
            return 2;
        case "wednesday":
            return 3;
        case "thursday":
            return 4;
        case "friday":
            return 5;
        case "saturday":
            return 6;
        default: 
            return -1;
    }
}

function datetime(msg, hour, minute, day, dayString) {
    const time = "Hour: " + hour + ", Minute: " + minute + ", Day: " + dayString;

    msg.reply("Your job is scheduled weekly for : " + time);
    logger.info("User " + msg.author.username + " set up a meeting time at " + time);

    var j = schedule.scheduleJob({hour: hour, minute: minute, dayOfWeek: day}, function(){
        msg.channel.send('@everyone get in here');
    });
}
