$(function () {
    var Dragonfly = class {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        draw(ctx) {
            ctx.biginPath();
            ctx.ellipse(this.x - 10, this.y - 10, 20, 20, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    var can = $("#can");
    var ctx = can[0].getContext("2d");
    var df = new Dragonfly(100, 100);
    df.draw(ctx);
});