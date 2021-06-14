function chat(text, city = '上海', province = '上海', street = '曹阳公路') {
    var obj = {
        "perception": {
            "inputText": {
                "text": "你好"
            }
        },
        "userInfo": {
            "apiKey": "7bb5c24488504ac699f18360918ff8cd",
            "userId": "716064"
        },

    }
    $.ajax({
        type: "get",
        url: "http://www.tuling123.com/openapi/api",
        dataType: "JSON",
        jsonP: "callback",
        data: {
            'key': '7bb5c24488504ac699f18360918ff8cd',
            'info': text,
            'userid': '716064'
        },
        success: function (str) {
            toVoice(str.text)
        },
        error: function (str) {
        }
    });
}

function toVoice(text) {
    var zhText = text;
    zhText = encodeURI(zhText);
    console.log(zhText)

    document.getElementById('listen').innerHTML = "<audio autoplay=\"autoplay\">" +
        "<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=7&text=" + zhText + "\" type=\"audio/mpeg\">" +
        "</audio>"

    //document.getElementById('listen').write("<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=7&text="+ zhText +"\" type=\"audio/mpeg\">");
    //document.write("<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text="+ zhText +"\">");
    //document.getElementById('listen').write("</audio>");
}