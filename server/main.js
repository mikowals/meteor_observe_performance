var N = 1000000;
var name = ('C');
var C = new Mongo.Collection(name);
var connection = MongoInternals.defaultRemoteCollectionDriver().mongo;
var _collection = connection._getCollection( name );
var wrappedInsert = Meteor.wrapAsync( _collection.insert, _collection );

var count = C.find().count();
if (count < N){
  var batches = 11;
  var size = N / batches;
  C.remove({});
  _.times( batches, function (ii) {
    var toInsert = _.range(ii * size, (ii + 1) * size).map( function (n) {
      return {n:n};
    });
    console.log('inserting batch: ', ii);
    wrappedInsert(toInsert, {safe: true});
  });
}

_.range( 90000, 1000000, 5000).forEach( function(n) {
  var cursor = C.find({},{limit: n});
  var startTime = new Date().getTime();
  var results = cursor.fetch();
  console.log(n, ' docs fetched.  Time used: ', (new Date().getTime() - startTime), 'ms' );
  delete results;
  //startTime = new Date().getTime();
  //var handle = cursor.observe({}); // This call takes a long time to execute.
  //console.log(n, " docs observed. Time used: ", (new Date().getTime() - startTime), "ms");
  //handle.stop();
});
