function toggle(){
    TOGGLE_CLICKED = false;
    const toggle = document.querySelector('.toggle');
    toggle.addEventListener('click',()=>{
        if(!TOGGLE_CLICKED){
            toggle.classList.add('active');
            TOGGLE_CLICKED = true;
            switchTheme(TOGGLE_CLICKED);
            //show panel
        }else{
            toggle.classList.remove('active');
            TOGGLE_CLICKED = false;
            switchTheme(TOGGLE_CLICKED);
        }
    });
}

function switchTheme(toggle_clicked){
    if(toggle_clicked){
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
}


function setRange(number,in_min, in_max, out_min, out_max){
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

console.log(setRange(5,-20, 0, 0 , 1)); 

toggle();