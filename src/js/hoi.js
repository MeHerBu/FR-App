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
    var USR = createRand(1, 4); // ユーザーの向き（ダミー）
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
    if(USR == CPU){
        resultGame = false;
        $msgTitle.text('負け');
        $msgBody.text('残念でした！');
    } else {
        resultGame = true;
        $msgTitle.text('勝ち');
        $msgBody.text('おめでとう！');
    }

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
    // 初回の場合
    if(resultGame == '') {
        waitGame();
    } else {
    // ゲーム完了後は、ボタンを押すとリロードする
        window.location.reload(true);
    }
    return false;
});

});