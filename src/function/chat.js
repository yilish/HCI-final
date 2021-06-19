function chat(text) {
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
            console.log('emm')
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
    document.getElementById('response').innerHTML = text

}