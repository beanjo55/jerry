import {Message, TextableChannel} from "eris";
import {Jerry} from "./main";
import {ICommandContext} from "./types";
export class command {
    name: string;
    id: string;
    aliases: Array<string>;
    requiredGuilds: Array<string>;
    requiredRoles: Array<string>;
    requiredUsers: Array<string>;
    alwaysEnabled: boolean;
    helpInfo: string;
    commandType: string;
    constructor(data: Partial<command>){
        
        this.name = data.name || "unnamed"
        this.aliases = data.aliases || [];
        this.id = this.name;


        this.requiredGuilds = data.requiredGuilds || [];
        this.requiredRoles = data.requiredRoles || [];
        this.requiredUsers = data.requiredUsers || [];


        if(data.alwaysEnabled !== undefined){
            this.alwaysEnabled = data.alwaysEnabled;
        }else{
            this.alwaysEnabled = false;
        }

        this.helpInfo = data.helpInfo || "someone waz lazy";

        this.commandType = data.commandType || "default";
    }
    async execute (jerry: Jerry, ctx: ICommandContext): Promise<unknown>{
        return "Unimplemented"
    }

}
