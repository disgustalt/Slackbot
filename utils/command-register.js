import { app } from '../index.js';
import { default as c } from '../config.js';

export function Command(name, func) {
  if (!name || typeof name !== "string") throw new Error("Commands must have a valid name!");
  if (!func || typeof func !== "function") throw new Error("Commands must have a valid handler function!")
  const cmd = (c.prefix && c.bot_name) ? `/${c.bot_name.toLowerCase()}-${name}` : `/${name}`;

  app.command(cmd, func);
};