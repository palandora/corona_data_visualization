

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
        if(data.length > 120) data.length = 120;
        callback(data);
    })
    .catch(err => {console.error(err)})
}

function toHTML(json){
    let html = '';
    const containerDays = document.querySelector('.history');
    for(let i=0;i<json.length-1;i++){
        if(json[i].day!=json[i+1].day){
            if(json[i].deaths.new == null) json[i].deaths.new = "0" 
            console.log(json[i].deaths.new)
            html += `
            <div class="day">
                <div class="cases">
                    <div class="child" id="cases_new">
                        <div class="graph">
                            <div class="progress"></div>
                        </div>
                        <div class="label">
                            ${json[i].cases.new}
                        </div>
                    </div>
                    <div class="child" id="cases_active">
                        <div class="graph">
                            <div class="progress"></div>
                        </div>
                        <div class="label">
                            ${json[i].cases.active}
                        </div>
                    </div>
                    <div class="child" id="cases_critical">
                        <div class="graph">
                            <div class="progress"></div>
                        </div>
                        <div class="label">
                            ${json[i].cases.critical}
                        </div>
                    </div>
                    <div class="child" id="cases_recovered">
                        <div class="graph">
                            <div class="progress"></div>
                        </div>
                        <div class="label">
                            ${json[i].cases.recovered}
                        </div>
                    </div>
                    <div class="child" id="cases_total">
                        <div class="graph">
                            <div class="progress"></div>
                        </div>
                        <div class="label">
                            ${json[i].cases.total}
                        </div>
                    </div>
                </div>
                <div class="deaths">
                    <div class="child" id="deaths_new">
                        <div class="graph">
                            <div class="progress"></div>
                        </div>
                        <div class="label">
                            ${json[i].deaths.new}
                        </div>
                    </div>
                    <div class="child" id="deaths_total">
                        <div class="graph">
                            <div class="progress"></div>
                        </div>
                        <div class="label">
                            ${json[i].deaths.total}
                        </div>
                    </div>
                </div> 
            </div>
            `
        }
    }
    containerDays.innerHTML = html;


    
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
