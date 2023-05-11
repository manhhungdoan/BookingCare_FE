import EventEmitter from 'events';

const _emiiter = new EventEmitter();
_emiiter.setMaxListeners(0);

export const emitter = _emiiter;
 