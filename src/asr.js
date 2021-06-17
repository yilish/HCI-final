if (annyang) {

    // annyang.setLanguage('zh-CN');
    console.log('ASR systeme has successfully launched!');
    annyang.addCallback('soundstart', function() {
        console.log('sound detected');
    });
    annyang.addCallback('result', function(phrases) {
        console.log('Speech recognized. Possible sentences said:');
        console.log(phrases);

        // Todo: 加入返回值的逻辑
    });
    annyang.pause();
    console.log(annyang.isListening());
    // Add our commands to annyang
    // annyang.addCommands(commands);

    // Start listening.
    // annyang.start();
}
var targetColor = '#ff8f6b';
// rgb to hex
function rgbToHex(r, g, b){
    var hex = ((r<<16) | (g<<8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length-7)).join("0") + hex;
}

// hex to rgb
function hexToRgb(hex){
    var rgb = [];
    for(var i=1; i<7; i+=2){
        rgb.push(parseInt("0x" + hex.slice(i,i+2)));
    }
    return rgb;
}

// 计算渐变过渡色
function gradient (startColor,endColor,step){
    // 将 hex 转换为rgb
    var sColor = hexToRgb(startColor),
        eColor = hexToRgb(endColor);

    // 计算R\G\B每一步的差值
    var rStep = (eColor[0] - sColor[0]) / step;
    gStep = (eColor[1] - sColor[1]) / step;
    bStep = (eColor[2] - sColor[2]) / step;

    var gradientColorArr = [];
    for(var i=0;i<step;i++){
        // 计算每一步的hex值
        gradientColorArr.push(rgbToHex(parseInt(rStep*i+sColor[0]),parseInt(gStep*i+sColor[1]),parseInt(bStep*i+sColor[2])));
    }
    return gradientColorArr;
}

var gradArr = gradient('#becccc', '#ff8f6b', 15);

function change(color) {
    document.body.style.background = color;
    console.log(color);
}

function _change(color) {
    return function() {
        change(color);
    }
}
/**
 *  睡眠函数
 *  @param numberMillis -- 要睡眠的毫秒数
 */
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
function reRender(){
    document.body.style.display = 'none';
    setTimeout(function(){
        document.body.style.display = 'block';
    }, 0);
}
function changeColor() {
    var arr = gradArr;
    var t = 1000 / 15
    var n = false
    var body = document.querySelector('body')
    // body.style.transition = 'background-color'
    var i = 0;
    function change() {
        n = !n
        // var v = arr.shift()
        body.style.backgroundColor = gradArr[i++];
        if (i > 15) {
            gradArr.reverse();
            return;
        }
        // arr.push(v)
        if(n) {
            setTimeout(change, t)
        } else {
            setTimeout(change, t)
        }
    }

    change()
}


var i = 0;
function testCanvasOnClick() {
    try {
        if (i++ % 2 === 0) {
            annyang.resume();
            console.log('Ann yang started listening!');
            console.log(annyang.isListening());
        }
        else {
            annyang.pause();
            console.log('Ann yang paused!');
            console.log(annyang.isListening());
        }
        // var targetColor = new THREE.Color();
        // var targetColor ='#ff8f6b';
        // }(,143,107)
        changeColor();

    }
    catch(e) {
        console.log(e);
        console.log('Ann yang not launched!');
    }
}