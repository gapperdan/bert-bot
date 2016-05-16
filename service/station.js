var HashMap = require('hashmap');

var map = new HashMap();
map
  .set('embarcadero','embr')
  .set('embr','embarcadero')
  .set('fremont','frmt')
  .set('dublin/pleasanton','dubl');
//
// map.forEach(function(value, key){
//   console.log(key + " : " + value);
//   console.log(getStationAbbr(value));
// });

exports.getAbbr = function(key) {
  return map.get(key);
}
