var isPhone = 0;
// var checkPhone = 0;
var isSms = 0;
var getSmsContent = 0;
// var getSmsPhone = 0;
var smsContent = "";
let isStop = true
let isMusic = 0
let musicName
let isGuess = 0
if (annyang) {

    annyang.setLanguage('zh-CN');
    console.log('ASR systeme has successfully launched!');
    annyang.addCallback('soundstart', function () {
        if (isStop) {
            audioControl()
            isStop = false
        }
        console.log('sound detected');
    });
    annyang.addCallback('result', function (phrases) {
        isStop = true
        console.log('Speech recognized. Possible sentences said:');
        console.log(phrases);
        audioControl()
        document.getElementById('userSay').innerHTML = '您说了：' + phrases[0]
        if (isPhone === 1) {
            try {
                // var phoneNum = parseInt(phrases[0]);

                window.location.href = "tel:" + phrases[0];
                // isPhone = 0;
                toVoice('好的，为您拨打' + phrases[0]);
            } catch {
                toVoice('抱歉，能再说一次');

            }
            // ToDo: 加入打电话逻辑
            return;
        } else if (isMusic === 1) {
            if (phrases[0].indexOf('猜歌名') !== -1) {
                toVoice('猜猜刚刚放了什么歌')
                isGuess = 1
            } else {
                chat(phrases[0])
            }
            isMusic = 0
        } else if (isGuess === 1) {
            if (phrases[0] === musicName) {
                toVoice('恭喜你猜对了')
            } else {
                toVoice('很遗憾，你猜错了。正确答案是' + musicName)
            }
        } else if (isSms === 1) {
            if (getSmsContent === 0) {
                smsContent = phrases[0];
                toVoice('发送' + smsContent + '。请说出电话号码');
                getSmsContent = 1;
                return;
            } else {
                try {
                    window.location.href = 'sms:' + phrases[0] + '?body=' + smsContent;
                    toVoice('发送' + smsContent + '到' + phrases[0]);

                } catch {
                    toVoice('没有听清电话号码，可以再说一次吗?');
                }
            }
        } else if (phrases[0].indexOf('电话') !== -1) {

            isPhone = 1;
            // 屏幕打出：请说出电话号码
            toVoice('请说出电话号码');

        } else if (phrases[0].indexOf('短信') !== -1) {
            isSms = 1;
            toVoice('请说出短信内容');
        } else if (phrases[0].indexOf('天气') !== -1) {
            var obj = {};
            var settings = {
                "url": "https://devapi.qweather.com/v7/weather/3d?location=101020500&key=4d8469f5fc0249b5b04528280d5cff3e",
                "method": "GET",
                "timeout": 0,
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                obj = response;
            });

            toVoice('今日天气: 最高温度' + obj.daily[0].tmpMax + '，最低温度' + obj.daily[0].tmpMin
                + '，日间天气: ' + obj.daily[0].textDay + '，夜间天气: ' + obj.daily[0].textNight);
            return;
        } else if (phrases[0].indexOf('听音乐') !== -1 || phrases[0].indexOf('来点音乐') !== -1) {
            randomMusic()
            isMusic = 1
        } else {
            chat(phrases[0]);
        }
        // reactTo(phrases[0]);
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
// function reactTo(sentence) {
//     // if (sentence.contains)
//     if (sentence.indexOf('电话') != -1) {
//
//     }
// }

// function makePhoneCall
// rgb to hex
function rgbToHex(r, g, b) {
    var hex = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
}

// hex to rgb
function hexToRgb(hex) {
    var rgb = [];
    for (var i = 1; i < 7; i += 2) {
        rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
    }
    return rgb;
}

// 计算渐变过渡色
function gradient(startColor, endColor, step) {
    // 将 hex 转换为rgb
    var sColor = hexToRgb(startColor),
        eColor = hexToRgb(endColor);

    // 计算R\G\B每一步的差值
    var rStep = (eColor[0] - sColor[0]) / step;
    gStep = (eColor[1] - sColor[1]) / step;
    bStep = (eColor[2] - sColor[2]) / step;

    var gradientColorArr = [];
    for (var i = 0; i < step; i++) {
        // 计算每一步的hex值
        gradientColorArr.push(rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])));
    }
    return gradientColorArr;
}

var gradArr = gradient('#becccc', '#ff8f6b', 15);

function change(color) {
    document.body.style.background = color;
    console.log(color);
}

function _change(color) {
    return function () {
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

function reRender() {
    document.body.style.display = 'none';
    setTimeout(function () {
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
        if (n) {
            setTimeout(change, t)
        } else {
            setTimeout(change, t)
        }
    }

    change()
}


function testCanvasOnClick() {
    try {
        if (i++ % 2 === 0) {
            annyang.resume();
            console.log('Ann yang started listening!');
            console.log(annyang.isListening());
        } else {
            annyang.pause();
            console.log('Ann yang paused!');
            console.log(annyang.isListening());
        }
        // var targetColor = new THREE.Color();
        // var targetColor ='#ff8f6b';
        // }(,143,107)
        changeColor();

    } catch (e) {
        console.log(e);
        console.log('Ann yang not launched!');
    }
}

function seeBase64() {
    console.log(document.getElementById('aud').src)
    fetch(document.getElementById('aud').src).then(data => {
        const blob = data.blob()
        return blob;
    }).then(blob => {
        let reader = new window.FileReader()
        reader.onloadend = function () {
            const data = reader.result
            console.log('视频base64地址：', data)
        }
        reader.readAsDataURL(blob)
    })
    return data
}
