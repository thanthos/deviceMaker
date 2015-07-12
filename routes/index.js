var express = require('express');
var router = express.Router();
var makerArray = require('../maker');

//console.log(makerArray[100]);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('maker');
});


router.post('/', function(req, res, next) {
	var macaddr = encodeURIComponent(req.body.macaddr);
	var macaddr = clean(macaddr);
	var firstsixbytes;
	var result = {};
	//console.log(macaddr)
	if (macaddr.length >= 6) {
		firstsixbytes = macaddr.substring(0, 6);
		for (i in makerArray) {
			if (makerArray[i].macheader == firstsixbytes) {
				result.mac = macaddr;
				result.make = makerArray[i].manufacturer;
				// console.log("Found " + result.make);
				break;
			}
		}
		if (result.make == undefined) {
			result.make = 'unknown';
		}
	} else {
		result.mac = macaddr;
		result.msg = "Invalid MAC address provided ";
	}
	// console.log("Received Post:" + macaddr);
	// console.log("firstsixbytes" + firstsixbytes);

	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify(result));

});

function clean(macaddr) {
	return (macaddr.replace(/%3A/g, '').replace('-', ''));
}



module.exports = router;
