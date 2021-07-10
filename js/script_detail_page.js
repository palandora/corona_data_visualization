
function toggle(){
    TOGGLE_CLICKED = false;
    const toggle = document.querySelector('.toggle');
    toggle.addEventListener('click',()=>{
        if(!TOGGLE_CLICKED){
            toggle.classList.add('active');
            TOGGLE_CLICKED = true;
            switchTheme(TOGGLE_CLICKED);
            toggleDeaths(true);
        }else{
            toggle.classList.remove('active');
            TOGGLE_CLICKED = false;
            switchTheme(TOGGLE_CLICKED);
            toggleDeaths(false);
        }
    });
}

function switchTheme(toggle_clicked){
    const nav = document.querySelector('nav');
    if(toggle_clicked){
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        nav.classList.add('toggled');
    }else{
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        nav.classList.remove('toggled');
    }
}

function toggleDeaths(toggle){
    details = document.querySelector('.deaths');
    if(toggle){
        details.style.display = 'flex';
    }else{
        details.style.display = 'none';
    }
}

toggle();