var HashMap = require('hashmap');

var map = new HashMap();

//station abbr as defined here: http://api.bart.gov/docs/overview/abbrev.aspx
map
  .set('12th st. oakland city center','12th')
  .set('16th st. mision','16th')
  .set('19th st. oakland','19th')
  .set('24th st. mission','24th')
  .set('ashby','ashb')
  .set('balboa park','balb')
  .set('bay fair','bayf')
  .set('castro valley','cast')
  .set('civic center','civc')
  .set('coliseum','cols')
  .set('colma','colm')
  .set('concord','conc')
  .set('daly city','daly')
  .set('downtown berkeley','dbrk')
  .set('dublin/pleasanton','dubl')
  .set('deln','el cerrito del norte')
  .set('plza','el cerrito plaza')
  .set('embarcadero','embr')
  .set('fremont','frmt')
  .set('fruitvale','ftvl')
  .set('glen park','glen')
  .set('hayward','hayw')
  .set('lafayette','lafy')
  .set('lake merritt','lake')
  .set('macarthur','mcar')
  .set('millbrae','mlbr')
  .set('montgomery st','mont')
  .set('north berkeley','nbrk')
  .set('north concord/martinez','ncon')
  .set('oakland intl airport','oakl')
  .set('orinda','orin')
  .set('pittsburg/bay point','pitt')
  .set('pleasant hill','phil')
  .set('powell st','powl')
  .set('richmond','rich')
  .set('rockridge','rock')
  .set('san bruno','sbrn')
  .set('san francisco intl airport','sfia')
  .set('san leandro','sanl')
  .set('south hayward','shay')
  .set('south san francisco','ssan')
  .set('union city','ucty')
  .set('walnut creek','wcrk')
  .set('west dublin','wdub')
  .set('west oakland','woak')
  .set('','')
//
// map.forEach(function(value, key){
//   console.log(key + " : " + value);
//   console.log(getStationAbbr(value));
// });

exports.getAbbr = function(key) {
  return map.get(key);
}
