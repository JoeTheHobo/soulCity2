////////////////////////
//  Needed Variables  //
////////////////////////

let htmlMap = $('map');
let map;
let maps = [];
let currentMap = 0;
let showGrid = true;
let shiftDown = false;
let controlDown = false;
let rotation = 'down';
let mouseDown =  false;
let mouseKey = false;
let selectionTool = false;
let selectionName = false;
let chooseTele = false;
let teleOG = false;
let teleSelectT = false;
let teleSelectN = false;
let showTiles = true;
let showSpaces = true;
let showTops = true;
let showMechs = true;


///////////////////
// End Variables //
/////////////////////
// Start Functions //
/////////////////////

function checkLoaded() {
    if(finishedLoadingImages === false) {
       window.setTimeout(checkLoaded, 0); /* this checks the flag every 100 milliseconds*/
    } else {
        start();
    }
}

function loadImagesFirst() {
    //Load Images
    loadAllImages();

    checkLoaded();
}
//Order Of Events.
function start() {

    //Update Maps From Cookies
    maps = ls.get('SCmaps',false) ? decodeAll(ls.get('SCmaps',false)) : [];

    //Create Empty Map if None Found
    if (maps.length < 1) {
        maps.push({
            name: "Untitled 1",
            data: makeMap(mapSize,mapSize)
        });
    }

    //Set Current Map
    
    currentMap = ls.get('scCurrentMap',false) ? ls.get('scCurrentMap',false) : maps[0].name;
    ls.save('scCurrentMap',false);

    //Loads Saved Maps
    loadMaps();

    //Draw Map
    let number = findMapByName(currentMap);
    createMap(maps[number].data);

    //Create Tile Options
    createOptions();

    //Switch to correct Tab
    switchTab('Tiles');

    //Load Inspecor
    loadTileInspector();

    //Fix Map Size
    fixMapSize();
}

function findMapByName(name) {
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].name === name) return i;
    }
}

function createOptions() {
    if (selectionTool) {
        let list = [['allTiles',[$(selectionName).tile]],['allSpaces',[$(selectionName).space]],['allTops',[$(selectionName).top]],['allMechs',[$(selectionName).mech]]];
        $('layer').innerHTML = 'Layer ' + $('layer').innerHTML.charAt(6) + " - " + selectionName;
        selectedCell = list[Number($('layer').innerHTML.charAt(6))-1][1][0];

        for (let j = 0; j < list.length; j++) {
            let html = $(list[j][0]);
            let clist = list[j][1];

            html.innerHTML = '';
            for (let i = 0; i < clist.length; i++) {
                let div = html.create('div');
                div.id = 'optholder';
                div.tile = i;
                div.type = clist[i].type;

                let imgHolder = div.create('div');
                imgHolder.id = 'optimgHolder';
                imgHolder.style.background = clist[i].color;
                if (clist[i].img) {
                    let img = imgHolder.create('img');
                    img.src = '../img/' + clist[i].img + '.png';
                    if (selectedCell.name == clist[i].name && selectedCell.type == clist[i].type) {
                    }
                }
                
                if (selectedCell.name == clist[i].name && selectedCell.type == clist[i].type) {
                    
                    //imgHolder.style.transform = 'rotate(90deg)' 
                    div.style.background = 'lightblue';
                }


                let text = div.create('div');
                text.id ='opttext';
                text.innerHTML = clist[i].name;

                div.onclick = function() {
                    selectedCell = clist[this.tile];
                    loadTileInspector();
                    createOptions();
                    rotation = 'down';

                    if (this.type == 'tile') $('rsbrFillTiles').style.display = 'block';
                    else $('rsbrFillTiles').style.display = 'none';
                }
            }
        }
        loadAttributes();
    } else {
        let list = [['allTiles',tiles],['allSpaces',spaces],['allTops',tops],['allMechs',mechs]];
        for (let j = 0; j < list.length; j++) {
            let html = $(list[j][0]);
            let clist = list[j][1];

            html.innerHTML = '';
            for (let i = 0; i < clist.length; i++) {
                let div = html.create('div');
                div.id = 'optholder';
                div.tile = i;
                div.type = clist[i].type;

                let imgHolder = div.create('div');
                imgHolder.id = 'optimgHolder';
                imgHolder.style.background = clist[i].color;
                if (clist[i].img) {
                    let img = imgHolder.create('img');
                    img.src = '../img/' + clist[i].img + '.png';
                }
                
                if (selectedCell.name == clist[i].name && selectedCell.type == clist[i].type) {
                    
                    //imgHolder.style.transform = 'rotate(90deg)' 
                    div.style.background = 'lightblue';
                }


                let text = div.create('div');
                text.id ='opttext';
                text.innerHTML = clist[i].name;

                div.onclick = function() {
                    selectedCell = clist[this.tile];
                    loadTileInspector();
                    createOptions();
                    rotation = 'down';

                    if (this.type == 'tile') $('rsbrFillTiles').style.display = 'block';
                    else $('rsbrFillTiles').style.display = 'none';
                }
            }
        }
    }
}
function loadAttributes() {
    let body = $('rsblaBody');
    body.innerHTML = '';

    if (selectedCell.type !== undefined) createAtr('Type',selectedCell.type,false);
    if (selectedCell.walkable !== undefined) createAtr('Walkable',selectedCell.walkable,true);
    if (selectedCell.speed !== undefined) createAtr('Speed',selectedCell.speed,true);
    if (selectedCell.teleport !== undefined) createAtr('Teleport',selectedCell.teleport,true);
    if (selectedCell.hideWhenOn !== undefined) createAtr('Hide_When_On',selectedCell.hideWhenOn,true);
    if (selectedCell.hwoID !== undefined) createAtr('HWO_ID',selectedCell.hwoID,true);
    if (selectedCell.hwoMyID !== undefined) createAtr('HWO_My_ID',selectedCell.hwoMyID,true);
    if (selectedCell.id !== undefined) createAtr('ID',selectedCell.id,false);
    if (selectedCell.color !== undefined) createAtr('Color',selectedCell.color,false);
    if (selectedCell.name !== undefined) createAtr('Name',selectedCell.name,false);
    if (selectedCell.img !== undefined) createAtr('Image',selectedCell.img,false);
    if (selectedCell.testPlayFromHere !== undefined) createAtr('Test_Play_From_Here',selectedCell.testPlayFromHere,false);
    if (selectedCell.draw !== undefined) createAtr('Draw_On_Mini_Maps',selectedCell.draw,false);
}
let listOfAtt = [
    {
        att: "Type",
        title: "Which Layer This Cell Will Appear",
        value: ["tile","space","top","mech"],
    },
    {
        att: "Walkable",
        title: "If The Player Can Walk On This Cell",
        value: ["true","false"],
    },
    {
        att: "Speed",
        title: "When Player Is Walking Over This Cell, The Players Speed Is Multiplied By This Calls Value",
        value: ["Any Number"],
    },
    {
        att: "Teleport",
        title: "Teleports The Player To Another Cell",
        value: ["Click Cell On Any Map In Game"],
    },
    {
        att: "Hide_When_On",
        title: "When Player Is On This Cell, Every Cell whose HWO_My_ID Match This Cells HWO_ID Will Hide For As Long As The Player Is On This Cell",
        value: [true,false],
    },
    {
        att: "HWO_ID",
        title: "If This Cells Hide_When_On is True, Every Cell whose WHY_My_ID Match This Cells HWO_ID Will Hide For As Long As The Player Is On This Cell",
        value: ["Any Value"],
    },
    {
        att: "HWO_My_ID",
        title: "",
        value: ["Any Value"],
    },
    {
        att: "ID",
        title: "",
        value: ["Any Number"],
    },
    {
        att: "Color",
        title: "Color Cell Appears On Mini Maps, Also The Color Behind for Transparent Images",
        value: ["Any Color (Hex/RGB/Name)"],
    },
    {
        att: "Name",
        title: "",
        value: ["Any Value"],
    },
    {
        att: "Image",
        title: "",
        value: ["URL To IMG"],
    },
    {
        att: "Draw_On_Mini_Maps",
        title: "",
        value: [true,false],
    }
];
function createAtr(first,second,clickable) {
    let body = $('rsblaBody');
    let holder, div1, div2;

    holder = body.create('holder');
    holder.className = 'atrHolder';
    div1 = holder.create('div');
    div1.className = 'atrName';
    div1.innerHTML = first + ": ";

    let titleFound = false;
    for (let i = 0; i < listOfAtt.length; i++) {
        if (listOfAtt[i].att === first) titleFound = "[" + String(listOfAtt[i].value).replaceAll(',','/') + '] ' + listOfAtt[i].title;
    }
    if (titleFound) div1.title = titleFound;

    div2 = holder.create('div');
    div2.className = clickable ? 'atrClick' : 'atrNoclick';
    div2.innerHTML = second;
    div2.div1 = div1.innerHTML;
    div2.id = 'atr' + first;
    if (clickable) div2.onclick = function() {
        let value;
        if (this.div1 !== 'Teleport: ') {
            value = prompt("Change Value",this.innerHTML);

            if (value === '' || value == undefined) return;
            this.innerHTML = value;
            if (selectionName) {
                selectedCell = checkAttributes();
                if(selectedCell.type == 'tile') $(selectionName).tile = selectedCell;
                if(selectedCell.type == 'space') $(selectionName).space = selectedCell;
                if(selectedCell.type == 'top') $(selectionName).top = selectedCell;
                if(selectedCell.type == 'mech') $(selectionName).mech = selectedCell;
                save();
            }
        }
        if (this.div1 == 'Teleport: ') {
            chooseTele = true;
            teleOG = currentMap;
            teleSelectT = selectionTool;
            teleSelectN = selectionName;

            this.innerHTML = "Click Cell To Teleport To";
        }

        
    }
}
function hideLayer(type) {
    if (type == 'tile') {
        showTiles = showTiles ? false : true;
        $('extBot1').className = 'extBot ' + (showTiles ? "extBotShow" : "extBotHide");
    }
    if (type == 'space') {
        showSpaces = showSpaces ? false : true;
        $('extBot2').className = 'extBot ' + (showSpaces ? "extBotShow" : "extBotHide");
    }
    if (type == 'top') {
        showTops = showTops ? false : true;
        $('extBot3').className = 'extBot ' + (showTops ? "extBotShow" : "extBotHide");
    }
    if (type == 'mech') {
        showMechs = showMechs ? false : true;
        $('extBot4').className = 'extBot ' + (showMechs ? "extBotShow" : "extBotHide");
    }
    createMap(maps[findMapByName(currentMap)].data);
}
function checkAttributes() {
    let trueCell = structuredClone(selectedCell);

    if (selectedCell.walkable !== undefined) trueCell.walkable = checkATR('Walkable');
    if (selectedCell.speed !== undefined) trueCell.speed = checkATR('Speed');
    if (selectedCell.teleport !== undefined) trueCell.teleport = checkATR('Teleport');

    if (selectedCell.hideWhenOn !== undefined) trueCell.hideWhenOn = checkATR('Hide_When_On');
    if (selectedCell.hwoID !== undefined) trueCell.hwoID = checkATR('HWO_ID');
    if (selectedCell.hwoMyID !== undefined) trueCell.hwoMyID = checkATR('HWO_My_ID');

    return trueCell;
}
function checkATR(type) {
    let value = $('atr' + type).innerHTML;
    if (value == 'false') value = false;
    if (value == 'true') value = true;
    if (!isNaN(value) && value !== false && value !== true) value = Number(value);
    return value;
}
function checkAttributesFromID(type,ogs,ne) {
    let og = returnObj(type,ogs);
    let string = '';

    if (ne.walkable !== undefined) if(og.walkable !== ne.walkable) string += "[00w<>" + ne.walkable + ']';
    if (ne.speed !== undefined) if(og.speed !== ne.speed) string += "[00s<>" + ne.speed + ']';
    if (ne.teleport !== undefined) if(og.teleport !== ne.teleport) string += "[0t0<>" + ne.teleport + ']';
    if (ne.hideWhenOn !== undefined) if(og.hideWhenOn !== ne.hideWhenOn) string += "[00h<>" + ne.hideWhenOn + ']';
    if (ne.hwoID !== undefined) if(og.hwoID !== ne.hwoID) string += "[0h0<>" + ne.hwoID + ']';
    if (ne.hwoMyID !== undefined) if(og.hwoMyID !== ne.hwoMyID) string += "[0hh<>" + ne.hwoMyID + ']';

    return string;
}
function createMap(map) {
    htmlMap.innerHTML = '';
    for (let i = 0; i < map.length; i++) {
        let tr = htmlMap.insertRow(0);
        for (let j = 0; j < map[0].length; j++) {
            let tile = map[i][j];
            let cell = tr.insertCell(0);

            cell.tile = tile.tile;
            cell.space = tile.space;
            cell.mech = tile.mech;
            cell.top = tile.top;

            cell.id = 'i' + i + 'j' + j;
            if (cell.id == selectionName) cell.style.outline = '2px solid red';
            cell.i = i;
            cell.j = j;

            loadTile(i,j);
            
            cell.onmousedown = function(e) {
                if (chooseTele) return;
                if (e.button !== 0) return;
                if (!selectedCell) return;

                let specialAtrCell = checkAttributes();


                if (selectedCell.type == 'tile') this.tile = specialAtrCell;
                if (selectedCell.type == 'space') this.space = specialAtrCell;
                if (selectedCell.type == 'mech') this.mech = specialAtrCell;
                if (selectedCell.type == 'top') this.top = specialAtrCell;

                loadTile(this.i,this.j)
                maps[findMapByName(currentMap)].data = converTableToAMap();
                ls.save('SCmaps',saveAll())

                drawEverything($("rsbrCanvas"),maps[findMapByName(currentMap)].data,false,false,false,true,false,false)
                drawEverything($("canvas" + fixNameForID(currentMap)),maps[findMapByName(currentMap)].data,false,false,false,true,false,false)
            }
            cell.onmouseup = function() {
                
                if (chooseTele) {
                    chooseTele = currentMap + "♣" +  this.id;

                    currentMap = teleOG;
                    loadMaps();
                    selectionName = teleSelectN;
                    selectionTool = teleSelectT;


                    $('atrTeleport').innerHTML = chooseTele;
                    if (selectionName) {
                        $(selectionName).style.outline = '2px solid red';
                        selectedCell = checkAttributes();
                        if(selectedCell.type == 'tile') $(selectionName).tile = selectedCell;
                        if(selectedCell.type == 'space') $(selectionName).space = selectedCell;
                        if(selectedCell.type == 'top') $(selectionName).top = selectedCell;
                        if(selectedCell.type == 'mech') $(selectionName).mech = selectedCell;
                        save();
                    }
                    chooseTele = false;
                    createOptions();

                    return;
                }

                if (mouseKey != 'middle') return;
                selectionTool = {
                    tile: this.tile,
                    space: this.space,
                    top: this.top,
                    mech: this.mech,
                }
                selectionName = this.id;
                for (let i = 0; i < map.length; i++) {
                    for (let j = 0; j < map[0].length; j++) {
                        $('i' + i + 'j' + j).style.outline = 'none';
                    }
                }

                this.style.outline = '2px solid red';
                createOptions();
            }
            cell.onmouseover = function(e) { 
                if (chooseTele) return;
                if (!mouseDown) return;
                if (mouseKey !== 'left') return;
                if (!selectedCell) return;

                let specialAtrCell = checkAttributes();

                if (selectedCell.type == 'tile') this.tile = specialAtrCell;
                if (selectedCell.type == 'space') this.space = specialAtrCell;
                if (selectedCell.type == 'mech') this.mech = specialAtrCell;
                if (selectedCell.type == 'top') this.top = specialAtrCell;

                maps[findMapByName(currentMap)].data = converTableToAMap();
                loadTile(this.i,this.j)
                ls.save('SCmaps',saveAll())

                drawEverything($("rsbrCanvas"),maps[findMapByName(currentMap)].data,false,false,false,true,false,false)
                drawEverything($("canvas" + fixNameForID(currentMap)),maps[findMapByName(currentMap)].data,false,false,false,true,false,false)
            }
        }
    }
    maps[findMapByName(currentMap)].data = converTableToAMap();
}
function fixNameForID(name) {
    let goodCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newName = '';
    for (let i = 0; i < name.length; i++) {
        if (goodCharacters.includes(name.charAt(i))) {
            newName += name.charAt(i);
        } else newName += 'azu';
    }
    return newName;
}
function loadTile(y,x) {
    let cell = $('i' + y + 'j' + x);
    let tile = cell.tile;
    let space = cell.space;
    let top = cell.top;
    let mech = cell.mech;

    let text = '';
    let otherText = '';
    if (mech.img && showMechs) {
        text += 'url(../img/' + mech.img + '.png)';
        otherText += ', center center';
    }
    if (top.img && showTops) {
        text += ', url(../img/' + top.img + '.png)';
        otherText += ', center center';
    }
    if (space.img && showSpaces) {

        text += ', url(../img/' + space.img + '.png)';
        otherText += ', center center';
    }
    if (tile.img && showTiles) {
        text += ', url(../img/' + tile.img + '.png)';
        otherText += 'center center';
    }

    //Fix Text In Case Mechs Are Hidden
    if (text.charAt(0) == ',') text = text.substring(2,text.length);
    
    cell.style.background = text;
    cell.style.backgroundPosition = otherText;
}

function makeMap(cols,rows) {
    let returnMap = [];
    for (let i = 0; i < rows; i++) {
        let returnRow = [];
        for (let j = 0; j < cols; j++) {
            returnRow.push({
                tile: tiles[2], //Grass
                space: spaces[0], //Air - Item/Space on Tile
                mech: mechs[0],
                top: tops[0],
            })
        }
        returnMap.push(returnRow);
    }
    return returnMap;
}


function save() {
    maps[findMapByName(currentMap)].data = converTableToAMap();
    ls.save('SCmaps',saveAll())
    loadMaps();
}

function switchTab(type) {
    let layer = 1;
    $('allTiles').style.display = 'none';
    $('allSpaces').style.display = 'none';
    $('allTops').style.display = 'none';
    $('allMechs').style.display = 'none';

    for (let i = 1; i < 5; i++) {
        $('header' + i).className = 'header plain';
    }

    if (type == 'Tiles') {
        layer = 1;
        $('allTiles').style.display = 'block';
        $('header1').className = 'header cool';
    }
    if (type == 'Spaces') {
        layer = 2;
        $('allSpaces').style.display = 'block';
        $('header2').className = 'header cool';
    }
    if (type == 'Tops') {
        layer = 3;
        $('allTops').style.display = 'block';
        $('header3').className = 'header cool';
    }
    if (type == 'Mechs') {
        layer = 4;
        $('allMechs').style.display = 'block';
        $('header4').className = 'header cool';
    }
    $('layer').innerHTML = 'Layer ' + layer + (selectionTool ? " - " + selectionName : "");
}

function fixMapSize() {
    let htmlMap = $('map');
    let width = window.innerWidth - $('rightSide').offsetWidth;
    let height = window.innerHeight;

    let padding = 20;

    width -= padding;
    height -= padding;

    htmlMap.style.height = width < height ? width + 'px' : height + 'px';

    htmlMap.style.left = (($('body').offsetWidth - htmlMap.offsetWidth) / 2) + 'px';
    htmlMap.style.top = (($('body').offsetHeight - htmlMap.offsetHeight) / 2) + 'px';

}
function loadMaps() {
    $('savesList').innerHTML = '';
    for (let i = 0; i < maps.length; i++) {
        let holder = $('savesList').create('div');
        holder.id = 'savesHolder';
        holder.name = maps[i].name;

        if (currentMap == maps[i].name)
        holder.id = 'SelectedHolder';

        let canvas = holder.create('canvas');
        canvas.className = 'savesCanvas';
        canvas.id = 'canvas' + fixNameForID(maps[i].name);
        canvas.height = 40;
        canvas.width = 40;
        canvas.style.height = '40px';
        canvas.style.width = '40px';
        drawEverything(canvas,maps[i].data,false,false,false,true,false,false)

        let name = holder.create('div');
        name.id = 'savesName';
        name.innerHTML = maps[i].name;
        name.name = maps[i].name;
        holder.onclick = function() {
            selectionName = false;
            selectionTool = false;
            currentMap = this.name;
            loadMaps();
            
            let number = findMapByName(currentMap);
            
            createMap(maps[number].data);
            createOptions();
        }

    }
    //Save All Maps
    ls.save('SCmaps',saveAll())
    //Load Insport
    loadMapInspector();
    //Create Big Map
    let number = findMapByName(currentMap);
    createMap(maps[number].data);
}
function renameMap() {
    let newName = prompt('New Name');
    if (newName === null || newName === '') return;

    let number2 = 1;
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].name === newName) number2++;
    } 
    if (number2 > 1) newName = newName + ' ' + number2;

    maps[findMapByName(currentMap)].name = newName;

    currentMap = newName;
    loadMaps();
}
function newMap() {
    let name = prompt('Name Of New Map')
    if (name === null) return;

    let number = 1;
    let number2 = 1;
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].name.includes("Untitled")) number++;
        if (maps[i].name === name) number2++;
    } 
    if (name === '') name = "Untitled " + number;
    if (number2 > 1) name = name + ' ' + number2;
    maps.push({
        name: name,
        data: makeMap(mapSize,mapSize)
    });

    currentMap = name;
    loadMaps();
}

//Hard Save Single/Current Map
function saveMap() { 
    convertTableToMap();

    console.log(convertTableToMap());
}
function fillTiles() {
    for (let i = 0; i < mapSize; i++) {
        for (let j = 0; j < mapSize; j++) {
            let cell = $('i' + i + 'j' + j);
            cell.tile = checkAttributes();
            loadTile(i,j)
        }
    }
    
    maps[findMapByName(currentMap)].data = converTableToAMap();
    ls.save('SCmaps',saveAll())
    loadMaps();
}
function converTableToAMap() {
    let map = [];
    for (let i = 0; i < mapSize; i++) {
        let row = [];
        for (let j = 0; j < mapSize; j++) {
            let cell = $('i' + i + 'j' + j);
            row.push({
                tile: cell.tile,
                space: cell.space,
                top: cell.top,
                mech: cell.mech,
            })
        }
        map.push(row)
    }
    return map;
}
function convertTableToMap() {
    //Convert Table to a map
    let string = '';
    for (let i = 0; i < mapSize; i++) {
        for (let j = 0; j < mapSize; j++) {
            let cell = $('i' + i + 'j' + j);

            string += cell.tile.id + checkAttributesFromID('tile',cell.tile.id,cell.tile);
            string += '-';
            string += cell.space.id + checkAttributesFromID('space',cell.space.id,cell.space);
            string += '-';
            string += cell.top.id + checkAttributesFromID('top',cell.top.id,cell.top);
            string += '-';
            string += cell.mech.id + checkAttributesFromID('mech',cell.mech.id,cell.mech);
            if (j < mapSize-1) string += ',';
        }
        if (i < mapSize-1) string += "/"
    }
    return string;
}
function convertSaveObjectToString(save) {
    let string = '';
    for (let i = 0; i < save.length; i++) {
        for (let j = 0; j < save.length; j++) {
            let cell = save[i][j];
            if (i == 10 & j == 11) testing = true;

            string += cell.tile.id + checkAttributesFromID('tile',cell.tile.id,cell.tile);
            string += '-';
            string += cell.space.id + checkAttributesFromID('space',cell.space.id,cell.space);
            string += '-';
            string += cell.top.id + checkAttributesFromID('top',cell.top.id,cell.top);
            string += '-';
            string += cell.mech.id + checkAttributesFromID('mech',cell.mech.id,cell.mech);
            if (j < mapSize-1) string += ',';
        }
        if (i < mapSize-1) string += "/"
    }
    return string;
}
function saveAll() {
    let fullString = '';
    for (let i = 0; i < maps.length; i++) {
        fullString += maps[i].name + "}{|" + convertSaveObjectToString(maps[i].data);
        if (i < maps.length - 1) fullString += '|{]';
    }
    return fullString;
}
function loadWorlds() {
    let string = prompt("Paste Worlds Save Here:")
    if (string === null || string === '') return;

    let worlds = decodeAll(string);
    maps = worlds;

    loadMaps();
    let number = findMapByName(currentMap);
    createMap(maps[number].data);
    ls.save('SCmaps',saveAll())
}
function loadFile(file) {
    
    createMap(decodeFile(file));
    
    ls.save('SCmaps',saveAll())
    
    loadMaps();
    
}
function deleteSave(name) {
    maps.splice(findMapByName(name), 1);
    if (maps.length < 1) {
        maps.push({
            name: "Untitled 1",
            data: makeMap(mapSize,mapSize)
        });
        currentMap = 'Untitled 1';
    }
    if (currentMap === name) currentMap = maps[0].name;
    
    let number = findMapByName(currentMap);
    createMap(maps[number].data);
    loadMaps();
    ls.save('SCmaps',saveAll())

}
function testPlay() {
    ls.save('scTestPlayer',convertTableToMap());
    ls.save('scCurrentMap',currentMap);
    let testPlayer = window.open("./testPlay.html","_self")
}
function loadTileInspector() {
    $('rsblIMG').src = '../img/' + selectedCell.img + '.png';
    $('rsblMapName').innerHTML = selectedCell.name

    loadAttributes();
}
function loadMapInspector() {
    let map = maps[findMapByName(currentMap)];
    let canvas = $('rsbrCanvas');

    $('rsbrMapName').innerHTML = map.name;
    
    canvas.height = 40;
    canvas.width = 40;
    canvas.style.height = '40px';
    canvas.style.width = '40px';
    drawEverything(canvas,map.data,false,false,false,true,false,false)

    
}
function cloneMap() {
    let name = currentMap + ' clone';
    let number2 = 1;
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].name === name) number2++;
    } 
    if (number2 > 1) name = name + ' ' + number2;
    maps.push({
        name: name,
        data: maps[findMapByName(currentMap)].data,
    });
    
    currentMap = name;
    loadMaps();
}

function resizeAll() {
    
    //Fix Map Size
    fixMapSize();
}
///////////////////
// End Functions //
///////////////////
//////////////////////////
//  Interative Actions  //
////////////////////////// 

window.addEventListener('mousedown',function(e) {
    mouseDown = true;
    if (e.button == 0) mouseKey = 'left';
    if (e.button == 1) mouseKey = 'middle';
    if (e.button == 2) mouseKey = 'right';
})
window.addEventListener('mouseup',function(e) {
    mouseDown = false;
    mouseKey = false;
})
window.addEventListener('keydown',function(e) {
    let key = e.key;
    let lkey = e.key.toLowerCase(); //Key but in lowercase no matter what 

    if (!isNaN(Number(key))) {
        if (!tiles[Number(key)]) return;
        selectedCell = tiles[Number(key)]
        createTileOptions();
    }
    if (lkey == 'q') {
        showGrid = showGrid ? false : true;
    }
    if (lkey == 'shift') {
        shiftDown = true;
    }
    if (lkey == 'control') {
        controlDown = true;
    }
    if (lkey == 'escape') {
        selectionTool = false;
        selectionName = false;
        for (let i = 0; i < maps[findMapByName(currentMap)].data.length; i++) {
            for (let j = 0; j < maps[findMapByName(currentMap)].data[0].length; j++) {
                $('i' + i + 'j' + j).style.outline = 'none';
            }
        }
        createOptions();
    }
    if (lkey == 'a') rotation = 'left';
    if (lkey == 'd') rotation = 'right';
    if (lkey == 'w') rotation = 'up';
    if (lkey == 's' && !controlDown) rotation = 'down';
    else if (lkey == 's' && controlDown) {
        e.preventDefault();
        saveMap();
    }
    if (lkey == 'l' && controlDown) {
        e.preventDefault();
        loadFile(prompt());
    }
    if (lkey == 'a' || lkey == 's' || lkey == 'd' || lkey == 'w') createOptions();

    if (controlDown && lkey == 'p') {
        e.preventDefault();
        testPlay();
    }
})
window.addEventListener('keyup',function(e) {
    let key = e.key;
    let lkey = e.key.toLowerCase(); //Key but in lowercase no matter what 

    if (lkey == 'shift') {
        shiftDown = false;
    }
    if (lkey == 'control') {
        controlDown = false;
    }
})
window.addEventListener('resize',resizeAll)

///////////////////////////////
//  End Interactive Actions  //
///////////////////////////////

loadImagesFirst();