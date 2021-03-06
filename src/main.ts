import {Client, ClientOptions, Collection} from "eris";
import {default as fs} from "fs"
import {Logger} from "./logger"
import {command} from "./Command";
import {default as axios} from "axios"; 
const config = require("../config.json"); 

export class Jerry extends Client {
    logger: Logger;
    canSwimInRain = false;
    bevents: {[key: string]: () => void};
    commands: Collection<command>;
    defaultColor = 14460415;
    constructor(token: string, options: ClientOptions) {
        super(token, options);
        this.logger = new Logger()
        //DO NOT TOUCH
        //this makes events work
        this.bevents = {};
        this.commands = new Collection(command);
    }

    init(): void {
        fs.readFile(`${__dirname}/jerry.txt`, "utf8", function(err, data) {
            console.log(data)
            jerry.logger.success('Jerry', 'Commands loaded')
            jerry.logger.success('Jerry', 'Events loaded')

        })
        this.loadEvents()
        this.loadCommands()
        this.connect();
    }

    peck(target: string, times: number): string {
        return `Jerry pecked ${target} ${times} times!`;
    }

    feedJerry(count: number, goodboy?: boolean): any { 
        if(!goodboy){return console.log(`You fed jerry ${count} Allys!`)}
        return "Jerry is a good boy!"
    }
   async postDBL(): Promise<any> { 
        await axios.post(`https://top.gg/api/bots/${jerry.user.id}/stats`,{
                // eslint-disable-next-line @typescript-eslint/camelcase
                server_count: this.guilds.size,
                // eslint-disable-next-line @typescript-eslint/camelcase
                shard_count: this.shards.size
            },
            {
                headers: {
                    Authorization: config.dblToken
                }
            });
    }

    private get weiner(): string {
        return "Jerry has a tiny weiner!"
    }

    private set swimInRain(state: boolean){
        this.canSwimInRain = state;
    }
    
    loadEvents(): void{
        const eventfiles = fs.readdirSync(__dirname + "/Events");
        eventfiles.forEach(file => {
            this.loadEvent(file);
        });
    }
    
    loadEvent(eventfile: string): void{
        try{
            let Event = require(`./Events/${eventfile}`).default;
            if(!Event){Event = require(`./Events/${eventfile}`).event}
            this.bevents[Event.name] = Event.handle.bind(this);
            this.on(Event.name, this.bevents[Event.name]);
        }catch(err){
            
            console.log(err);
        }
    }

    reloadEvent(eventname: string): void{
        if(!this.bevents[eventname]){throw new Error("Can not reload an event that doesnt exist!");}
        delete require.cache[require.resolve(`${__dirname}/Events/${eventname.charAt(0).toUpperCase() + eventname.slice(1)}.js`)];
        this.removeAllListeners(eventname);
        this.loadEvent(eventname.charAt(0).toUpperCase() + eventname.slice(1));
    }
        
    private loadCommands(){
        fs.readdir(`${__dirname}/Commands/`, (err, files) => {
            files.forEach((file, index) => {
                
                const filepath = `${__dirname}/Commands/` + file;
                console.log(filepath);
                const cmd = require(filepath);
                const newCmd = new cmd.cmd();
                jerry.commands.add(newCmd);
            });

            
        });
    }
}

const jerry = new Jerry(config.token, {
    autoreconnect: true, 
    messageLimit: 100, 
    restMode: true
})

jerry.init(); 
