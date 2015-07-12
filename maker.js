var fs = require('fs');

var data = fs.readFileSync("mac_hardware_base16.txt");
var makerArray = [];
var array = data.toString().split("\n");

for (i in array) {
	var temp = array[i].split("\(base 16\)");
	var deviceMaker = {
			macheader: temp[0].trim(),
			manufacturer: temp[1].trim()
		}
		// console.log(temp[0] + "::" + temp[1]);
	makerArray.push(deviceMaker);
}

//console.log(makerArray);
module.exports = makerArray;
