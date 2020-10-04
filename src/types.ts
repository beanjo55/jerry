import {Client, Collection, Guild, Message, GuildChannel, Embed, Member, User, Role, GuildTextableChannel, VoiceChannel, CategoryChannel, ClientOptions, TextChannel} from "eris";

export interface ICommandContext{
    msg: Message;
    channel: TextChannel;
    guild: Guild;
    member: Member;
    user: User;
    content: string;
    args: Array<string>;
    dev: boolean; 
}

export interface JerryPeck{
   peckChance: number;
   peckEnable: boolean;
}
