$(function(){

// --------------------------------------------------------
// 変数設定
// --------------------------------------------------------
var waiteTime = 1500; // 待ち時間
var resultGame = ''; // 勝ち負けフラグ

// DOM
var $buttonPlay = $('.js-buttonPlay');
var $msgTitle = $('.js-msgTitle');
var $msgBody = $('.js-msgBody');



// --------------------------------------------------------
// 関数定義
// --------------------------------------------------------
// 乱数発生関数
function createRand(mn, mx){
    r = Math.round(Math.random() * (mx - mn)) + mn;
    return r;
}


// ゲーム結果判定
function judgeGame(){
    var CPU = createRand(1, 4); // コンピューター
    var USR = judge(); // ユーザーの向き
    var arrow = ''; // 矢印の向き（あとで画像が入る予定）

    // CPUの向き
    switch(CPU){
        case 1:
            arrow = '↑';
            break;
        case 2:
            arrow = '→';
            break;
        case 3:
            arrow = '↓';
            break;
        case 4:
            arrow = '←';
            break;
    }

    // 勝ち負け判定
    if(USR == 0){
        $msgTitle.text('ちゃんとやって！');
        $msgBody.text('もう一回！');
    }else if(USR == CPU){
        resultGame = false;
        $msgTitle.text('負け');
        $msgBody.text('残念でした！');
    } else {
        resultGame = true;
        $msgTitle.text('勝ち');
        $msgBody.text('おめでとう！');
    }

    console.log('USR:'+USR+'/CPU:'+CPU);

    // ボタン再表示し文言を変更
    $buttonPlay.show().text('Again');
}


// ユーザーが首を振る間の待ち時間（ダミーで数秒後に自動的に結果が出るようにしている）
function waitGame(){
    $buttonPlay.hide();
    $msgTitle.text('あっち向いて〜...');
    $msgBody.text('ドキドキ!!');

    $msgTitle
    .velocity({
        translateX: '+=100px'
    }, { duration: waiteTime / 16, easing: 'ease-in-out', loop: 2})
    .velocity({
        translateY: '+=100px'
    }, { duration: waiteTime / 16, easing: 'ease-in-out', loop: 2});

    setTimeout(function(){

        judgeGame();

    }, waiteTime);
}


// --------------------------------------------------------
// トリガー
// --------------------------------------------------------
$buttonPlay.on('click', function(){

    if(startFlg == 0) return;

    // 初回の場合
    if(resultGame == '') {
        waitGame();
    } else {
    // ゲーム完了後は、ボタンを押すとリロードする
        window.location.reload(true);
    }

    //  顔認証スタート
    vid.play();
    ctrack.start(vid);
    drawLoop();

    return false;

});


// --------------------------------------------------------
// 顔認証
// --------------------------------------------------------
var point0 = 0,
point1 = 0,
point13 = 0,
point22 = 0,
point26 = 0,
point37 = 0,
rDiff = 0,
lDiff = 0,
diff = 0,
startFlg = 0,
positionArray = [];

var vid = document.getElementById('videoel');
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');

var ctrack = new clm.tracker({useWebGL : true});
ctrack.init(pModel);

/*
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.getElementById('container').appendChild( stats.domElement );
*/

function enablestart() {
    startFlg = 1;
}

var insertAltVideo = function(video) {
    if (supports_video()) {
        if (supports_ogg_theora_video()) {
            video.src = "./media/cap12_edit.ogv";
        } else if (supports_h264_baseline_video()) {
            video.src = "./media/cap12_edit.mp4";
        } else {
            return false;
        }
        //video.play();
        return true;
    } else return false;
}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// check for camerasupport
if (navigator.getUserMedia) {
    // set up stream

    var videoSelector = {video : true};
    if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
        var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
        if (chromeVersion < 20) {
            videoSelector = "video";
        }
    }

    navigator.getUserMedia(videoSelector, function( stream ) {
        if (vid.mozCaptureStream) {
            vid.mozSrcObject = stream;
        } else {
            vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }
        vid.play();
    }, function() {
        insertAltVideo(vid);
        document.getElementById('gum').className = "hide";
        document.getElementById('nogum').className = "nohide";
        alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
    });
} else {
    insertAltVideo(vid);
    document.getElementById('gum').className = "hide";
    document.getElementById('nogum').className = "nohide";
    alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
}


vid.addEventListener('canplay', enablestart, false);

function drawLoop() {
    requestAnimFrame(drawLoop);
    overlayCC.clearRect(0, 0, 400, 300);

    if (ctrack.getCurrentPosition()) {
        ctrack.draw(overlay);
    }
}

// update stats on every iteration
document.addEventListener('clmtrackrIteration', function(event) {
    stats.update();
}, false);


// 方向判定
function judge(){

    vid.pause();
    ctrack.stop(vid);

    var result = 0;
    positionArray = ctrack.getCurrentPosition();
    point1 = positionArray[1];
    point13 = positionArray[13];
    point37 = positionArray[37];
    point22 = positionArray[22];
    point26 = positionArray[26];
    point0 = positionArray[0];
    rDiff = point37[0] - point1[0];
    lDiff = point13[0] - point37[0];
    diff = rDiff - lDiff;

    if( diff < 15  &&  diff > -15){
        if( point0[1] < point22[1] ){
            result = 1;//下
        }else if(point26[1] < point0[1]){
            result = 2; //上
        }
    }else if( rDiff < lDiff ){
        result = 3; //右
    }else{
        result = 4; //左
    }

    return result;

}


});





