$(function () {

    var bt_001_clicked = function (ev) {
        var h1_001 = $("#h1_001");
        var p_001 = $("#p_001");
        var p_002 = $("#p_002");
        var p_003 = $("#p_003");

        p_001.text("text():" + p_003.text());
        p_002.text("html():" + p_003.html());
    }

    var bt_002_clicked = function (ev) {
        var h2_001 = $("#h2_001");
        var ul_001 = $("#ul_001");
        for (var i = 0; i < 5; i++) {
            ul_001.append($("<li>追加した" + (i + 1) + "個目の項目</li>"));
        }
    }
    var bt_003_clicked = function (ev) {
        var a_001 = $("#a_001");
        a_001.attr("href", "link2.html");
        a_001.text("リンク先を変更");
    }

    var bt_004_clicked = function (ev) {
        var p_003 = $("#p_003");
        p_003.css("color", "#ff0000");
    }

    var bt_back_clicked = function (ev) {
        history.back();
    }

    $("#bt_001").click(bt_001_clicked);
    $("#bt_002").click(bt_002_clicked);
    $("#bt_003").click(bt_003_clicked);
    $("#bt_004").click(bt_004_clicked);
    $("#bt_back").click(bt_back_clicked);
});