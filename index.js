

const http = require("http")
const fs = require("fs")    
var requests = require('requests');
const homeFile = fs.readFileSync("home.html", "utf-8")
const replaceVal =(tempVal,orgVal)=>
{
    let main =tempVal.replace("{%temp%}",orgVal.main.temp);
    main =main.replace("{%temp_min%}",orgVal.main.temp_min);
    main =main.replace("{%temp_max%}",orgVal.main.temp_max);
    main =main.replace("{%country%}",orgVal.sys.country);
    main =main.replace("{%name%}",orgVal.name);
    return main;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("http://api.openweathermap.org/data/2.5/weather?q=Lahore&units=metric&appid=4682cf703f9f5dfe0a00c7e56bfe37c1")
            .on("data", (chunk) => {
                const objdata =JSON.parse(chunk)
                const arrData=[objdata]
                // console.log(arrData[0][0].lat)
                const realTimeData =arrData.map((val)=>replaceVal(homeFile,val)).join("");
                res.write(realTimeData);
                // console.log(realTimeData);
                
            })
            .on("end", (err) => {
                if (err) return console.log("conn lost", err)
                res.end()
            })
    }



})
server.listen(7000, "127.0.0.1");

// [
//     [
//       {
//         name: 'Pune',
//         local_names: [Object],
//         lat: 18.521428,
//         lon: 73.8544541,
//         country: 'IN',
//         state: 'Maharashtra'
//       }
//     ]
//   ]
//   end
//   [
//     [
//       {
//         name: 'Pune',
//         local_names: [Object],
//         lat: 18.521428,
//         lon: 73.8544541,
//         country: 'IN',
//         state: 'Maharashtra'
//       }
//     ]
//   ]