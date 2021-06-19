function randomMusic() {
    $.ajax({
        type: "get",
        url: "https://api.uomg.com/api/rand.music?sort=热歌榜&format=json",
        dataType: "JSON",
        jsonP: "callback",
        data: {},
        success: function (response) {
            console.log(response);
            let src = response['data']['url']
            document.getElementById('listen').innerHTML = "<audio autoplay=\"autoplay\">" +
                "<source src=" + src + ' type=\"audio/mpeg\">' +
                "</audio>"

        },
        error: function (str) {
        }
    });
}