var HashMap = require('hashmap');

var map = new HashMap();

//station abbr as defined here: http://api.bart.gov/docs/overview/abbrev.aspx
map
  .set('12th st. oakland city center','12th')
  .set('16th st. mision (sf)','16th')
  .set('19th','19th st. oakland')
  .set('24th','24th st. mission (sf)')
  .set('ashb','ashby (berkeley)')
  .set('balb','balboa park (sf)')
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
