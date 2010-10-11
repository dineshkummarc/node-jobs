var redis = require("redis");

client = redis.createClient()
client.select(15)
var jobs = (require("./lib/jobs"));

var runner = new jobs(client, "node-jobs-test",{});

runner.setRunners({
  log: function(data, callback) {
    console.log(data.msg);
    callback(null, true);
  },
  erroringLog: function(data, callback) {
    throw "expected error... for " + JSON.stringify(data);
    callback(null, true);
  }
})

runner.go();
