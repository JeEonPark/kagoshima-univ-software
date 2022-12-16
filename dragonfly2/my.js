$(function () {
    var Dragonfly = class {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.key_l = false;
            this.key_r = false;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.ellipse(this.x - 10, this.y - 10, 20, 20, 0, 0, 2 * Math.PI);
            ctx.fill();
        }

        move(){
            if(this.key_l) this.x -= 4;
            if(this.key_r) this.x += 4;
        }

        keyDown(ev) {
            switch(ev.which) {
                case 37: this.key_l = true; break;
                case 39: this.key_r = true; break;   
            }
        }

        keyUp(ev) {
            switch(ev.which) {
                case 37: this.key_l = false; break;
                case 39: this.key_r = false; break;   
            }
        }
    }

    keyDown(ev) {
        switch(ev.which) {
            case 37: this.key_l = true; break;
            case 39: this.key_r = true; break;   
        }
    }

    keyUp(ev) {
        switch(ev.which) {
            case 37: this.key_l = false; break;
            case 39: this.key_r = false; break;   
        }
    }
    
    var can = $("#can");
    var ctx = can[0].getContext("2d");
    var df = new Dragonfly(320, 400);
    var key_l = false;
    var key_r = false;

    can.keydown(df.keyDown);
    can.keyup(df.keyUp);

    var exec = function() {
        ctx.clearRect(0, 0, 640, 480);
        df.move();
        df.draw(ctx);
    }

    can.attr("tabindex", 0);
    setInterval(exec, 10);

});