

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

function snychronizeScroll(){
    let isSyncingLeftScroll = false;
    let isSyncingRightScroll = false;
    let titleBar = document.querySelector('.titleBar'); 
    let history = document.querySelector('.history'); 

    titleBar.addEventListener('scroll',()=>{
        if (!isSyncingLeftScroll) {
            isSyncingRightScroll = true;
            history.scrollLeft = titleBar.scrollLeft;
        }
        isSyncingLeftScroll = false;
    });
    history.addEventListener('scroll',()=>{
        if (!isSyncingRightScroll) {
            isSyncingLeftScroll = true;
            titleBar.scrollLeft = history.scrollLeft;
        }
        isSyncingRightScroll = false;
    });
}

function formatNumber(number){
    return new Intl.NumberFormat('en-GB').format(number);
}

function fetchHistData(countryName,callback){
    fetch(`https://covid-193.p.rapidapi.com/history?country=${countryName}`, { 
        "method": "GET", 
        "headers": { 
            "x-rapidapi-key": "19a8b95264msh832c52455a1af68p1633e1jsnb88c59beb99a", 
            "x-rapidapi-host": "covid-193.p.rapidapi.com" 
        } 
    }) 
    .then(res => {return res.json()})
    .then(json => {
        const data = json.response;
        if(data.length > 350) data.length = 350;
        callback(data);
    })
    .catch(err => {console.error(err)})
}

function toHTML(json){
    let htmlHistory = '';
    let htmlDeaths = '';
    let daysSorted = [];
    let daysStartOfMonth = [];
    const containerDays = document.querySelector('.history');
    const containerDeaths = document.querySelector('.deaths');

    for(let i=0;i<json.length-1;i++){
        if(json[i].day!=json[i+1].day){
            daysSorted.push(json[i]);
            if(json[i].deaths.new == null) json[i].deaths.new = "0";
            if(json[i].day.slice(8, 13)==1){
                daysStartOfMonth.push(json[i]);
                htmlDeaths+= `
                <div class="childDeaths">
                    <div class="graph">
                        <div class="progress"></div>
                    </div>
                    <div class="label">
                        <span class="counter">${formatNumber(json[i].deaths.total)}</span>
                        <span class="date">${json[i].day}</span>
                    </div>
                </div>
                `
            }
            htmlHistory += `
            <div class="date_div">
                ${json[i].day}
            </div>
            <div class="day">
                <div class="cases">
                    <div class="child" id="cases_new">
                        <div class="graph">
                            <div class="progress" id="pg_cases_new"></div>
                        </div>
                        <div class="label">
                            ${formatNumber(json[i].cases.new)}
                        </div>
                    </div>
                    <div class="child" id="cases_active">
                        <div class="graph">
                            <div class="progress" id="pg_cases_active"></div>
                        </div>
                        <div class="label">
                            ${formatNumber(json[i].cases.active)}
                        </div>
                    </div>
                    <div class="child" id="cases_critical">
                        <div class="graph">
                            <div class="progress" id="pg_cases_critical"></div>
                        </div>
                        <div class="label">
                            ${formatNumber(json[i].cases.critical)}
                        </div>
                    </div>
                    <div class="child" id="cases_recovered">
                        <div class="graph">
                            <div class="progress" id="pg_cases_recovered"></div>
                        </div>
                        <div class="label">
                            ${formatNumber(json[i].cases.recovered)}
                        </div>
                    </div>
                    <div class="child" id="cases_total">
                        <div class="graph">
                            <div class="progress" id="pg_cases_total"></div>
                        </div>
                        <div class="label">
                            ${formatNumber(json[i].cases.total)}
                        </div>
                    </div>
                </div>
                <div class="deaths">
                    <div class="child" id="deaths_new">
                        <div class="graph">
                            <div class="progress" id="pg_deaths_new"></div>
                        </div>
                        <div class="label">
                            ${formatNumber(json[i].deaths.new)}
                        </div>
                    </div>
                    <div class="child" id="deaths_total">
                        <div class="graph">
                            <div class="progress" id="pg_deaths_total"></div>
                        </div>
                        <div class="label">
                            ${formatNumber(json[i].deaths.total)}
                        </div>
                    </div>
                </div> 
            </div>
            `
        }
    }
    containerDays.innerHTML = htmlHistory;
    containerDeaths.innerHTML = htmlDeaths;

    //set progress for history
    const days = document.querySelectorAll('.day');
    let index = 0;
    const SCALE = 0.0045;
    days.forEach((day)=>{
        const cases = daysSorted[index].cases;
        const deaths = daysSorted[index].deaths;
        day.querySelector('#pg_cases_new').style.transform = `scale(${cases.new*SCALE}%)`;
        day.querySelector('#pg_cases_active').style.transform = `scale(${cases.active*SCALE}%)`;
        day.querySelector('#pg_cases_critical').style.transform = `scale(${cases.critical*SCALE}%)`;
        day.querySelector('#pg_cases_recovered').style.transform = `scale(${cases.recovered*SCALE}%)`;
        day.querySelector('#pg_cases_total').style.transform = `scale(${cases.total*SCALE}%)`;
        day.querySelector('#pg_deaths_new').style.transform = `scale(${deaths.new*SCALE}%)`;
        day.querySelector('#pg_deaths_total').style.transform = `scale(${deaths.total*SCALE}%)`;
        index++;
    });
    //set progress for deaths
    const deaths = document.querySelectorAll('.childDeaths');
    let iterator = 0;
    deaths.forEach(death=>{
        const deaths = daysStartOfMonth[iterator].deaths;
        death.querySelector('.progress').style.transform = `scale(${deaths.total*0.00095}%)`;
        iterator++;
    });



}

function loadPageContent(){
    const countryName = localStorage.getItem('country');
    const pageTitle = document.querySelector('.countryTitle');
    pageTitle.textContent = countryName;

    fetchHistData(countryName,toHTML)

}






toggle();
snychronizeScroll();
loadPageContent();
