let TOGGLE_CLICKED = false;
let DETAILS_EXPANDED = false; 



function groupByContinent(obj){
    let continents = {
        europe : [],
        northAmerica : [],
        southAmerica : [],
        asia : [],
        africa : [],
    };
    obj.forEach((country)=>{
        switch (country.continent) {
            case "Europe":
                continents.europe.push(country);
                break;
            case "North-America":
                continents.northAmerica.push(country);
                break;
            case "South-America":
                continents.southAmerica.push(country);
                break;
            case "Asia":
                continents.asia.push(country);
                break;
            case "Africa":
                continents.africa.push(country);
                break;
        }
    });
    return continents;
}

function sortingBy(array,type){
    helperArray = [];
    Object.entries(array).forEach((property)=>{
        const sorted=property[1].sort((a, b) => {
            return b[type].total - a[type].total;
        });
        helperArray.push(sorted);
    });
    return helperArray;
}

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

function toHTML(array){
    const containerCountries = document.querySelector('.countries');
    let html;
    array.forEach(continent=>{
        html += `<div class="divider">${continent[0].continent}</div>`;
            html += continent.map(country=>{
                return `
                <div class="country">
                    <div class="graph">
                        <div class="progress"></div>
                    </div>
                    <div class="label">
                        <span class="countryTitle">${country.country}</span>
                        <div class="wrapperCounter">
                            <span class="labelCounter">Deaths:</span>
                            <span class="counter">${country.deaths.total}</span>
                        </div>
                    </div>
                </div>`
            }).join('');
    });
    containerCountries.innerHTML = html;
}

function sortBy(array,continent){
    let sortedArray = [];
    array.forEach((el)=>{
        if(el.continent == `${continent}`) sortedArray.push(el);
    }); 
    return sortedArray;
}

function displayCountries(){
    fetch("https://covid-193.p.rapidapi.com/statistics", { 
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
        const continents = groupByContinent(json.response);
        const sorted = sortingBy(continents,'deaths');
        toHTML(sorted);
    })
    .catch(err => { 
        console.error(err); 
    }); 
}

displayCountries();
showProjectDetails();
