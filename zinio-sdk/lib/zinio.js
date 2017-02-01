var Config, connect, errorTypes, version, ZinioService;

version = require("../package.json").version;

Config = require("./zinio/config").Config;

ZinioService = require("./zinio/zinio_service").ZinioService;

connect = function(config) {
  return new ZinioService(new Config(config));
};

exports.connect = connect;