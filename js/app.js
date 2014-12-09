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

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                var $html = ['<img class="photo" src="', e.target.result,'" title="', escape(theFile.name), '">'].join('');
                $('output').append($html);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}



// --------------------------------------------------------
// Ready時実行
// --------------------------------------------------------
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#files').on('change', handleFileSelect);
} else {
    alert('お使いのブラウザはサポートしておりません');
}

});