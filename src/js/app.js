$(function(){

// --------------------------------------------------------
// 変数設定
// --------------------------------------------------------
var $button__play = $('#button__play');


// --------------------------------------------------------
// 関数定義
// --------------------------------------------------------
// 乱数発生関数
function createRand(mn, mx){
    r = Math.round(Math.random() * (mx - mn)) + mn;
    return r;
}

// あっち向いてほい
function hoi(){
    var PC_Num = '';
    var arrow = '';
    var NPC = createRand(1, 4);
    var PC = createRand(1, 4); // ユーザーの向き（ダミー）

    // CPUの向き
    switch(NPC){
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

    // 数秒後結果画面
    setTimeout(function(){
        if(PC == NPC){
            alert(arrow + ' : 負け');
        } else {
            alert(arrow + ' : 勝ち');
        }
    }, 100);

}


// --------------------------------------------------------
// トリガー
// --------------------------------------------------------
$button__play.on('click', function(){
    hoi();
    return false;
});



// --------------------------------------------------------
// アニメ
// --------------------------------------------------------
// function anime(){
//     $('output').velocity({
//         margin: '0px'
//     }, 300, 'easeInOut')
//     .velocity({
//         marginTop: '+=50px'
//     }, 300, 'easeInOut')
//     .velocity({
//         marginTop: '-=50px'
//     }, 300, 'easeInOut')
//     .velocity({
//         marginLeft: '+=50px'
//     }, 300, 'easeInOut')
//     .velocity({
//         marginLeft: '-=50px'
//     }, 300, 'easeInOut', anime);
// }


// --------------------------------------------------------
// Ready時実行
// --------------------------------------------------------
// anime();

});