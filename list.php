<!DOCTYPE HTML>
<html lang="ja-JP">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="shortcut icon" href="img/icon.png">
<link rel="apple-touch-icon-precomposed" href="img/icon.png">
<title>顔面占い</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <h1>顔面占い</h1>

    <section id="list">
<?php

$dirPath = "./cap/";

if ($dir = opendir($dirPath)) {
    while (($file = readdir($dir)) !== false) {
        if ($file != "." && $file != "..") {
            $title = basename($file , ".jpg");
            echo '<dl>';
            echo '<dt>' . $title . '</dt>';
            echo '<dd><img src="' . $dirPath . $file . '"></dd>';
            echo '</dl>';
        }
    }
    closedir($dir);
}
?>
    </section>

    <a href="./" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Retry</a>
    <fotter><img src="img/icon.png" alt="MeHer"></fotter>
</div>
</body>
</html>