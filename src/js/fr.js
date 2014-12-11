$(function(){

// --------------------------------------------------------
// 関数定義
// --------------------------------------------------------
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var $html =
                    '<output>' +
                        ['<img class="up_photo" src="', e.target.result,'" title="', escape(theFile.name), '"></output>'].join('') +
                    '</output>';

                $('main').append($html);
            };
        })(f);

        reader.readAsDataURL(f);
    }
}



// --------------------------------------------------------
// Ready時実行
// --------------------------------------------------------
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    $input_camera = $('#input_camera');
    $btn_camera = $('.btn_camera');

    $input_camera.on('change', handleFileSelect);

    $input_camera.on('mousedown touchstart', function(){
        $btn_camera.toggleClass('btn_camera-on');
    });

    $input_camera.on('mouseup touchend mouseout', function(){
        $btn_camera.removeClass('btn_camera-on');
    });

} else {
    alert('お使いのブラウザはサポートしておりません');
}


});