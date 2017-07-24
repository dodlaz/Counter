var counts = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
var nameList = [ 'Erytroblast', 'Neutrophilic metamyelocyte', 'Other', 'Other', 'Neutrophilic band ', 'Neutrophilic segmented', 'Lymphocyte', 'Basophil', 'Eosinophil', 'Monocyte' ];
var min = 0;
var max = 100;
var shift = false;

var leu = document.getElementById('leu');



var adBlockEnabled = false;
var testAd = document.createElement('div');
testAd.innerHTML = '&nbsp;';
testAd.className = 'adsbox';
document.body.appendChild(testAd);
window.setTimeout(function() {
    if (testAd.offsetHeight === 0) {
        adBlockEnabled = true;
    }
    testAd.remove();
    if(adBlockEnabled){
        b("");
    }
}, 500);


$(document).ready(function() {
  setTimeout(function(){
    if($("img").css('display') == "none") {
        b(".");
    }
  }, 500);
});

function b(text){
    var text = "This site will not work until add blocker is turned off"+text;
    alert(text);
    var myNode = document.getElementById("body");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    myNode.innerHTML = text;
}

//===========================================


leu.onkeypress = function(e) {
    return (( event.charCode >= 48 
              && event.charCode <= 57 ) 
            || event.key == '.' ) 
        && leu.value <= 500;
}
leu.onkeyup = function(e) {
    if(e.key == 'Enter' || (leu.value.split(".")[1] || []).length > 2){
        leu.blur();
    }
    updateGui();
    return false;
}

document.onkeydown = function checkKey(e) {
    if( leu !== document.activeElement ){
        e = e || window.event;
        if(e.key == 'Shift') {
            shift=true;
        }
        color();
    }
}

document.onkeyup = function checkKey(e) {
    if( leu !== document.activeElement ){
        e = e || window.event;
        if(e.key == 'Shift') {
            shift=false;
        }else{
            document.getElementById('helpView').style.display='none';
        }
        
        if(document.getElementById('resetConfirmView').style.display =='block'){
            if(e.key == 'y' || e.key == 'Enter') {
                resetNow();
            }else{
                document.getElementById('resetConfirmView').style.display='none';
            }
        }
        if(e.key == 'r') {
            reset();
        }
        
        if(e.key == '?') {
            document.getElementById('helpView').style.display='block';
        }
        
        color();
        for (i = 0; i < 10; i++) {
            if(e.key == i) {
                count(i);
                update();
            }
        }
    }
}
    
function color() {
    if(shift) {
        document.getElementById("counter").style.backgroundColor = "#373276";
    }else{
        document.getElementById("counter").style.backgroundColor = "#625D9C";
    }
}

function update() {
    document.getElementById("tot").innerHTML = "Total: " + total();
    updateGui();
}

function updateGui() {
    document.getElementById("t0").innerHTML = "<p>[0]<br>"+nameList[0]+"</p>" + counts[0];
    for (i = 1; i < 10; i++) {
        document.getElementById("t"+i).innerHTML = "<p>["+i+"]<br>"+nameList[i] + "</p>" + counts[i] + "%,<br>" + Math.round(((counts[i]/max)*leu.value)*100)/100 + "<div class='unit'>x10<code><sup>9</sup></code>l</div>";
    }
}

function total() {
    var tot = 0;
    for(var i = 1; i < counts.length; i++){
        tot += counts[i];
    }
    if(tot == 100){
        document.getElementById("tot").style.backgroundColor = "#37BB76";
    }else{
        document.getElementById("tot").style.backgroundColor = "#191550";
    }
    return tot;
}

function count(i) {
    if(shift){
        if(total() > min && counts[i] > min){
            counts[i]--;
        }
    } else if(total() < max){
        counts[i]++;
        window.navigator.vibrate(200);
    }
}

var resetConfirm = document.getElementById('resetConfirm');
var help = document.getElementById('help');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == resetConfirm) {
        resetConfirm.style.display = "none";
    } else if (event.target == help) {
        help.style.display = "none";
    }
}

function resetNow() {
    counts = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    update();
    document.getElementById('resetConfirmView').style.display='none';
    leu.value = '';
}
function reset() {
    document.getElementById('resetConfirmView').style.display='block';
}



document.getElementById("t0").onclick = function() { count(0); update(); };
document.getElementById("t1").onclick = function() { count(1); update(); };
document.getElementById("t2").onclick = function() { count(2); update(); };
document.getElementById("t3").onclick = function() { count(3); update(); };
document.getElementById("t4").onclick = function() { count(4); update(); };
document.getElementById("t5").onclick = function() { count(5); update(); };
document.getElementById("t6").onclick = function() { count(6); update(); };
document.getElementById("t7").onclick = function() { count(7); update(); };
document.getElementById("t8").onclick = function() { count(8); update(); };
document.getElementById("t9").onclick = function() { count(9); update(); };
document.getElementById("reset").onclick = function() { reset(); };

update();
leu.focus();

