    function Game(context, cellSize){
            this.state = [
                [1,2,3,4],
                [5,6,7,8],
                [9,10,11,12],
                [13,14,15,0]
            ];

            this.color = "#653ea5";

            this.context = context;
            this.cellSize = cellSize;

            this.clicks = 0;
        }

        Game.prototype.getClicks = function() {
            return this.clicks;
        };
    Game.prototype.cellView = function(x, y) {
        this.context.fillStyle = this.color;
        this.context.fillRect(
            x + 1,
            y + 1,
            this.cellSize - 2,
            this.cellSize - 2
        );
    };
    Game.prototype.numView = function() {
        this.context.font = "bold " + (this.cellSize/2) + "px Sans";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillStyle = "#222";
    };
    Game.prototype.draw = function() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.state[i][j] > 0) {
                    this.cellView(
                        j * this.cellSize,
                        i * this.cellSize
                    );
                    this.numView();
                    this.context.fillText(
                        this.state[i][j],
                        j * this.cellSize + this.cellSize / 2,
                        i * this.cellSize + this.cellSize / 2
                    );
                }
            }
        }
    };
    Game.prototype.getNullCell = function(){
        for (let i = 0; i<4; i++){
            for (let j=0; j<4; j++){
                if(this.state[j][i] === 0){
                    return {x: i, y: j};
                }
            }
        }
    };

    Game.prototype.move = function(x, y) {
        let nullCell = this.getNullCell();
        let canMoveVertical = (x - 1 == nullCell.x || x + 1 == nullCell.x) && y == nullCell.y;
        let canMoveHorizontal = (y - 1 == nullCell.y || y + 1 == nullCell.y) && x == nullCell.x;

        if (canMoveVertical || canMoveHorizontal) {
            this.state[nullCell.y][nullCell.x] = this.state[y][x];
            this.state[y][x] = 0;
            this.clicks++;
        }
    };
    Game.prototype.victory = function() {
        let combination = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
        let res = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (combination[i][j] != this.state[i][j]) {
                    res = false;
                    break;
                }
            }
        }
        return res;
    };
    function getRandomBool() {
        if (Math.floor(Math.random() * 2) === 0) {
            return true;
        }
    }

    Game.prototype.mix = function(count) {
        let x, y;
        for (let i = 0; i < count; i++) {
            let nullCell = this.getNullCell();

            let verticalMove = getRandomBool();
            let upLeft = getRandomBool();

            if (verticalMove) {
                x = nullCell.x;
                if (upLeft) {
                    y = nullCell.y - 1;
                } else {
                    y = nullCell.y + 1;
                }
            } else {
                y = nullCell.y;
                if (upLeft) {
                    x = nullCell.x - 1;
                } else {
                    x = nullCell.x + 1;
                }
            }

            if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
                this.move(x, y);
            }
        }

        this.clicks = 0;
    };
    window.onload = function() {
        localStorage.clear();

        let canvas = document.getElementById("canvas");
        canvas.width = 400;
        canvas.height = 400;

        let context = canvas.getContext("2d");
        context.fillRect(0, 0, canvas.width, canvas.height);

        let cellSize = canvas.width / 4;

        let game = new Game(context, cellSize);
        game.mix(2);
        game.draw();

        canvas.onclick = function (e) {
            let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
            let y = (e.pageY - canvas.offsetTop) / cellSize | 0;
            onEvent(x, y);
        };

        canvas.ontouchend = function (e) {
            let x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
            let y = (e.touches[0].pageY - canvas.offsetTop) / cellSize | 0;

            onEvent(x, y);
        };

        function onEvent(x, y) {
            game.move(x, y);
            context.fillRect(0, 0, canvas.width, canvas.height);
            game.draw();
            if (game.victory()) {
                localStorage.setItem('time', 300);
                localStorage.setItem('clicks', game.getClicks());
                window.location.href = "./reward";
                // alert("?????????????? ???? " + game.getClicks() + " ??????????????!");
                // game.mix(30);
                // context.fillRect(0, 0, canvas.width, canvas.height);
                // game.draw(context, cellSize);
            }
        }
    }