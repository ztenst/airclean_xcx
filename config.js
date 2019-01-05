/**
 * configuration file
 */
'use strict';

// ENV
var env = 'production'; // 'development' or 'production'

// hj_house_xcx VERSION
var version = '1.0.1';

// development and production host
var hosts = {
    development: 'http://mall.madridwine.cn',
    production: 'https://airclean.madridwine.cn'
  // production: 'http://lemonxcx.com'
};

// static path
var static_path = 'http://ozz7ch6ms.bkt.clouddn.com';

//Sets the colors used within the text area
var color_scheme= "#000";


module.exports = {
    env: env,
    host: hosts[env],
    version: version,
    static_path: static_path,
    color_scheme:color_scheme,
    qiniu : 'http://oofuaem2b.bkt.clouddn.com/'
};
