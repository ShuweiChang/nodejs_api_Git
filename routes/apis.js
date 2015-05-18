var express = require('express');
var router = express.Router();

router.route('/nodejsapi/:x/:y') // 輸入id當作參數
.get(function(req, res) {
    var x = req.params.x;
    var y = req.params.y;
    var apiURL = 'http://x.x.x.x/nearby/api/' + x + '/' + y + '/?format=json';
    var header = 'Authorization:Token 81397423XXXXXXXXXXXXXXXXXXXXXXXXX';



      //   CURLOPT_URL=>$apiURL,
      //   CURLOPT_HEADER=>0,
      //   CURLOPT_VERBOSE=>0,
      //   CURLOPT_RETURNTRANSFER=>true,
      //   CURLOPT_USERAGENT=>"Mozilla/4.0 (compatible;)",
      // CURLOPT_HTTPHEADER=>$headers
    var request = require('request');
    var options = {
      url: apiURL,
      headers: {
        'User-Agent': 'Mozilla/4.0 (compatible;)',
        'Authorization':'Authorization:Token 81397423XXXXXXXXXXXXXXXXXXXXXXXXX'
      },
      json: true
    };
    var result = [];
    var mainarea;
    if(!isNaN(x) && !isNaN(y)){
      request(options, function(err, res1, json) {
            if (err) {
                throw err;
            }

            var k=0;
            var address = new Array();
            var address_key = new Array();
            for(var l1 in json.rp_by_building) {
              mainarea = l1;
              for(var l2 in json.rp_by_building[l1]){
                for(var l3 in json.rp_by_building[l1][l2]){
                  for(var l4 in json.rp_by_building[l1][l2][l3]){
                    address_key[k] = json.rp_by_building[l1][l2][l3][l4];
                    address[k] = l2
                    k++;
                  }
                }
              }
            }

            
            var item;
            for(i = 0; i < address_key.length; i++){
              result.push({
                "area" : json.rp[address_key[i]].area,
                "total_price" : json.rp[address_key[i]].total_price,
                "lat" : json.rp[address_key[i]].lat,
                "floor" : json.rp[address_key[i]].floor,
                "material" : json.rp[address_key[i]].material,
                "unit_price" : json.rp[address_key[i]].unit_price,
                "record_type" : json.rp[address_key[i]].record_type,
                "building_type" : json.rp[address_key[i]].building_type,
                "parking" : json.rp[address_key[i]].parking,
                "usage" : json.rp[address_key[i]].usage,
                "lng" : json.rp[address_key[i]].lng,
                "deal_date" : json.rp[address_key[i]].deal_date,
                "address" : mainarea+address[i]
              });
            }
            var tem_array = {};
            tem_array['Address'] = result;
            var outjsonstr = { "Result" : {"Address" : result}, "Status" : "OK"};

            // console.log(result);
            // res.send(result);
            res.send(outjsonstr);
        });
    }
    else{
      var outjsonstr = { "Result" : {"Address" : result}, "Status" : "Error"};
      var result = [];
            // console.log(result);
            // res.send(result);
            res.send(outjsonstr);
    }
        
    
})

.post(function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The post api for image: ' + req.params.id
    })
})

.put(function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The put api for image: ' + req.params.id
    })
})

.delete(function(req, res) {
    res.json({
        id: req.params.id,
        message: 'The delete api for image: ' + req.params.id
    })
});

module.exports = router;