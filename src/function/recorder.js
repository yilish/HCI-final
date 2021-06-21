let audioControl;

var i = 0;
const constraints = {audio: true};
if (navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices.getUserMedia(constraints).then(
        stream => {

            console.log("授权成功！");
            const recordBtn = document.querySelector(".record-btn");
            const mediaRecorder = new MediaRecorder(stream);
            // audioControl = function () {
            //     console.log('1');
            //     if (mediaRecorder.state === "recording") {
            //         mediaRecorder.stop();
            //         // annyang.abort();
            //         recordBtn.textContent = "record";
            //         console.log("录音结束");
            //     } else {
            //         mediaRecorder.start();
            //         annyang.resume();
            //         console.log("录音中...");
            //         recordBtn.textContent = "stop";
            //     }
            //     console.log("录音器状态：", mediaRecorder.state);
            // };

            const chunks = [];
            mediaRecorder.ondataavailable = function (e) {
                chunks.push(e.data);
            };

            mediaRecorder.onstop = e => {
                var blob = new Blob(chunks, {type: "audio/wav; codecs=opus"});

                // console.log(blob.size)
                // console.log('dasdsadjasoidjo')
                // console.log(blob)

                // console.log(blob.arrayBuffer());
                // chunks = [];
                var audioURL = window.URL.createObjectURL(blob);
                var audio = document.getElementById('aud');
                audio.src = audioURL;
                // console.log(audioURL);
                // console.log(audioURL);
                var reader = new FileReader();
                
                reader.readAsDataURL(blob);
            };
        },
        () => {
            console.error("授权失败！");
        }
    );
} else {
    console.error("浏览器不支持 getUserMedia");
}