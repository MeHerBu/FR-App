$(function(){

    /**
    画像読み込み
    **/
    $.each($(".facial-image"), function(index,val) {

        var that = $(this);
        var img = new Image();
        img.src = that.attr("src");
        img.onload = function() {

            //プログラムの実行
            that.faceDetection({
                //正常に画像を読み込めた場合
                complete: function (obj){
                    draw(obj,index);
                },
                //画像取得に失敗した場合
                error:function(code,message){
                    alert("Error:" + message);
                }
            });
        }

    });

    /**
    フレームの画像名格納
    **/
    var frame = ['test','test','test','test','test','test','test'];

    /**
    画像のせる処理
    **/
    function draw(obj,index) {
        //顔を認識できなかった(objにデータがない)場合
        if(typeof(obj)=="undefined"){

            alert("顔情報を認識できませんでした…。");
            return false;

            //顔を認識できた場合
        }else{

            //テキストエリアに表示するためのデータ
            var object_str = "";

            //人数分だけループ処理する
            for (var i=0;i<obj.length;i++){

                //取得したデータをテキストエリアに表示していくためのデータ
                object_str += "[No: "+i+"]"+"\n";
                object_str += "x: "+obj[i].x+"\n";
                object_str += "y: "+obj[i].x+"\n";
                object_str += "width: "+obj[i].width+"\n";
                object_str += "height: "+obj[i].height+"\n";
                object_str += "positionX: "+obj[i].positionX+"\n";
                object_str += "positionY: "+obj[i].positionY+"\n";
                object_str += "offsetX: "+obj[i].offsetX+"\n";
                object_str += "offsetY: "+obj[i].offsetY+"\n";
                object_str += "scaleX: "+obj[i].scaleX+"\n";
                object_str += "scaleY: "+obj[i].scaleY+"\n";
                object_str += "confidence: "+obj[i].confidence+"\n\n";

                // 上にのせる画像をアペンド
                $(".facial-image-wrapper").eq(index).append('<div class="cover cover-no'+i+'"></div>');

                $(".facial-image-wrapper").eq(index).find(".cover-no"+i).css({
                    top:obj[i].positionY + "px",
                    left:obj[i].positionX + "px",
                    width:obj[i].width + "px",
                    height:obj[i].height + "px",
                    backgroundImage :'url(./src/frame/'+ frame[i] +'.png)'
                });

            }

            //取得したデータをテキストエリアに表示
            $("#facial-data").val(object_str).css("height",(object_str.split("\n").length+5)+"em");

        }

    }

});