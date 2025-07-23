import { identity_handlers } from './identity_handler';
import { links_handers } from './links-handlers';

export const handlers = [...links_handers, ...identity_handlers];
