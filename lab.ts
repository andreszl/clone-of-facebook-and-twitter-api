import repl from 'repl';
import { ObjectId } from 'mongodb';
import { factory, Post } from './src/database/factories';

const local: any = repl.start('>>> ');
require('repl.history')(local, `${process.env.HOME}/.node_history`);

const help = () => console.log('comandos de ayuda');

local.context.help = help;
local.context.factory = factory;
local.context.Post = Post;
local.context.ObjectId = ObjectId;
