#bin/bash

#{	_id: 1,	name: 'Lásaro Dumer',	loginName: 'lasaro.dumer',	password: 'xuxu',	sysAdmin: true;}
echo '{"loginName":"lasaro.dumer","password":"xuxu"}' | curl -d @- http://localhost:3000/api/user/login
#--header "Content-Type:application/json"
echo ""
echo "{\"name\": \"Lásaro Dumer\",\"loginName\": \"lasaro.dumer\",\"password\": \"xuxu\"}" | curl -d @- http://localhost:3000/api/user
echo ""
curl -G http://localhost:3000/api/user
echo ""