import { Plugin } from 'rollup'
import { FastifyPluginCallback } from 'fastify'

export interface ProxyItem {
  from: string
  to: string
  opts?: object
}

export interface DevOptions {
  silent?: boolean;
  force?: boolean;
  proxy: ProxyItem[];
  dirs: [string];
  dirname: string;
  spa: (boolean | string);
  port: number;
  host: string;
  basePath: string;
  extend: FastifyPluginCallback;
  server: object;
}

export default function dev(options?: (string | DevOptions)): Plugin
