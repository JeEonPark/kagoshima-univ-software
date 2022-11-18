$(function() {

    //Graph Class

    var Graph = class {
        //Constructor
        constructor(ctx) {
            this.ctx = ctx;
        }

        //Clear
        clear(){
            ctx.clearRect(0, 0, 640, 480);
        }
        
        //Stroke Ellipse
        ellipseS(x, y, w, h, a) {
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, w, h, a*Math.PI/180, 0, 2*Math.PI);
            this.ctx.stroke();
        }

        //Fill Ellipse
        ellipseF(x, y, w, h, a) {
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, w, h, a*Math.PI/180, 0, 2*Math.PI);
            this.ctx.fill();
        }
    }

    //Dragon Fly Class
    var Dragonfly = class {
        //Constructor
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.costume = 0;
        }

        //hirogeteiru
        drawOpen(gra) {
            gra.ellipseF(this.x, this.y, 5, 5, 0);
            gra.ellipseS(this.x, this.y+25, 5, 20, 0);
            gra.ellipseF(this.x+23, this.y, 20, 5, -15);
            gra.ellipseF(this.x-23, this.y, 20, 5, 15);
            gra.ellipseS(this.x+23, this.y+15, 20, 5, 15);
            gra.ellipseS(this.x-23, this.y+15, 20, 5, -15);
        }

        //tojiteiru
        drawClose(gra) {
            gra.ellipseF(this.x, this.y, 5, 5, 0);
            gra.ellipseS(this.x, this.y+25, 5, 20, 0);
            gra.ellipseF(this.x+23, this.y+5, 20, 5, 0);
            gra.ellipseF(this.x-23, this.y+5, 20, 5, 0);
            gra.ellipseS(this.x+23, this.y+10, 20, 5, 0);
            gra.ellipseS(this.x-23, this.y+10, 20, 5, 0);
        }

        //draw
        draw(gra) {
            if(this.costume%2 == 0) {
                this.drawOpen(gra);
            } else {
                this.drawClose(gra);
            }
        }

        changeCostume() {
            this.costume++;
        }

        move(dx) {
            this.x += dx;
        }
    }

    //About Message
    var showAboutMessage = function() {
        alert("トンボゲーム\n2022\nSoftware Engineering II");
    }

    //When key down
    var keyDown = function() {
        switch(ev.which) {
            case 37: key_l = true; break;
            case 39: key_r = true; break;
        }
    }

    //When key up
    var keyUp = function() {
        switch(ev.which) {
            case 37: key_l = false; break;
            case 39: key_r = false; break;
        }
    }

    var can = $("#can");
    var ctx = can[0].getContext("2d");
    var gra = new Graph(ctx);
    var df = new Dragonfly(320, 420);
    var key_l = false;
    var key_r = false;

    //Event Handler
    $("#bt_about").click(showAboutMessage);
    can.keydown(keyDown);
    can.keyup(keyUp);

    var lap = 0;
    var exec = function() {
        gra.clear();
        df.draw(gra);
        if(key_l) df.move(-4);
        if(key_r) df.move(4);
        df.changeCostume();
        lap++;
    }

    can.attr("tabindex", 0);
    setInterval(exec, 100);
    
});