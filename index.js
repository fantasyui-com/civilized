const fs = require('fs');
const path = require('path');
var XRegExp = require('xregexp');
module.exports = function(location){
  const result = [];
  const story = fs.readFileSync(location).toString();
  const interpreter = require(location + '.js');
  const registered = [];
  const register = function(event, expression){
    registered.push({event,expression});
  }
  interpreter.bind({register})();
  story.split(/\n/).forEach((line)=>{
    registered.forEach((matcher)=>{
      const match = XRegExp.exec(line, XRegExp(matcher.expression) );
      if(match) {
        result.push(matcher.event, match)
      }
    })
  });
  return result;
}
