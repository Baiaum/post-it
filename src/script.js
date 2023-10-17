var _a;
var idIncrement = 0;
var rz = 'resizable';
var istext = 'isText';
var del = 'del';
var ismov = "isMoveable";
var rzing = 'resizing';
var rzClicked = 'rzClicked';
var isPinned = 'isPinned';
var oldX;
var oldY;
(_a = document.getElementById('btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var b = document.getElementById("root");
    var color = document.getElementById('color');
    var h = document.getElementById('height');
    var w = document.getElementById('width');
    // console.log("Value: " + w.value, h.value, color.value); 
    if (b && color && h && w) {
        var c_1 = document.createElement("textarea");
        if (h.value != '' && w.value != '') {
            c_1.style.backgroundColor = color.value;
            c_1.style.width = w.value + 'px';
            c_1.style.height = h.value + 'px';
            c_1.style.position = "absolute";
            c_1.setAttribute('menuActive', "false");
            c_1.setAttribute(rz, "false");
            c_1.setAttribute(istext, "false");
            c_1.setAttribute(rzing, 'false');
            c_1.setAttribute(ismov, 'true');
            c_1.setAttribute(isPinned, 'false');
            c_1.addEventListener('mousedown', function (e) {
                if (e.target) {
                    var el = e.target;
                    //console.log("Event target: " + el)
                    handleClick(el.id);
                    handleDrag(el.id);
                }
            });
            c_1.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                if (c_1.getAttribute('menuActive') == "false") {
                    var menu_1 = document.createElement('div');
                    menu_1.setAttribute('parent', c_1.id);
                    var ms = menu_1.style;
                    ms.display = "flex";
                    ms.flexDirection = "column";
                    ms.width = "fit-content";
                    ms.height = "fit-content";
                    ms.padding = "2px";
                    ms.backgroundColor = "#16161d";
                    ms.color = "#fff";
                    ms.position = "absolute";
                    ms.left = e.clientX - 5 + "px";
                    ms.top = e.clientY - 5 + "px";
                    createOption(menu_1, rz, 'Resizable mode', handleResizable);
                    //createOption(istext, 'Switch between text or image post-it.', menu);
                    createOption(menu_1, del, 'Delete', handleDelete);
                    createOption(menu_1, isPinned, 'Pin down', handlePin);
                    createOption(menu_1, 'bebe', 'Say I love my baby', function () { alert('Yo te quiero mucho mi amorsita!'); });
                    menu_1.addEventListener("click", function () {
                        menu_1.remove();
                        c_1.setAttribute('menuActive', 'false');
                    });
                    c_1.setAttribute('menuActive', "true");
                    b === null || b === void 0 ? void 0 : b.appendChild(menu_1);
                }
            });
            c_1.id = idIncrement.toString();
            idIncrement++;
            // console.log("Element style: " + c.style.width, c.style.height, c.style.backgroundColor)
            b.appendChild(c_1);
        }
        else {
            alert("Null entry error.");
        }
    }
});
function createOption(menu, state, text, Action) {
    var option = document.createElement('span');
    var parentPostIt = document.getElementById(menu.getAttribute('parent'));
    option.innerText = text;
    //defineOptAction(state, optionRow, parentPostIt)
    option.addEventListener('click', function () {
        Action(parentPostIt);
    });
    menu.append(option);
}
function defineOptAction(opt, optionRow, parentPostIt) {
    if (opt == rz) {
        if (!isResizable(parentPostIt)) {
            optionRow.addEventListener('click', function () {
                console.log("Changing ".concat(rz, " state of postIt id ").concat(parentPostIt.id, " to True"));
                parentPostIt === null || parentPostIt === void 0 ? void 0 : parentPostIt.setAttribute(rz, 'true');
                parentPostIt.setAttribute(ismov, 'false');
                parentPostIt.addEventListener('mousemove', function (e) {
                    //handleResizable(parentPostIt, e);
                });
            });
        }
        if (isResizable(parentPostIt)) {
            optionRow.addEventListener('click', function () {
                parentPostIt.removeEventListener('mousemove', function () { });
                parentPostIt.style.outline = 'none';
            });
        }
    }
    if (opt == istext) {
        if (!isText(parentPostIt)) {
            optionRow.addEventListener('click', function () {
                console.log("Changing ".concat(istext, " state of postIt id ").concat(parentPostIt.id, " to True"));
                parentPostIt === null || parentPostIt === void 0 ? void 0 : parentPostIt.setAttribute(istext, 'true');
                optionRow.removeEventListener('click', function () { });
            });
        }
        if (isText(parentPostIt)) {
            optionRow.addEventListener('click', function () {
                console.log("Changing resizable state of postIt id ".concat(parentPostIt.id, " to False"));
                optionRow.removeEventListener('click', function () { });
                setAttributeDefault(parentPostIt, istext);
            });
        }
    }
}
//HANDLING FUNCTIONS
function handleResizing(el, e) {
    var b = document.getElementById('root');
    b === null || b === void 0 ? void 0 : b.removeEventListener('mousemove', function () { });
    el.removeEventListener('click', function () { });
    if (isResizable(el)) {
        var event_1 = 'click';
        if (getHoveringSide(el, e) == 'RIGHT' && !isRzClicked(el)) {
            console.log('HOVERING RIGHT SIDE');
            el.addEventListener(event_1, function () {
                console.log("MOUSE CLICKED ON RIGHT SIDE");
                el.setAttribute(rzing, 'true');
                b === null || b === void 0 ? void 0 : b.addEventListener('mousemove', function (rze) {
                    console.log('RESIZABLE MOUSE MOVE');
                    if (getMouseDirection(rze) == 'RIGHT') {
                        el.style.width = (parseFloat(el.style.width) + 1) + 'px';
                    }
                });
            });
        }
        if (getHoveringSide(el, e) == 'LEFT' && !isRzClicked(el)) {
            console.log('HOVERING LEFT SIDE');
            el.setAttribute(rzing, 'true');
            el.addEventListener(event_1, function () {
                console.log("MOUSE CLICKED ON LEFT SIDE");
                b === null || b === void 0 ? void 0 : b.addEventListener('mousemove', function (rze) {
                    if (getMouseDirection(rze) == 'RIGHT') {
                        el.style.width = (parseFloat(el.style.width) + 1) + 'px';
                        el.style.left = (parseFloat(el.style.left) - 1) + 'px';
                    }
                });
            });
        }
        if (getHoveringSide(el, e) == 'DOWN') {
            console.log('HOVERING DOWN SIDE');
        }
        if (getHoveringSide(el, e) == 'UP') {
            console.log('HOVERING UP SIDE');
        }
    }
}
function handleRightClick(id) {
}
function handleDrag(id) {
    if (id == null) {
        return console.error("Argument null is invalid for parameter id: \n  ".concat(id));
    }
    ;
    var currentEl = document.getElementById(id);
    //console.log("DRAGGING STARTING...")
    window.addEventListener('mousemove', function (e) {
        if (currentEl && currentEl.getAttribute('class') == 'clicked' && isMoveable(currentEl)) {
            currentEl.style.left = (e.clientX - currentEl.clientWidth * 0.5).toString() + 'px';
            currentEl.style.top = (e.clientY - currentEl.clientHeight * 0.5).toString() + 'px';
        }
    });
}
function handleClick(id) {
    if (id == null) {
        return console.error("Argument null is invalid for parameter id: \n  ".concat(id));
    }
    ;
    var currentEl = document.getElementById(id);
    currentEl === null || currentEl === void 0 ? void 0 : currentEl.setAttribute('class', 'clicked');
    currentEl === null || currentEl === void 0 ? void 0 : currentEl.addEventListener('mouseup', function () {
        // console.log("STOP DRAGGING...");
        currentEl === null || currentEl === void 0 ? void 0 : currentEl.removeAttribute('class');
        window.removeEventListener('mousemove', function () { });
        currentEl === null || currentEl === void 0 ? void 0 : currentEl.removeEventListener('mouseup', function () { });
    });
}
function handleDelete(el) {
    if (confirm('Tem certeza que deseja excluir este elemento? ')) {
        el.remove();
    }
}
function handleResizable(el) {
    if (isResizable(el)) {
        console.log("Changing ".concat(rz, " state of postIt id ").concat(el.id, " to False"));
        el.setAttribute(rz, 'false');
        el.setAttribute(ismov, 'true');
        el.style.outline = "none";
        el.removeEventListener('click', function () { });
    }
    else {
        console.log("Changing ".concat(rz, " state of postIt id ").concat(el.id, " to True"));
        el.setAttribute(rz, 'true');
        el.setAttribute(ismov, 'false');
        el.style.outline = "2.5px dashed black";
    }
}
function handlePin(el) {
    if (isPinnedDown(el)) {
        console.log("Changing ".concat(isPinned, " state of postIt id ").concat(el.id, " to False"));
        el.setAttribute(isPinned, 'false');
        el.setAttribute(ismov, 'true');
        el.style.outline = "none";
        el.removeEventListener('click', function () { });
    }
    else {
        console.log("Changing ".concat(isPinned, " state of postIt id ").concat(el.id, " to True"));
        el.setAttribute(isPinned, 'true');
        el.setAttribute(ismov, 'false');
        el.style.outline = "2.5px dashed brown";
    }
}
//GET STATE FUNCTIONS
function getHoveringSide(el, e) {
    var pxOffSet = 10;
    var elWidth = parseFloat(el.style.width);
    var elLeft = parseFloat(el.style.left);
    var elTop = parseFloat(el.style.top);
    var elHeight = parseFloat(el.style.height);
    if (e.clientX > (elLeft + elWidth) - pxOffSet) {
        return 'RIGHT';
    }
    if (e.clientX < elLeft + pxOffSet) {
        return 'LEFT';
    }
    if (e.clientY > (elTop + elHeight) - pxOffSet) {
        return 'DOWN';
    }
    if (e.clientY < elTop + pxOffSet) {
        return 'UP';
    }
}
function getMouseDirection(e) {
    if (e.clientX > oldX) {
        console.log('MOVING RIGHT');
        oldX = e.clientX;
        oldY = e.clientY;
        return 'RIGHT';
    }
    if (e.clientX < oldX) {
        console.log('MOVING LEFT');
        oldX = e.clientX;
        oldY = e.clientY;
        return 'LEFT';
    }
    if (e.clientY > oldY) {
        console.log('MOVING DOWN');
        oldX = e.clientX;
        oldY = e.clientY;
        return 'DOWN';
    }
    if (e.clientY < oldY) {
        console.log('MOVING UP');
        oldX = e.clientX;
        oldY = e.clientY;
        return 'UP';
    }
}
function isResizable(el) {
    if (el.getAttribute(rz) == 'true') {
        return true;
    }
    else {
        return false;
    }
}
function isPinnedDown(el) {
    if (el.getAttribute(rz) == 'true') {
        return true;
    }
    else {
        return false;
    }
}
function isText(el) {
    if (el.getAttribute('isText') == 'true') {
        return true;
    }
    else {
        return false;
    }
}
function isMoveable(el) {
    if (el.getAttribute(ismov) == 'true') {
        return true;
    }
    else {
        return false;
    }
}
function isRzClicked(el) {
    if (el.getAttribute(rzClicked) == 'true') {
        return true;
    }
    else {
        return false;
    }
}
function setMoveable(el, bool) {
    el.setAttribute(ismov, bool == true ? 'true' : 'false');
}
function setAttributeDefault(el, attr) {
    console.warn("Setting attribute ".concat(attr, " to false for element ").concat(el.id));
    el.setAttribute(attr, 'false');
}
