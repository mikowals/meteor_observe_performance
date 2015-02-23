var N = 120000;
var C = new Mongo.Collection('C');
C.remove({});
for (var i = 0; i < N; i++) {
  C.insert({'n': i});
}

var startTime = (new Date).getTime();
C.find().observe({}); // This call takes a long time to execute.
var endTime = (new Date).getTime();
console.log("Observe Time used: " + (endTime - startTime) + "ms");
