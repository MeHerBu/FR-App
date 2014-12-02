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

    <section id="cap">
<?php
if (is_uploaded_file($_FILES["capture"]["tmp_name"]) && ($_POST['myname'] != "")){

    $$dirPath = "./cap/";
    $fileName = $_POST['myname'] . ".jpg";

    move_uploaded_file($_FILES["capture"]["tmp_name"], $$dirPath . $fileName);

    echo "<p>アップロード完了</p>";
    echo '<p><img src="' . $$dirPath . $fileName . '"></p>';
} else {
    echo "<p>ちゃんとアップロードしてくださいよ</p>";
}
?>
    </section>

    <a href="./" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Retry</a>
    <a href="list.php" class="btn btn-default btn-lg">List<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
    <fotter><img src="img/icon.png" alt="MeHer"></fotter>
</div>
</body>
</html>