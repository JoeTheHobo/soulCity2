//Set Up Variables
let data = decodeFile(ls.get('scTestPlayer')); //scCurrentMap
let worlds = decodeAll(ls.get('SCmaps'));
let canvas = $('player');
let ctx = canvas.getContext('2d');
let doDrawMechs = false;
let doGridLines = false;
let player = {
    speed: 0,
    moving: {
        left: false,
        right: false,
        down: false,
        up: false,
    },
    tile: {
        x: 0,
        y: 0,
    },
    pos: {
        x: 0,
        y: 0,
    },
    img: false,
}

//Functions
function start() {
    //Load All Images
    loadAllImages();

    //Set Canvas Size
    setCanvasSize();

    //Set Up Player
    setUpPlayer();

    //Start Canvas Loop
    startLoop();
}
function startLoop() {
    setInterval(function() {
        //Reset Canvas
        ctx.fillStyle = '#444';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        //Do Player Actions if Player is Present
        if (player) {
            //Move Player
            movePlayer();

            //Check If Player is on anything
            let inverseX = (data[0].length-1) - player.tile.x;
            let inverseY = (data.length-1) - player.tile.y;

            if (checkHWOOnAll(data[inverseY][inverseX])) {
                let id = checkHWOOnAll(data[inverseY][inverseX]);
                hidingIDS = id;
            } else hidingIDS = false;
        }



        //Draw Everything
        drawEverything(canvas,data,player ? player : false);


    },1000/60)
}
function checkWalkableOnAll(data) {
    if (!data.tile.walkable) return false; 
    if (!data.space.walkable) return false;
    if (!data.top.walkable) return false; 
    if (!data.mech.walkable) return false; 
    return true;
}
function checkTeleportOnAll(data) {
    if (String(data.tile.teleport).includes("♣")) {
        let arr = data.tile.teleport.split("♣");
        arr[1] = arr[1].split('j');
        arr[1][0] = arr[1][0].replace("i","");
        arr[1][0] = Number(arr[1][0]);
        arr[1][1] = Number(arr[1][1]); 
        return arr; 
    }
    if (String(data.space.teleport).includes("♣")) {
        let arr = data.space.teleport.split("♣");
        arr[1] = arr[1].split('j');
        arr[1][0] = arr[1][0].replace("i","");
        arr[1][0] = Number(arr[1][0]);
        arr[1][1] = Number(arr[1][1]); 
        return arr; 
    }
    if (String(data.top.teleport).includes("♣")) {
        let arr = data.top.teleport.split("♣");
        arr[1] = arr[1].split('j');
        arr[1][0] = arr[1][0].replace("i","");
        arr[1][0] = Number(arr[1][0]);
        arr[1][1] = Number(arr[1][1]); 
        return arr; 
    }
    if (String(data.mech.teleport).includes("♣")) {
        let arr = data.mech.teleport.split("♣");
        arr[1] = arr[1].split('j');
        arr[1][0] = arr[1][0].replace("i","");
        arr[1][0] = Number(arr[1][0]);
        arr[1][1] = Number(arr[1][1]); 
        return arr; 
    }
    return false;
}
function checkHWOOnAll(data) {
    if (data.tile.hideWhenOn) return data.tile.hwoID; 
    if (data.space.hideWhenOn) return data.space.hwoID;
    if (data.top.hideWhenOn) return data.top.hwoID; 
    if (data.mech.hideWhenOn) return data.mech.hwoID; 
    return false;
}
function movePlayer() {
    moveLeft: if (player.moving.left) {
        let playerLeft = Math.round(((player.pos.x-(canvas.tileSize/2)) - player.speed) / canvas.tileSize); 
        let inverseX = (data[0].length-1) - playerLeft;
        let inverseY = (data.length-1) - player.tile.y;
        let speedInverseX = (data[0].length-1) - player.tile.x;

        //Check If Will Walk Off Sceen
        if (playerLeft < 0) break moveLeft;

        //Check If Can't Move On Tile
        if(!checkWalkableOnAll(data[inverseY][inverseX])) break moveLeft;

        //Check If Player is On a Teleporter
        if(checkTeleportOnAll(data[inverseY][inverseX])) {
            let arr = checkTeleportOnAll(data[inverseY][inverseX]);

            for (let i = 0; i < worlds.length; i++) {
                if (worlds[i].name == arr[0]) {
                    data = worlds[i].data;
                }
            }

            player.tile.x = (data[0].length-1) - arr[1][1];
            player.tile.y = (data.length-1) - arr[1][0];

            player.pos.y = player.tile.y * canvas.tileSize;
            player.pos.x = player.tile.x * canvas.tileSize;
            break moveLeft;
        }


        //Change Speed Modifier
        let speed = player.speed * data[inverseY][speedInverseX].tile.speed;


        player.pos.x -= speed;
    }
    moveRight: if (player.moving.right) {
        let playerRight = Math.round(((player.pos.x+(canvas.tileSize/2)) + player.speed) / canvas.tileSize); 
        let inverseX = (data[0].length-1) - playerRight;
        let inverseY = (data.length-1) - player.tile.y;
        let speedInverseX = (data[0].length-1) - player.tile.x;

        //Check If Will Walk Off Sceen
        if (playerRight > data[0].length - 1) break moveRight;

        //Check If Can't Move On Tile
        if(!checkWalkableOnAll(data[inverseY][inverseX])) break moveRight;

        //Check If Player is On a Teleporter
        if(checkTeleportOnAll(data[inverseY][inverseX])) {
            let arr = checkTeleportOnAll(data[inverseY][inverseX]);

            for (let i = 0; i < worlds.length; i++) {
                if (worlds[i].name == arr[0]) {
                    data = worlds[i].data;
                }
            }

            player.tile.x = (data[0].length-1) - arr[1][1];
            player.tile.y = (data.length-1) - arr[1][0];

            player.pos.y = player.tile.y * canvas.tileSize;
            player.pos.x = player.tile.x * canvas.tileSize;
            break moveRight;
        }


        //Change Speed Modifier
        let speed = player.speed * data[inverseY][speedInverseX].tile.speed;

        player.pos.x += speed;
    }
    moveDown: if (player.moving.down) {
        let playerDown = Math.round(((player.pos.y+(canvas.tileSize/2)) + player.speed) / canvas.tileSize); 
        let inverseY = (data.length-1) - playerDown;
        let inverseX = (data[0].length-1) - player.tile.x;
        let speedInverseY = (data.length-1) - player.tile.y;

        //Check If Will Walk Off Sceen
        if (playerDown > data.length - 1) break moveDown;

        //Check If Can't Move On Tile
        if(!checkWalkableOnAll(data[inverseY][inverseX])) break moveDown;

        //Check If Player is On a Teleporter
        if(checkTeleportOnAll(data[inverseY][inverseX])) {
            let arr = checkTeleportOnAll(data[inverseY][inverseX]);

            for (let i = 0; i < worlds.length; i++) {
                if (worlds[i].name == arr[0]) {
                    data = worlds[i].data;
                }
            }

            player.tile.x = (data[0].length-1) - arr[1][1];
            player.tile.y = (data.length-1) - arr[1][0];

            player.pos.y = player.tile.y * canvas.tileSize;
            player.pos.x = player.tile.x * canvas.tileSize;
            break moveDown;
        }
        
        
        //Change Speed Modifier
        let speed = player.speed * data[speedInverseY][inverseX].tile.speed;
        
        player.pos.y += speed;
    }
    moveUp: if (player.moving.up) {
        let playerDown = Math.round(((player.pos.y-(canvas.tileSize/2)) + player.speed) / canvas.tileSize); 
        let inverseY = (data.length-1) - playerDown;
        let inverseX = (data[0].length-1) - player.tile.x;
        let speedInverseY = (data.length-1) - player.tile.y;

        //Check If Will Walk Off Sceen
        if (playerDown < 0) break moveUp;

        //Check If Can't Move On Tile
        if(!checkWalkableOnAll(data[inverseY][inverseX])) break moveUp;

        //Check If Player is On a Teleporter
        if(checkTeleportOnAll(data[inverseY][inverseX])) {
            let arr = checkTeleportOnAll(data[inverseY][inverseX]);

            for (let i = 0; i < worlds.length; i++) {
                if (worlds[i].name == arr[0]) {
                    data = worlds[i].data;
                }
            }

            player.tile.x = (data[0].length-1) - arr[1][1];
            player.tile.y = (data.length-1) - arr[1][0];

            player.pos.y = player.tile.y * canvas.tileSize;
            player.pos.x = player.tile.x * canvas.tileSize;
            break moveUp;
        }

        
        //Change Speed Modifier
        let speed = player.speed * data[speedInverseY][inverseX].tile.speed;

        player.pos.y -= speed;
    }

    player.tile.x = Math.round(player.pos.x / canvas.tileSize)
    player.tile.y = Math.round(player.pos.y / canvas.tileSize)
}
function setUpPlayer() {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j].mech.testPlayFromHere) {
                player.pos.x = (((data[i].length-1)-j)*canvas.tileSize)// + (canvas.tileSize/2);
                player.pos.y = (((data.length-1)-i)*canvas.tileSize)// + (canvas.tileSize/2);
                player.tile.x = j;
                player.tile.y = i;
                player.img = data[i][j].mech.id;
                player.speed = data[i][j].mech.speed;
                return;
            }
        }
    }
    player = false;
}

function setCanvasSize() {
    let windowHeight = window.innerHeight;
    canvas.width = windowHeight;
    canvas.height = windowHeight;
    canvas.style.width = windowHeight + 'px';
    canvas.style.height = windowHeight + 'px';

    canvas.tileSize = Math.round(windowHeight / data.length);
}

function goBackToEditor() {
    
    let testPlayer = window.open("./mapEditor.html","_self")
}
//Finished Functions and Start
start();
//Interactive Window

window.addEventListener('resize',function(e) {
    setCanvasSize();
})

window.addEventListener('keydown',function(e) {
    let key = e.key;
    let lkey = e.key.toLowerCase(); //Key but in lowercase no matter what 

    if (lkey == 'escape') {
        goBackToEditor();
    }
    if (lkey == 'g') {
        doGridLines = doGridLines ? false : true;
    }
    if (lkey == 'm') {
        doDrawMechs = doDrawMechs ? false : true;
    }

    if (lkey == 'a') player.moving.left = true;
    if (lkey == 's') player.moving.down = true;
    if (lkey == 'd') player.moving.right = true;
    if (lkey == 'w') player.moving.up = true;
})
window.addEventListener('keyup',function(e) {
    let key = e.key;
    let lkey = e.key.toLowerCase(); //Key but in lowercase no matter what 


    if (lkey == 'a') player.moving.left = false;
    if (lkey == 's') player.moving.down = false;
    if (lkey == 'd') player.moving.right = false;
    if (lkey == 'w') player.moving.up = false;
})