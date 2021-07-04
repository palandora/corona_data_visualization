let TOGGLE_CLICKED = false;
let DETAILS_EXPANDED = false; 
let countries = [];

function toggle(){
    const toggle = document.querySelector('.toggle');
    toggle.addEventListener('click',()=>{
        if(!TOGGLE_CLICKED){
            toggle.classList.add('active');
            TOGGLE_CLICKED = true;
            switchTheme(TOGGLE_CLICKED);
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

function showProjectDetails(){
    const toggle = document.querySelector('.toggleDetails');
    const projectDesc = document.querySelector('.details');
    let isToggled = true;
    toggle.addEventListener('click', ()=>{
        if(!DETAILS_EXPANDED){
            projectDesc.style.display = 'flex';
            toggle.style.transform = 'rotate(90deg)';
            DETAILS_EXPANDED = true;
        }else{
            projectDesc.style.display = 'none';
            toggle.style.transform = 'rotate(0deg)';
            DETAILS_EXPANDED = false;
        }
    });
}

function createCountry(name){
    const containerCountries = document.querySelector('.countries');
    const country = document.createElement('div');
    country.setAttribute('class','country');
    country.innerHTML = `
    <div class="graph">
        <div class="progress"></div>
    </div>
    <div class="label">
        <span class="countryTitle">${name}</span>
        <div class="wrapperCounter">
            <span class="labelCounter">Deaths:</span>
            <span class="counter">20</span>
        </div>
    </div>
    `;
    containerCountries.appendChild(country);
}

function fetchCountryData(){
    fetch("https://covid-193.p.rapidapi.com/countries", { 
        "method": "GET", 
        "headers": { 
            "x-rapidapi-key": "19a8b95264msh832c52455a1af68p1633e1jsnb88c59beb99a", 
            "x-rapidapi-host": "covid-193.p.rapidapi.com" 
        } 
    }) 
    .then(response => { 
        return response.json();
    })
    .then(json =>{
        json.response.forEach(country => {
            createCountry(country);
        });
    })
    .catch(err => { 
        console.error(err); 
    });
}


fetchCountryData();
showProjectDetails();
