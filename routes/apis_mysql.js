var express = require('express');
var router = express.Router();

router.route('/nodejsapi_mysql/:x/:y') // 輸入id當作參數

.get(function(req, res) {
                var x = req.params.x;
                var y = req.params.y;
                var api_x;
                var api_y;
                var apiURL = 'http://x.x.x.x/REST?x=' + x + '&y=' + y;

              if(!isNaN(x) && !isNaN(y)){

                var _mysql = require('mysql');
                var sqlInfo = {
                   host: 'localhost',
                   user: 'root',
                   password: 'root',
                   database: 'richidb'
                }
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
                    request(options, function(err, res1, json) {
                        if (err) {
                            throw err;
                        }
                        api_x = json.geometries[0].x;
                        api_y = json.geometries[0].y;
                        // console.log('api_x= ' + api_x);
                        // console.log('api_y= ' + api_y);
                        mysql = _mysql.createConnection(sqlInfo);
                        mysql.connect();

                        var class_array = new Array();
                        var sql_class = 'SELECT distinct(SUBSTR(code,1,3)) as c2 FROM poi';
                        var index_count = 0;
                        var check_char = 'A';
                        mysql.query(sql_class ,
                        function(err, result, fields) {
                            if (err) throw err;
                            else {
                               class_array[check_char] = new Array();
                                 for(var i in result){
                                   var info = result[i];
                                   if(check_char != info.c2.substring(0,1))
                                   {
                                    check_char = info.c2.substring(0,1); 
                                    index_count = 0;
                                    class_array[check_char] = new Array();
                                   }
                                   
                                   class_array[info.c2.substring(0,1)][index_count] = info.c2;
                                   index_count++;
                                  }
                                  var sqlstr = 'SELECT p.*,l.plvalue,c.group_name,c.categoty,c.c1,SUBSTR(p.code,1,3) AS c2 FROM poi AS p LEFT JOIN poiclass AS c ON p.code = c.code LEFT JOIN poilavel AS l ON l.code = c.code';
                                  sqlstr += ' WHERE l.plvalue = 0 AND power(power( p.x - ' + api_x + ',2) + power( p.y - ' + api_y + ',2),0.5) < 1000';
                                  sqlstr += ' ORDER by c1,c2';
                                  mysql.query(sqlstr ,
                                  function(err, result, fields) {
                                  if (err) throw err;
                                  else {
                                    var mysql_data = new Array();
                                    var B_class_array = new Array();
                                    var B_char,BB_char;
                                    var BB_count = 0;
                                    var B_count = 0,B_class_count=0;
                                      for (var i in result) {
                                          var info = result[i];
                                          //console.log(info.id +' ' + info.name + ': '+ info.sex);
                                          //console.log(info.p_id + ' ' + info.group_name + ' ' + info.code + ' ' + info.categoty + ' ' + info.type + ' ' + info.name + ' ' + info.subname + ' ' + info.coun_id + ' ' + info.county + ' ' + info.town_id + ' ' + info.town + ' ' + info.address + ' ' + info.mangt_add + ' ' + info.tel + ' ' + info.x + ' ' + info.y + ' ' + info.longitude + ' ' + info.latitude + ' ' + info.plvalue + ' ' + info.c1 + ' ' + info.c2);
                                          if(B_count == 0){
                                            B_char = info.c1;
                                            mysql_data[B_char] = new Array();
                                            B_class_array[B_count] = B_char;
                                            BB_char = info.c2;
                                            mysql_data[B_char][BB_char] = new Array();
                                            B_count++;
                                          }
                                          if(B_char != info.c1){
                                            B_char = info.c1;
                                            mysql_data[B_char] = new Array();
                                            B_class_array[B_count] = B_char;
                                            B_count++;
                                          }
                                          if(BB_char != info.c2){
                                            BB_char = info.c2
                                            mysql_data[B_char][BB_char] = new Array();
                                            BB_count = 0;
                                          }
                                          mysql_data[B_char][BB_char][BB_count] = new Array();
                                          mysql_data[B_char][BB_char][BB_count]['p_id'] = info.p_id;
                                          mysql_data[B_char][BB_char][BB_count]['group_name'] = info.group_name;
                                          mysql_data[B_char][BB_char][BB_count]['code'] = info.code;
                                          mysql_data[B_char][BB_char][BB_count]['categoty'] = info.categoty;
                                          mysql_data[B_char][BB_char][BB_count]['type'] = info.type;
                                          mysql_data[B_char][BB_char][BB_count]['name'] = info.name;
                                          mysql_data[B_char][BB_char][BB_count]['subname'] = info.subname;
                                          mysql_data[B_char][BB_char][BB_count]['coun_id'] = info.coun_id;
                                          mysql_data[B_char][BB_char][BB_count]['county'] = info.county;
                                          mysql_data[B_char][BB_char][BB_count]['town_id'] = info.town_id;
                                          mysql_data[B_char][BB_char][BB_count]['town'] = info.town;
                                          mysql_data[B_char][BB_char][BB_count]['address'] = info.address;
                                          mysql_data[B_char][BB_char][BB_count]['mangt_add'] = info.mangt_add;
                                          mysql_data[B_char][BB_char][BB_count]['tel'] = info.tel;
                                          mysql_data[B_char][BB_char][BB_count]['x'] = info.x;
                                          mysql_data[B_char][BB_char][BB_count]['y'] = info.y;
                                          mysql_data[B_char][BB_char][BB_count]['longitude'] = info.longitude;
                                          mysql_data[B_char][BB_char][BB_count]['latitude'] = info.latitude;
                                          mysql_data[B_char][BB_char][BB_count]['plvalue'] = info.plvalue;
                                          mysql_data[B_char][BB_char][BB_count]['c1'] = info.c1;
                                          mysql_data[B_char][BB_char][BB_count]['c2'] = info.c2;
                                          BB_count++;
                                        }
                                        result = {};
                                        for(var i=0; i < B_class_array.length; i++){
                                            result[B_class_array[i]] = {};
                                            result[B_class_array[i]]['data'] = {};
                                            var tem_conut=0;
                                            for(var j=0; j < class_array[B_class_array[i]].length; j++){
                                                result[B_class_array[i]]['data'][class_array[B_class_array[i]][j]] = {};
                                                
                                                if(typeof mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]] != 'undefined'){
                                                    result[B_class_array[i]]['data'][class_array[B_class_array[i]][j]] = new Array();
                                                    for(var l=0; l < mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]].length; l++){
                                                        result[B_class_array[i]]['data'][class_array[B_class_array[i]][j]].push({
                                                            "p_id" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['p_id'],
                                                            "group_name" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['group_name'],
                                                            "code" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['code'],
                                                            "categoty" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['categoty'],
                                                            "type" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['type'],
                                                            "name": mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['name'],
                                                            "subname" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['subname'],
                                                            "coun_id" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['coun_id'],
                                                            "county" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['county'],
                                                            "town_id" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['town_id'],
                                                            "town" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['town'],
                                                            "address" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['address'],
                                                            "mangt_add" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['mangt_add'],
                                                            "tel" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['tel'],
                                                            "x" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['x'],
                                                            "y" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['y'],
                                                            "longitude" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['longitude'],
                                                            "latitude" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['latitude'],
                                                            "plvalue" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['plvalue'],
                                                            "c1" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['c1'],
                                                            "c2" : mysql_data[B_class_array[i]][class_array[B_class_array[i]][j]][l]['c2']
                                                        });
                                                        tem_conut++;
                                                    }
                                                }
                                                result[B_class_array[i]]['sum'] = tem_conut;
                                            }
                                        }
                                        var outjsonstr = { "Result" : {"poi" : result}, "Status" : "OK"};
                                        res.send(outjsonstr);
                                    }
                                  });
                                }
                        });
                    
                  });

              }
              else{
                result = {};
                var outjsonstr = { "Result" : {"poi" : result}, "Status" : "Error"};
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