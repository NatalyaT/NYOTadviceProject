function getRandColor(brightness){

    // Six levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)});
    document.body.style.backgroundColor = "rgb(" + rgb.join(",") + ")";
    document.getElementById("advice").style.color = "rgb(" + rgb.join(",") + ")";
    console.log(mixedrgb.join("'"));
}

function startTime() {
    var today = new Date();
    var hrs = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var ampm = "";
    min = checkTime(min);

    if (hrs > 12) {
    	hrs = hrs - 12;
    	ampm = " PM";
    } else if (hrs == 12){
        hrs = 12;
    	ampm = " AM";
    } else if (hrs < 12){
        ampm = " AM";
    } else {
        ampm = "PM";
    };
  
  if(hrs == 0) {
    hrs=12;
  }
    
    document.getElementById('display').innerHTML = hrs+":"+min+ampm;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function startDate() {
  var d = new Date();
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  document.getElementById("date").innerHTML = days[d.getDay()]+" | "+[d.getMonth()+1]+"/"+d.getDate()+"/"+d.getFullYear();
}

let request = new XMLHttpRequest();
let url = "https://api.adviceslip.com/advice";
request.open("GET", url, true)

//Begin acessing JSON data here
request.onload = function(){
    let data = JSON.parse(this.response);
    let advice = document.getElementById('advice');
    
    if (request.status >= 200 && request.status < 400) {
      //console.log('data', data)
      //advice.innerHTML = data.slips[0].advice;
      advice.textContent = data["slip"]["advice"];
      getRandColor(12)
    }
}
request.send()