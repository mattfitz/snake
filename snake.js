
window.addEventListener('DOMContentLoaded', (event) => {
    DOMLoaded();
});

var _clockInterval, _buffer = [], _canvas, _ctx, _x = [], _y = [], _videoInterval, _videoArray = [];
var _CURPOS_X=0, _CURPOS_Y=0, _BLOCK_SIZE_X=10, _BLOCK_SIZE_Y=10, _CANVAS_WIDTH=800, _CANVAS_HEIGHT=600;
var _DIRECTION_X, _DIRECTION_Y, _VELOCITY=0, _LENGTH=1, _BLOCK_ARRAY = [], _TARGET_BLOCK_X, _TARGET_BLOCK_Y;
var _INTERVAL_RATE=100;
var _BAD_GUYS_X = [], _BAD_GUYS_Y = [], _BAD_GUYS_VELOCITY = [], _BAD_GUYS_DIRECTION_X = [], _BAD_GUYS_DIRECTION_Y = [], _BAD_GUYS_SIZE = [];

function DOMLoaded()
{   //prep canvas
    _canvas = document.getElementById("myCanvas");
    _ctx = _canvas.getContext("2d");
    _ctx.fillStyle = "#0f0";
    
    document.addEventListener("keydown", (event) => { handleKeyDown(event) });
    document.addEventListener("keyup", (event) => { handleKeyUp(event) });
    _CURPOS_X = 180;
    _CURPOS_Y = 180;
    _BLOCK_ARRAY.push([180,180]);
    updateCursor(0,0);
    _ctx.fillRect(90,90,_BLOCK_SIZE_X,_BLOCK_SIZE_Y);
    _TARGET_BLOCK_X = 90;
    _TARGET_BLOCK_Y = 90;
    _clockInterval = setInterval(_clock,_INTERVAL_RATE);
    /*
        todo
            add random block when block is consumed
            extend snake when block is consumed
            add collision with self

    */
    //_videoInterval = setInterval(() => {_buffer.push(_output)},3000);
    /*
    for (var x=0;x<_CANVAS_WIDTH;x++) {
        _x.push(0);
    }
    for (var y=0;y<_CANVAS_HEIGHT;y++) {
        _y.push(0);
    }
    */
    //_output();
    //_interval = setInterval(_output, 16);
}

function _clock()
{
    if (_VELOCITY > 0) moveCursor();
    if (_BAD_GUYS_X.length > 0) moveBadGuys();
    /*
    if (_videoArray.length > 0) {
        _output(_videoArray);
    }
    */
    /*
    if (_videoArray.length > 0) {
        console.log("executing");
        _output(_videoArray.shift());
    }
    */
}

function _output(v)
{
    //console.log("output");
    for (var y=0;y<_CANVAS_HEIGHT;y++) {
        for (var x=0;x<_CANVAS_WIDTH;x++) {
            if (v[y][x]===1) _ctx.fillRect(x,y,1,1);
            else _ctx.clearRect(x,y,1,1);
        }
    }
}

function pushRandom() {
    var a = [], b = [];
    const left = Math.floor(Math.random()*_CANVAS_WIDTH-_BLOCK_SIZE_X);
    _CURPOS_X = left;
    const top = Math.floor(Math.random()*_CANVAS_HEIGHT-_BLOCK_SIZE_Y);
    _CURPOS_Y = top;
    for (var y=0;y<800;y++) {
        a.push(x === left ? 1 : 0);
    }
    for (var x=0;x<600;x++) {
        b.push(y === top ? 1 : 0);
    }
    _x=a;
    _y=b;
    _videoArray.push([a,b]);
}

function initializeVideoArray()
{
    var tempArray = [];
    for (var y=0;y<_CANVAS_HEIGHT;y++)
    {
        var tempArrayValues = [];
        for (var x=0;x<_CANVAS_WIDTH;x++)
        {
            tempArrayValues.push(0);
        }
        tempArray.push(tempArrayValues);
    }
    //console.log("init",tempArray[0]);
    _videoArray = tempArray;
}

function updateArrayCursorMove(x,y)
{
    //console.log("move old",x,y," new",_CURPOS_X,_CURPOS_Y);
    var tempArray = structuredClone(_videoArray);
      
    for (var starty=y;starty<y+_BLOCK_SIZE_Y;starty++)
    {
        for (var startx=x;startx<x+_BLOCK_SIZE_X;startx++)
        {
            tempArray[starty][startx] = 0;
        }
    }
      
    for (var starty=_CURPOS_Y;starty<_CURPOS_Y+_BLOCK_SIZE_Y;starty++)
    {
        for (var startx=_CURPOS_X;startx<_CURPOS_X+_BLOCK_SIZE_X;startx++)
        {
            tempArray[starty][startx] = 1;
        }
    }
    _videoArray=tempArray;
    //console.log(_videoArray);
}

function updateCursor(x, y)
{
    _ctx.clearRect(x,y,_BLOCK_SIZE_X,_BLOCK_SIZE_Y);
    _ctx.fillRect(_CURPOS_X,_CURPOS_Y,_BLOCK_SIZE_X,_BLOCK_SIZE_Y);
}

function moveBadGuys()
{
    for(var n=0;n<_BAD_GUYS_X.length;n++)
    {
        if (_BAD_GUYS_X[n] <= 0 || _BAD_GUYS_X[n] >= _CANVAS_WIDTH) _BAD_GUYS_DIRECTION_X[n]*=-1;
        if (_BAD_GUYS_Y[n] <= 0 || _BAD_GUYS_Y[n] >= _CANVAS_HEIGHT) _BAD_GUYS_DIRECTION_Y[n]*=-1;

        //this doesn't work
        // need to detect actual collision - which means limiting speed
        // or figure out ahead of time that it will collide?
        if ((_BAD_GUYS_DIRECTION_X[n]===-1&&_BAD_GUYS_X[n]<=_TARGET_BLOCK_X+_BLOCK_SIZE_X
            || _BAD_GUYS_DIRECTION_X[n]===1&&_BAD_GUYS_X[n]>=_TARGET_BLOCK_X)
            &&
           (_BAD_GUYS_DIRECTION_Y[n]===-1&&_BAD_GUYS_Y[n]<=_TARGET_BLOCK_Y+_BLOCK_SIZE_Y
            || _BAD_GUYS_DIRECTION_Y[n]===1&&_BAD_GUYS_Y[n]>=_TARGET_BLOCK_Y))
        {
            _BAD_GUYS_DIRECTION_Y[n]*=-1; 
            _BAD_GUYS_DIRECTION_X[n]*=-1;
        } 
        _ctx.clearRect(_BAD_GUYS_X[n],_BAD_GUYS_Y[n],_BAD_GUYS_SIZE[n],_BAD_GUYS_SIZE[n]);
        _BAD_GUYS_X[n] += _BAD_GUYS_VELOCITY[n]*_BAD_GUYS_DIRECTION_X[n];
        _BAD_GUYS_Y[n] += _BAD_GUYS_VELOCITY[n]*_BAD_GUYS_DIRECTION_Y[n];
        _ctx.fillStyle = "#f00";
      
        if (_BAD_GUYS_X[n] > 0 && _BAD_GUYS_X[n] < _CANVAS_WIDTH && _BAD_GUYS_Y[n] > 0 && _BAD_GUYS_Y[n] < _CANVAS_HEIGHT)
            _ctx.fillRect(_BAD_GUYS_X[n],_BAD_GUYS_Y[n],_BAD_GUYS_SIZE[n],_BAD_GUYS_SIZE[n]);
        //console.log(_BAD_GUYS_X[n],_BAD_GUYS_Y[n],_BAD_GUYS_SIZE[n],_BAD_GUYS_SIZE[n]);
    }
}

function moveCursor()
{
    //console.log("_BLOCK_ARRAY: ", _BLOCK_ARRAY.length);
    //console.log("_LENGTH", _LENGTH);
    if (_BLOCK_ARRAY.length<_LENGTH) _BLOCK_ARRAY.push([_CURPOS_X,_CURPOS_Y]);
    else if (_BLOCK_ARRAY.length>=_LENGTH) {
        const deleteMe = _BLOCK_ARRAY.shift();
        _ctx.clearRect(deleteMe[0],deleteMe[1],_BLOCK_SIZE_X,_BLOCK_SIZE_Y);
    }
    //_ctx.clearRect(_CURPOS_X,_CURPOS_Y,_BLOCK_SIZE_X,_BLOCK_SIZE_Y);
    _CURPOS_X+=(_VELOCITY*_DIRECTION_X);
    _CURPOS_Y+=(_VELOCITY*_DIRECTION_Y);
    if (_CURPOS_X<0 || _CURPOS_X+_BLOCK_SIZE_X>_CANVAS_WIDTH) clearInterval(_clockInterval);
    if (_CURPOS_Y<0 || _CURPOS_Y+_BLOCK_SIZE_Y>_CANVAS_HEIGHT) clearInterval(_clockInterval);
    if (_BLOCK_ARRAY.findIndex(x=>x[0]===_CURPOS_X&&x[1]===_CURPOS_Y)>0) clearInterval(_clockInterval);
    _ctx.fillStyle = "#0f0";
    _ctx.fillRect(_CURPOS_X,_CURPOS_Y,_BLOCK_SIZE_X,_BLOCK_SIZE_Y);
    _BLOCK_ARRAY.push([_CURPOS_X,_CURPOS_Y]);
    if (_CURPOS_X===_TARGET_BLOCK_X && _CURPOS_Y===_TARGET_BLOCK_Y) {
        _LENGTH++;
        
        _TARGET_BLOCK_X=Math.floor(Math.random()*((_CANVAS_WIDTH-_BLOCK_SIZE_X)/_BLOCK_SIZE_X))*_BLOCK_SIZE_X;
        console.log("new targetx: ",_TARGET_BLOCK_X);
        _TARGET_BLOCK_Y=Math.floor(Math.random()*((_CANVAS_HEIGHT-_BLOCK_SIZE_Y)/_BLOCK_SIZE_Y))*_BLOCK_SIZE_Y;
        console.log("new targety: ",_TARGET_BLOCK_Y);
        _ctx.fillStyle = "#0f0";
        _ctx.fillRect(_TARGET_BLOCK_X,_TARGET_BLOCK_Y,_BLOCK_SIZE_X,_BLOCK_SIZE_Y);
        clearInterval(_clockInterval);
        _INTERVAL_RATE = _INTERVAL_RATE > 1 ? _INTERVAL_RATE=_INTERVAL_RATE-3 : _INTERVAL_RATE;
        _clockInterval = setInterval(_clock,_INTERVAL_RATE);
        document.getElementById("speed").value=_INTERVAL_RATE;
        document.getElementById("length").value=_LENGTH;
        addBadGuy(Math.floor(Math.random()*_CANVAS_WIDTH),
                    Math.floor(Math.random()*_CANVAS_HEIGHT),
                    0,
                    //Math.floor(Math.random()*2)+1,
                    Math.floor(Math.random()*2),
                    Math.floor(Math.random()*2),
                    Math.floor(Math.random()*10)+5);
        document.getElementById("baddies").value=_BAD_GUYS_X.length;
    }

    function addBadGuy(x, y, v, d_x, d_y, s)
    {
        _BAD_GUYS_X.push(x);
        _BAD_GUYS_Y.push(y);
        _BAD_GUYS_VELOCITY.push(v);
        _BAD_GUYS_DIRECTION_X.push(d_x === 0 ? -1 : 1);
        _BAD_GUYS_DIRECTION_Y.push(d_y === 0 ? -1 : 1);
        _BAD_GUYS_SIZE.push(s);
    }
    //document.getElementById("x").value=_CURPOS_X;
    //document.getElementById("y").value=_CURPOS_Y;
}