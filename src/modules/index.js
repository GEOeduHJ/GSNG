import m0101 from './12seji01-01.js';
import m0102 from './12seji01-02.js';
import m0103 from './12seji01-03.js';
import m0201 from './12seji02-01.js';
import m0202 from './12seji02-02.js';
import m0203 from './12seji02-03.js';
import m0204 from './12seji02-04.js';
import m0301 from './12seji03-01.js';
import m0302 from './12seji03-02.js';
import m0303 from './12seji03-03.js';
import m0401 from './12seji04-01.js';
import m0402 from './12seji04-02.js';
import m0403 from './12seji04-03.js';

export const MODULES = [m0101,m0102,m0103,m0201,m0202,m0203,m0204,m0301,m0302,m0303,m0401,m0402,m0403];
export const MODULE_BY_CODE = Object.fromEntries(MODULES.map((module) => [module.code, module]));
