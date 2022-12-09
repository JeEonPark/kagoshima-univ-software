$(function () {

    //Graph Class

    var Graph = class {
        //Constructor
        constructor(ctx) {
            this.ctx = ctx;
            this.ctx.font = '16pt Arial';
        }

        //Clear
        clear() {
            ctx.clearRect(0, 0, 640, 480);
        }

        //Stroke Ellipse
        ellipseS(x, y, w, h, a) {
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, w, h, a * Math.PI / 180, 0, 2 * Math.PI);
            this.ctx.stroke();
        }

        //Fill Ellipse
        ellipseF(x, y, w, h, a) {
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, w, h, a * Math.PI / 180, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        text(s, x, y) {
            this.ctx.fillText(s, x, y);
        }
    }

    var GameChar = class {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }

        overlap(c) {
            var x1 = this.x - this.w / 2, y1 = this.y - this.h / 2;
            var w1 = this.w, h1 = this.h;
            var x2 = c.x - c.w / 2, y2 = c.y - c.h / 2;
            var w2 = c.w, h2 = c.h;
            var ox = (x2 <= x1 && x1 < x2 + w2) || (x1 <= x2 && x2 < x1 + w1);
            var oy = (y2 <= y1 && y1 < y2 + h2) || (y1 <= y2 && y2 < y1 + h1);
            return ox && oy;
        }
    }

    //Dragon Fly Class
    var Dragonfly = class extends GameChar {
        //Constructor
        constructor(x, y) {
            super(x, y, 30, 30);
            this.costume = 0;
        }

        //hirogeteiru
        drawOpen(gra) {
            gra.ellipseF(this.x, this.y, 5, 5, 0);
            gra.ellipseS(this.x, this.y + 25, 5, 20, 0);
            gra.ellipseF(this.x + 23, this.y, 20, 5, -15);
            gra.ellipseF(this.x - 23, this.y, 20, 5, 15);
            gra.ellipseS(this.x + 23, this.y + 15, 20, 5, 15);
            gra.ellipseS(this.x - 23, this.y + 15, 20, 5, -15);
        }

        //tojiteiru
        drawClose(gra) {
            gra.ellipseF(this.x, this.y, 5, 5, 0);
            gra.ellipseS(this.x, this.y + 25, 5, 20, 0);
            gra.ellipseF(this.x + 23, this.y + 5, 20, 5, 0);
            gra.ellipseF(this.x - 23, this.y + 5, 20, 5, 0);
            gra.ellipseS(this.x + 23, this.y + 10, 20, 5, 0);
            gra.ellipseS(this.x - 23, this.y + 10, 20, 5, 0);
        }

        //draw
        draw(gra) {
            if (this.costume % 2 == 0) {
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

    var Apple = class extends GameChar {
        constructor(x, y) {
            super(x, y, 15, 15);
        }

        draw(gra) {
            gra.ellipseS(this.x, this.y, 15, 15, 0);
            gra.ellipseF(this.x + 5, this.y - 12, 10, 4, -45);
        }

        move(dy) {
            this.y += dy;
            return this.y < -15;
        }
    }

    var Banana = class extends GameChar {
        constructor() {
            super(0, 0, 15, 15);
            this.x = Math.random() * 640;
            this.y = Math.random() * 400;
            this.tx = Math.random() * 640;
            this.ty = Math.random() * 400;
            this.cnt = parseInt(Math.random() * 50) + 30; //random 50 to 80
            this.dx = (this.tx - this.x) / this.cnt;
            this.dy = (this.ty - this.y) / this.cnt;
        }

        draw(gra) {
            gra.ellipseS(this.x - 5, this.y - 5, 15, 5, -30);
            gra.ellipseS(this.x, this.y, 15, 5, -45);
            gra.ellipseS(this.x + 5, this.y + 5, 15, 5, -60);
            gra.ellipseF(this.x + 10, this.y - 10, 8, 5, 45);
        }

        move() {
            this.x += this.dx;
            this.y += this.dy;

            return (--this.cnt) == 0;
        }
    }

    //About Message
    var showAboutMessage = function () {
        alert("トンボゲーム\n2022\nSoftware Engineering II");
    }

    //When key down
    var keyDown = function (ev) {
        switch (ev.which) {
            case 37: key_l = true; break;
            case 39: key_r = true; break;
            case 32: key_s = true; break;
        }
    }

    //When key up
    var keyUp = function (ev) {
        switch (ev.which) {
            case 37: key_l = false; break;
            case 39: key_r = false; break;
            case 32: key_s = false; break;
        }
    }

    var can = $("#can");
    var ctx = can[0].getContext("2d");
    var gra = new Graph(ctx);
    var df = new Dragonfly(320, 420);
    var key_l = false;
    var key_r = false;
    var key_s = false;
    var apps = [];
    var bans = [];
    var score = 0;

    //Event Handler
    $("#bt_about").click(showAboutMessage);
    can.keydown(keyDown);
    can.keyup(keyUp);

    var lap = 0;
    var last_shot_time = 0;
    var exec = function () {
        gra.clear();
        df.draw(gra);
        if (key_l) df.move(-4);
        if (key_r) df.move(4);
        if (lap % 10 == 0) df.changeCostume();

        //apple
        if (last_shot_time > 15 && key_s) {
            last_shot_time = 0;
            console.log("asdf");
            apps.push(new Apple(df.x, df.y));
        }
        apps.forEach((a, i) => {
            a.draw(gra);
            if (a.move(-8)) {
                apps.splice(i, 1);
            }
        });

        //banana
        if (lap % 40 == 0 && Math.random() < 0.5) {
            bans.push(new Banana());
        }
        bans.forEach((b, i) => {
            b.draw(gra);
            if (b.move()) {
                bans.splice(i, 1);
            }
        });

        apps.forEach((a, i) => {
            bans.forEach((b, j) => {
                if (a.overlap(b)) {
                    apps.splice(i, 1);
                    bans.splice(j, 1);
                    score += 10;
                }
            });
        });

        gra.text("Score:" + score, 10, 20);

        lap++;
        last_shot_time++;
    }

    can.attr("tabindex", 0);
    setInterval(exec, 10);

});