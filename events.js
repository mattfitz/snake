
function handleKeyDown(event) {
    //console.log(event.key.toLowerCase());
    switch(event.key.toLowerCase())
    {
        case "arrowleft":
            //if (_CURPOS_X > 0) updateCursor(_CURPOS_X--,_CURPOS_Y);
            //if (_CURPOS_X > 0) updateArrayCursorMove(_CURPOS_X--,_CURPOS_Y);
            _DIRECTION_X=-1;
            _DIRECTION_Y=0;
            _VELOCITY=_BLOCK_SIZE_X;
            break;
        case "arrowright":
            //if (_CURPOS_X < _CANVAS_WIDTH-_BLOCK_SIZE_X) updateCursor(_CURPOS_X++,_CURPOS_Y);
            //if (_CURPOS_X < _CANVAS_WIDTH-_BLOCK_SIZE_X) updateArrayCursorMove(_CURPOS_X++,_CURPOS_Y);
            _DIRECTION_X=1;
            _DIRECTION_Y=0;
            _VELOCITY=_BLOCK_SIZE_X;
            break;
        case "arrowup":
            //if (_CURPOS_Y > 0) updateCursor(_CURPOS_X,_CURPOS_Y--);
            //if (_CURPOS_Y > 0) updateArrayCursorMove(_CURPOS_X,_CURPOS_Y--);
            _DIRECTION_Y=-1;
            _DIRECTION_X=0;
            _VELOCITY=_BLOCK_SIZE_Y;
            break;
        case "arrowdown":
            //if (_CURPOS_Y < _CANVAS_HEIGHT-_BLOCK_SIZE_Y) updateCursor(_CURPOS_X,_CURPOS_Y++);
            //if (_CURPOS_Y < _CANVAS_HEIGHT-_BLOCK_SIZE_Y) updateArrayCursorMove(_CURPOS_X,_CURPOS_Y++);
            _DIRECTION_Y=1;
            _DIRECTION_X=0;
            _VELOCITY=_BLOCK_SIZE_Y;
            break;
    }
/*
    if (evtKey == "home" || evtKey == "end")
    {
        event.preventDefault();
        return;
    }
    else if (evtKey == "alt")
    {
        _ALT = true;
    }
    else if (evtKey == "control")
    {
        _CTRL = true;
    }
    else if (evtKey == "shift")
    {
        _SHIFT = true;
    }
    if (event.repeat)
    {
        if (evtKey == "arrowleft")
        {
            if (_cursorPos > 0)
            {
                _cursorPos--;
                _cursorX -= _cursorW;
            }
        }
        else if (evtKey == "arrowright")
        {
            if (_cursorPos < _cursorMaxPos)
            {
                _cursorPos++;
                _cursorX += _cursorW;
            }
        }
        else if (evtKey == "backspace")
        {
            _cursorPos--;
            _cursorX -= _cursorW;
        }
        else if (evtKey != "delete")
        {
            _cursorPos++;
            _cursorX += _cursorW;
        }
        clearAndDraw();
    }
    */
}

function handleKeyUp(event) {
    //var evtKey = event.key.toLowerCase();
    switch(event.key.toLowerCase())
    {
        case "arrowleft":
            break;
        case "arrowright":
            break;
        case "arrowdown":
            break;
        case "arrowup":
            break;
    }
    /*
    if (evtKey == "alt")
    {
        _ALT = false;
    }
    else if (evtKey == "control")
    {
        _CTRL = false;
    }
    else if (evtKey == "shift")
    {
        _SHIFT = false;
    }
    if (evtKey == "arrowleft")
    {
        if (_cursorPos > 0)
        {
            _cursorPos--;
            _cursorX -= _cursorW;
        }
    }
    else if (evtKey == "arrowright")
    {
        if (_cursorPos < _cursorMaxPos)
        {
            _cursorPos++;
            _cursorX += _cursorW;
        }
    }

            if (evtKey == "home" || evtKey == "end")
            {
                //not sure how to stifle this key press. "ketpress" doesn't fire for these guys. returning false doesn't prevent output
                //maybe just allow it and manage the cursor position?
            }
            */
}