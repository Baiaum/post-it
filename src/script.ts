let idIncrement = 0;
let rz = 'resizable';
let istext = 'isText';
let del = 'del';
let ismov = "isMoveable";
let rzing = 'resizing';
let rzClicked = 'rzClicked';
let isPinned = 'isPinned';
var oldX: number;
var oldY: number;


document.getElementById('btn')?.addEventListener('click', () => {
    let b = document.getElementById("root");
    let color = document.getElementById('color') as HTMLInputElement;
    let h = document.getElementById('height') as HTMLInputElement;
    let w = document.getElementById('width') as HTMLInputElement;
   // console.log("Value: " + w.value, h.value, color.value); 
    if(b && color && h && w){
        let c = document.createElement("textarea");
        if(h.value != '' && w.value != ''){

            c.style.backgroundColor = color.value;
            c.style.width = w.value + 'px';
            c.style.height = h.value + 'px';
            c.style.position = "absolute";
            c.setAttribute('menuActive', "false");
            c.setAttribute(rz, "false");
            c.setAttribute(istext, "false");
            c.setAttribute(rzing, 'false');
            c.setAttribute(ismov, 'true');
            c.setAttribute(isPinned, 'false');
            c.addEventListener('mousedown', (e) => {
                if(e.target){
                    let el = e.target as HTMLElement;
                    //console.log("Event target: " + el)
                    handleClick(el.id);
                    handleDrag(el.id);
                }
            })

            c.addEventListener("contextmenu", (e) => {
                e.preventDefault();

                if(c.getAttribute('menuActive') == "false"){
                    
                    let menu = document.createElement('div');
                    menu.setAttribute('parent', c.id);
                    let ms = menu.style;

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
                    
                    createOption(menu, rz, 'Resizable mode', handleResizable);
                    //createOption(istext, 'Switch between text or image post-it.', menu);
                    createOption(menu, del, 'Delete', handleDelete)
                    createOption(menu, isPinned, 'Pin down', handlePin);
                    createOption(menu, 'bebe', 'To my beloved one.', () => {alert('Yo te quiero mucho mi vida!')})


                    
                    menu.addEventListener("click", () => {
                        menu.remove();
                        c.setAttribute('menuActive', 'false');
                    })

                    c.setAttribute('menuActive', "true");
                    b?.appendChild(menu);
                }

            })
            c.id = idIncrement.toString();
            idIncrement++;
           // console.log("Element style: " + c.style.width, c.style.height, c.style.backgroundColor)
            b.appendChild(c);
            
            
        } else {
            
            alert("Null entry error.")
        }

        
    }
})



function createOption(menu: HTMLElement, state: string, text: string, Action: (parentPostIt: HTMLElement) => void){
    let option = document.createElement('span');
    let parentPostIt = document.getElementById(menu.getAttribute('parent') as string) as HTMLElement;
    option.innerText = text;
    //defineOptAction(state, optionRow, parentPostIt)
    option.addEventListener('click', () => {
        Action(parentPostIt);
    })
    menu.append(option);
}

function defineOptAction(opt: string, optionRow: HTMLSpanElement, parentPostIt: HTMLDivElement){
    if(opt == rz){
        if(!isResizable(parentPostIt)){
            optionRow.addEventListener('click', () => {
                console.log(`Changing ${rz} state of postIt id ${parentPostIt.id} to True`);
                parentPostIt?.setAttribute(rz, 'true');
                parentPostIt.setAttribute(ismov, 'false');

                parentPostIt.addEventListener('mousemove', (e) => {
                    //handleResizable(parentPostIt, e);
                })
            })
        }
        if(isResizable(parentPostIt)){
            optionRow.addEventListener('click', () => {

                parentPostIt.removeEventListener('mousemove', () => {})
                parentPostIt.style.outline = 'none';
            })
        }
    }
    if(opt == istext){
        if(!isText(parentPostIt)){
            optionRow.addEventListener('click', () => {
                console.log(`Changing ${istext} state of postIt id ${parentPostIt.id} to True`);
                parentPostIt?.setAttribute(istext, 'true');
                optionRow.removeEventListener('click', () => {});
            })
        }
        if(isText(parentPostIt)){
            optionRow.addEventListener('click', () => {
                console.log(`Changing resizable state of postIt id ${parentPostIt.id} to False`);
                optionRow.removeEventListener('click', () => {});
                setAttributeDefault(parentPostIt, istext);
            })
        }
    }
}

//HANDLING FUNCTIONS

function handleResizing(el: HTMLDivElement, e: MouseEvent){
    let b = document.getElementById('root');
    b?.removeEventListener('mousemove', () => {})
    el.removeEventListener('click', () => {})


    if(isResizable(el)){

        let event = 'click';

        if(getHoveringSide(el, e) == 'RIGHT'  && !isRzClicked(el)){
            console.log('HOVERING RIGHT SIDE');

            el.addEventListener(event, () => {
                console.log("MOUSE CLICKED ON RIGHT SIDE");
                el.setAttribute(rzing, 'true');
                
                b?.addEventListener('mousemove', (rze) => {
                    console.log('RESIZABLE MOUSE MOVE');
                    
                    if(getMouseDirection(rze) == 'RIGHT'){
                        el.style.width = (parseFloat(el.style.width) + 1) + 'px';
                    }
                })
            })
        }

        if(getHoveringSide(el, e) == 'LEFT'  && !isRzClicked(el)){
            console.log('HOVERING LEFT SIDE');
            el.setAttribute(rzing, 'true');
            el.addEventListener(event, () => {
                console.log("MOUSE CLICKED ON LEFT SIDE");
                b?.addEventListener('mousemove', (rze) => {
                    if(getMouseDirection(rze) == 'RIGHT'){
                        el.style.width = (parseFloat(el.style.width) + 1) + 'px';
                        el.style.left = (parseFloat(el.style.left) - 1) + 'px';
                    }
                })
            })
        }
        if(getHoveringSide(el, e) == 'DOWN'){
            console.log('HOVERING DOWN SIDE');
        }
        if(getHoveringSide(el, e) == 'UP'){
            console.log('HOVERING UP SIDE');
        }
    }
}

function handleRightClick(id: string | null){

}

function handleDrag(id: string | null){
    if(id == null){return console.error(`Argument null is invalid for parameter id: \n  ${id}`)};
    
    let currentEl = document.getElementById(id);
    //console.log("DRAGGING STARTING...")
    window.addEventListener('mousemove', (e) => {
        
        if(currentEl && currentEl.getAttribute('class') == 'clicked' && isMoveable(currentEl)){          
            currentEl.style.left = (e.clientX - currentEl.clientWidth*0.5).toString()+'px';
            currentEl.style.top  = (e.clientY - currentEl.clientHeight*0.5).toString()+'px';
        }
    })

}

function handleClick(id: string | null){
    if(id == null){return console.error(`Argument null is invalid for parameter id: \n  ${id}`)};
    let currentEl = document.getElementById(id);
    currentEl?.setAttribute('class', 'clicked');
    currentEl?.addEventListener('mouseup', () => {
        
       // console.log("STOP DRAGGING...");
        currentEl?.removeAttribute('class');
        window.removeEventListener('mousemove', () => {})
        currentEl?.removeEventListener('mouseup', () => {})
    })
}

function handleDelete(el: HTMLElement){
    if(confirm('Tem certeza que deseja excluir este elemento? ')){
        el.remove();
    }
}

function handleResizable(el: HTMLElement){
    if(isResizable(el)){
        console.log(`Changing ${rz} state of postIt id ${el.id} to False`);
        el.setAttribute(rz, 'false');
        el.setAttribute(ismov, 'true');
        el.style.outline = "none";
        el.removeEventListener('click', () => {})

    } else {
        console.log(`Changing ${rz} state of postIt id ${el.id} to True`);
        el.setAttribute(rz, 'true');
        el.setAttribute(ismov, 'false');
        el.style.outline = "2.5px dashed black";
    }
}

function handlePin(el: HTMLElement){
    if(isPinnedDown(el)){
        console.log(`Changing ${isPinned} state of postIt id ${el.id} to False`);
        el.setAttribute(isPinned, 'false');
        el.setAttribute(ismov, 'true');
        el.style.outline = "none";
        el.removeEventListener('click', () => {})
    } else {
        console.log(`Changing ${isPinned} state of postIt id ${el.id} to True`);
        el.setAttribute(isPinned, 'true');
        el.setAttribute(ismov, 'false');
        el.style.outline = "2.5px dashed brown";
    }
}

//GET STATE FUNCTIONS

function getHoveringSide(el: HTMLElement, e: MouseEvent){
    let pxOffSet = 10;
    let elWidth = parseFloat(el.style.width);
    let elLeft = parseFloat(el.style.left);
    let elTop = parseFloat(el.style.top);
    let elHeight = parseFloat(el.style.height);

    if(e.clientX > (elLeft + elWidth) - pxOffSet){
        return 'RIGHT';
    }
    if(e.clientX < elLeft + pxOffSet){
        return 'LEFT';
    }
    if(e.clientY > (elTop + elHeight) - pxOffSet){
        return 'DOWN';
    }
    if(e.clientY < elTop + pxOffSet){
        return 'UP';
    }
}

function getMouseDirection(e: MouseEvent){
    if(e.clientX > oldX){
        console.log('MOVING RIGHT');
        oldX = e.clientX;
        oldY = e.clientY;
        return 'RIGHT';
    }
    if(e.clientX < oldX){
        console.log('MOVING LEFT');
        oldX = e.clientX;
        oldY = e.clientY;
        return 'LEFT';
    }
    if(e.clientY > oldY){
        console.log('MOVING DOWN');
        oldX = e.clientX;
        oldY = e.clientY;
        return 'DOWN';
    }
    if(e.clientY < oldY){
        console.log('MOVING UP');
        oldX = e.clientX;
        oldY = e.clientY;
        return 'UP';
    }
}

function isResizable(el: HTMLElement){
    if(el.getAttribute(rz) == 'true'){
        return true;
    } else {
        return false;
    }
}

function isPinnedDown(el: HTMLElement){
    if(el.getAttribute(rz) == 'true'){
        return true;
    } else {
        return false;
    }
}

function isText(el: HTMLElement){
    if(el.getAttribute('isText') == 'true'){
        return true;
    } else {
        return false;
    }
}

function isMoveable(el: HTMLElement){
    if(el.getAttribute(ismov) == 'true'){
        return true;
    } else {
        return false;
    }
}

function isRzClicked(el: HTMLElement){
    if(el.getAttribute(rzClicked) == 'true'){
        return true;
    } else {
        return false;
    }
}

function setMoveable(el: HTMLElement, bool: boolean){
    el.setAttribute(ismov, bool == true ? 'true' : 'false');
}

function setAttributeDefault(el: HTMLElement, attr: string){
    console.warn(`Setting attribute ${attr} to false for element ${el.id}`);
    
    el.setAttribute(attr, 'false');


   
}
