$(function() {
    //About Message
    var showAboutMessage = function() {
        alert("トンボゲーム\n2022\nSoftware Engineering II");
    }

    //Event Handler
    $("#bt_about").click(showAboutMessage);

    var can = $("#can");
    var ctx = can[0].getContext("2d");

    ctx.beginPath();
    ctx.ellipse(100, 100, 5, 5, 0, 0, 2*Math.PI);
    
    ctx.fill();

    ctx.ellipse(100, 135, 30, 5, 270*Math.PI/180, 0, 2*Math.PI);
    ctx.stroke();
});