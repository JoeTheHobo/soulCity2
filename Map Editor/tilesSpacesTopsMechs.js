let tiles = [];
tiles.push({
    type: 'tile',
    color: '#444',
    img: 'transparent',
    name: 'Empty',
    walkable: false, //[00w,true/false]
    id: 1,
    speed: 1, //(1)
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
})
tiles.push({
    type: 'tile',
    color: '#875139',
    name: 'Path',
    walkable: true,
    speed: 1,
    img: 'path',
    id: 2,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
})
tiles.push({
    type: 'tile',
    color: '#7C8A35',
    name: 'Grass',
    walkable: true,
    speed: 0.9,
    img: 'grass',
    id: 3,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
})
tiles.push({
    type: 'tile',
    color: '#2773C4',
    name: 'Water',
    walkable: true,
    img: 'water',
    speed: 0.1,
    id: 4,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
})
tiles.push({
    type: 'tile',
    color: '#D9B43E',
    name: 'Sand',
    walkable: true,
    speed: 0.5,
    img: 'sand',
    id: 5,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
})
tiles.push({
    type: 'tile',
    color: '#515056',
    name: 'Stone Brick',
    walkable: false,
    speed: 1, //(1)
    img: 'stoneBrick',
    id: 6,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
})
tiles.push({
    type: 'tile',
    color: 'white',
    name: 'Snow',
    walkable: true,
    speed: 0.5,
    img: 'snow',
    id: 7,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
})
tiles.push({
    type: 'tile',
    color: '#827C84',
    name: 'Gravel',
    walkable: true,
    speed: 1,
    img: 'gravel',
    id: 8,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
})
let selectedCell = tiles[1];
let spaces = [];
spaces.push({
    type: 'space',
    walkable: true,
    name: 'Air',
    img: 'transparent',
    color: 'white',
    id: 1,
    teleport: false,
    draw: false, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});
spaces.push({
    type: 'space',
    walkable: true,
    name: 'Chect',
    img: 'chest',
    color: 'white',
    id: 2,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});
spaces.push({
    type: 'space',
    walkable: true,
    name: 'Bone Fish',
    img: 'boneFish',
    color: 'white',
    id: 3,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});
spaces.push({
    type: 'space',
    walkable: true,
    name: 'Palm Tree',
    img: 'palmTree',
    color: 'white',
    id: 4,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});
spaces.push({
    type: 'space',
    walkable: true,
    name: 'Lamp',
    img: 'Lamp',
    color: 'white',
    id: 5,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});
spaces.push({
    type: 'space',
    walkable: true,
    name: 'Teleporter Blue',
    img: 'teleportA',
    color: 'white',
    id: 6,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});
spaces.push({
    type: 'space',
    walkable: true,
    name: 'Teleporter Red',
    img: 'teleportB',
    color: 'white',
    id: 7,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});
spaces.push({
    type: 'space',
    walkable: true,
    name: 'Teleporter Yellow',
    img: 'teleportC',
    color: 'white',
    id: 8,
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});




let tops = []; //Tops set on top of everything, the player walks below it
tops.push({
    type: 'top',
    name: 'Air',
    img: 'transparent',
    color: 'white',
    id: 1,
    walkable: true, //Default Value
    teleport: false,
    draw: false, //Draw On Mini Canvas In Map Editor
    hideWhenOn: false, //Hide When Player Is On Cell
    hwoID: 0, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 0, //Hide all tiles with HWOID (hideWhenOnID);
});
tops.push({
    type: 'top',
    name: 'Roof',
    img: 'roof',
    color: 'white',
    id: 2,
    walkable: true, //Default Value
    teleport: false,
    draw: false, //Draw On Mini Canvas In Map Editor
    hideWhenOn: true, //Hide When Player Is On Cell
    hwoID: 1, //Hide all tiles with HWOID (hideWhenOnID);
    hwoMyID: 1, //Hide all tiles with HWOID (hideWhenOnID);
});


let mechs = []; //Mechs aren't visible to the player, but perform actions
mechs.push({
    type: 'mech',
    name: 'Air',
    img: 'transparent',
    color: 'white',
    id: 1,
    walkable: true, //Default Value
    testPlayFromHere: false,
    teleport: false,
    draw: false, //Draw On Mini Canvas In Map Editor
});
mechs.push({
    type: 'mech',
    name: 'Portal',
    img: 'portal',
    color: 'white',
    id: 2,
    walkable: true, //Default Value
    testPlayFromHere: false,
    teleport: true,//[]
    draw: true, //Draw On Mini Canvas In Map Editor
});
mechs.push({
    type: 'mech',
    name: 'Player',
    img: 'player',
    color: 'white',
    id: 3,
    testPlayFromHere: true,
    speed: 4,
    walkable: true, //Default Value
    teleport: false,
    draw: true, //Draw On Mini Canvas In Map Editor
});