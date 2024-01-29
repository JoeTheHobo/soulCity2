//Variables
let mapSize = 20;
let hidingIDS = false;

//Functions

function decodeFile(file) {
    let map = file.split('/');
    for (let i = 0; i < map.length; i++) {
        map[i] = map[i].split(',')
    }
    let newMap = [];
    for (let i = 0; i < map.length; i++) {
        let row = [];
        for (let j = 0; j < map[0].length; j++) {
            let cell = map[i][j].split('-');

            row.push({
                tile: returnTrueObj('tile',cell[0]),
                space: returnTrueObj('space',cell[1]),
                top: returnTrueObj('top',cell[2]),
                mech: returnTrueObj('mech',cell[3])
            });
        }
        newMap.push(row)
    }
    return newMap;
}

function returnTrueObj(type,cell) {
    let tileSplit = [];
    let on = 'id';
    let id = '';
    let atrStart;
    for (let i = 0; i < String(cell).length; i++) {
        let char = String(cell).charAt(i);
        if (on == 'id' && !isNaN(char)) {
            id += char;
            continue;
        } else {
            on = 'atr';
        }
        if (char == '[') {
            atrStart = '';
            continue;
        }
        if (char == ']') {
            tileSplit.push(atrStart.split('<>'));
            atrStart = '';
            continue;
        }
        atrStart += char;
    }
    let obj = structuredClone(returnObj(type,Number(id)));
    for (let i = 0; i < tileSplit.length; i++) {
        
        let value = tileSplit[i][1];
        if (value === 'false') value = false;
        if (value === 'true') value = true;
        if (!isNaN(value) && value !== false && value !== true) value = Number(value);

        let id = tileSplit[i][0];
        if (id == '00w') obj.walkable = value;
        if (id == '00s') obj.speed = value;
        if (id == '0t0') obj.teleport = value;
        if (id == '00h') obj.hideWhenOn = value;
        if (id == '0h0') obj.hwoID = value;
        if (id == '0hh') obj.hwoMyID = value;
    }
    return obj;
}

function decodeAll(string) {
    let worlds = string.split('|{]');
    let finalWorlds = [];
    for (let i = 0; i < worlds.length; i++) {
        let nameData = worlds[i].split("}{|");
        let obj = {
            name: nameData[0],
            data: decodeFile(nameData[1]),
        }
        finalWorlds.push(obj)
    }
    return finalWorlds;
}
function returnObj(type,id) {
    if (type == 'tile') {
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].id == id) return tiles[i];
        }
    }
    if (type == 'space') {
        for (let i = 0; i < spaces.length; i++) {
            if (spaces[i].id == id) return spaces[i];
        }
    }
    if (type == 'top') {
        for (let i = 0; i < tops.length; i++) {
            if (tops[i].id == id) return tops[i];
        }
    }
    if (type == 'mech') {
        for (let i = 0; i < mechs.length; i++) {
            if (mechs[i].id == id) return mechs[i];
        }
    }
}

function loadAllImages() {
    window.count = 0;
    window.finishedLoadingImages = false;
    let images = document.body.create('div');
    images.css({
        position: "absolute",
        top: "10000px",
    })

    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].img) continue;
        window.count++;
        let img = images.create('img');
        img.src = '../img/' + tiles[i].img + '.png';
        img.id = 'imgTile' + tiles[i].id;
        img.onload = function() {
            window.count--;
            if (window.count === 0) 
                window.finishedLoadingImages = true;
        }
    }
    for (let i = 0; i < spaces.length; i++) {
        if (!spaces[i].img) continue;
        window.count++;

        let img = images.create('img');
        img.src = '../img/' + spaces[i].img + '.png';
        img.id = 'imgSpace' + spaces[i].id;

        img.onload = function() {
            window.count--;
            if (window.count === 0) 
                window.finishedLoadingImages = true;
        }
    }
    for (let i = 0; i < tops.length; i++) {
        if (!tops[i].img) continue;
        window.count++;

        let img = images.create('img');
        img.src = '../img/' + tops[i].img + '.png';
        img.id = 'imgTop' + tops[i].id;

        img.onload = function() {
            window.count--;
            if (window.count === 0) 
                window.finishedLoadingImages = true; 
        }
    }
    for (let i = 0; i < mechs.length; i++) {
        if (!mechs[i].img) continue;
        window.count++;

        let img = images.create('img');
        img.src = '../img/' + mechs[i].img + '.png';
        img.id = 'imgMech' + mechs[i].id;

        img.onload = function() {
            window.count--;
            if (window.count === 0) 
                window.finishedLoadingImages = true; 
        }
    }
}


function drawEverything(canvas,data,doPlayer = false, doMechs = doDrawMechs,doGrid = doGridLines,color = false,doSpaces = true, doTops = true) {
    let tileSize = Math.round(canvas.offsetWidth / data.length);

    //Draw Tiles
    drawTiles(canvas,data,tileSize,color);
    //Draw Spaces
    if (doSpaces) drawSpaces(canvas,data,tileSize,color);
    //Draw Player
    if (doPlayer) drawPlayer(canvas,doPlayer,tileSize,color);
    //Draw Tops
    if (doTops) drawTops(canvas,data,tileSize,color);
    //Draw Mechs If True
    if (doMechs) drawMechs(canvas,data,tileSize,color);
    //Draw Grid Lines if true
    if (doGrid) drawGridLines(canvas,data,tileSize,color);
}

function drawPlayer(canvas,player,tileSize,color) {
    ctx = canvas.getContext('2d');
    ctx.drawImage($('imgMech' + player.img),player.pos.x,player.pos.y,tileSize,tileSize)
}
function drawGridLines(canvas,data,tileSize,color) {
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.moveTo(0,i * tileSize);
        ctx.lineTo(canvas.width,i * tileSize);
        ctx.stroke();
    }
    for (let j = 0; j < data[0].length; j++) {
        ctx.beginPath();
        ctx.moveTo(j * tileSize,0);
        ctx.lineTo(j * tileSize,canvas.height);
        ctx.stroke();
    }
}
function drawTiles(canvas,data,tileSize,color) {
    ctx = canvas.getContext('2d');
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            let tile = data[i][j].tile;
            if (hidingIDS === tile.hwoMyID) continue;
            ctx.fillStyle = tile.color;
            if (!color) ctx.drawImage($('imgTile' + tile.id),((data.length-1)-j) * tileSize,((data.length-1)-i) * tileSize,tileSize,tileSize)
            else if(tile.draw) ctx.fillRect(((data.length-1)-j) * tileSize,((data.length-1)-i) * tileSize,tileSize,tileSize);
        }
    }
}
function drawSpaces(canvas,data,tileSize,color) {
    ctx = canvas.getContext('2d');
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            let tile = data[i][j].space;
            if (hidingIDS === tile.hwoMyID) continue;
            ctx.fillStyle = tile.color;
            if (!color) ctx.drawImage($('imgSpace' + tile.id),((data.length-1)-j) * tileSize,((data.length-1)-i) * tileSize,tileSize,tileSize)
            else if(tile.draw) ctx.fillRect(((data.length-1)-j) * tileSize,((data.length-1)-i) * tileSize,tileSize,tileSize);
        }
    }
}
function drawTops(canvas,data,tileSize,color) {
    ctx = canvas.getContext('2d');
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            let tile = data[i][j].top;
            if (hidingIDS === tile.hwoMyID) continue;
            ctx.fillStyle = tile.color;
            if (!color) ctx.drawImage($('imgTop' + tile.id),((data.length-1)-j) * tileSize,((data.length-1)-i) * tileSize,tileSize,tileSize)
            else if(tile.draw) ctx.fillRect(((data.length-1)-j) * tileSize,((data.length-1)-i) * tileSize,tileSize,tileSize);
        }
    }
}
function drawMechs(canvas,data,tileSize,color) {
    ctx = canvas.getContext('2d');
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            let tile = data[i][j].mech;
            if (hidingIDS === tile.hwoMyID) continue;
            ctx.fillStyle = tile.color;
            if (!color) ctx.drawImage($('imgMech' + tile.id),((data.length-1)-j) * tileSize,((data.length-1)-i) * tileSize,tileSize,tileSize)
            else if(tile.draw) ctx.fillRect(((data.length-1)-j) * tileSize,((data.length-1)-i) * tileSize,tileSize,tileSize);
        }
    }
}