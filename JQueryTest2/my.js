$(function () {
    var photonum = 1;
    $("#im_001").attr("tabindex", 0);
    
    var f = function (ev) {
        if (photonum == 1) {
            $("#im_001").attr("src", "cat1.jpg");
            $("#h2_001").text("猫の画像");
            photonum = 2;
        } else if (photonum == 2) {
            $("#im_001").attr("src", "dog1.jpg");
            $("#h2_001").text("犬の画像");
            photonum = 1;
        }
    }

    var f_enter = function (ev) {
        $("#im_001").attr("src", "panda1.jpg");
        $("#h2_001").text("Pandaの画像");
    }

    var f_leave = function (ev) {
        if (photonum == 2) {
            $("#im_001").attr("src", "cat1.jpg");
            $("#h2_001").text("猫の画像");
        } else if (photonum == 1) {
            $("#im_001").attr("src", "dog1.jpg");
            $("#h2_001").text("犬の画像");
        }
    }

    var key_down = function (ev) {
        if (ev.key == 'd') {
            $("#im_001").attr("src", "dog1.jpg");
            $("#h2_001").text("犬の画像");
        } else if (ev.key == "c") {
            $("#im_001").attr("src", "cat1.jpg");
            $("#h2_001").text("猫の画像");
        } else if (ev.key == "p") {
            $("#im_001").attr("src", "panda1.jpg");
            $("#h2_001").text("Pandaの画像");
        }
        
    }

    $("#im_001").mouseenter(f_enter);
    $("#im_001").mouseleave(f_leave);
    $("#bt_001").click(f);
    $("#im_001").keydown(key_down);


});