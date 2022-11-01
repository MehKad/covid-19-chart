/*-----------------   creat liste of contries   |<https://api.covid19api.com/countries>|       --------------*/


var side = document.getElementById('side');
let httpReq = new XMLHttpRequest();
httpReq.open("GET", "https://api.covid19api.com/countries", true);
httpReq.onreadystatechange = function(){
    if(httpReq.readyState === 4 && httpReq.status === 200){
        let resp = JSON.parse(httpReq.response)
        /*---- stock list of contries in array ----- */
        let cont = resp.map(e=> e.Country);
        for(let i = 0; i<cont.length; i++)
        {
            let myDev = document.createElement("div");
            myDev.innerHTML = cont[i];
            /*--------creat new element HTML for organize liste of contries----*/
            myDev.setAttribute('id', 'contries');
            myDev.addEventListener('click', divClicked)
            side.appendChild(myDev)
            
        }
    }
}
/*---------Envoi la reqet--------- */
httpReq.send();

/*---------------------->>> retourne le nome de pays cliqué et organisé le graphe----*/
function  divClicked(e){
    var tar = e.target.innerHTML;
    
    var ctx = document.getElementById('contentt').getContext('2d');
    if(window.bar!=undefined)
        window.bar.destroy();/*---efacé le graphe précédent---*/
    let p = new XMLHttpRequest();
    var CountrY = tar;
    var CONFIRMED = [];
    var DATE = [];
    var ACTIVE = [];
    var DEATHS = [];
    var RECOVERED = [];
    p.open("GET", "https://api.covid19api.com/dayone/country/"+CountrY, true);
    p.onreadystatechange = function(){
        if(p.readyState === 4 && p.status === 200){
            let resp = JSON.parse(p.response)
            
            
            for(let i = 0; i < resp.length; i++){
                DATE.push(resp[i].Date.slice(5, 10));
                CONFIRMED.push(resp[i].Confirmed);
                ACTIVE.push(resp[i].Active);
                DEATHS.push(resp[i].Deaths);
                RECOVERED.push(resp[i].Recovered);
                
            }
            
                    
            window.bar  = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: DATE,
                    datasets: [{
                        label: 'Confirmed',
                        data: CONFIRMED,
                        backgroundColor: [
                            'rgba(245, 6, 6, 0.2)',
                        ],
                        borderColor: [
                            'rgba(14, 245, 6, 0.9)'
                        ],
                    },
                    {
                        label: 'Active',
                        data: ACTIVE,                    
                        backgroundColor: [
                            'rgba(90, 6, 245, 0.3)',
                        ],
                        borderColor: [
                            'rgba(4, 8, 4, 0.7)'
                        ],
                        
                    },
                    {
                        label: 'Deaths',
                        data: DEATHS,
                        backgroundColor: [
                            'rgba(14, 245, 6, 0.4)',
                        ],
                        borderColor: [
                            'rgba(247, 3, 3, 0.9)'
                        ],
                    },
                    {
                        label: 'Recovred',
                        data: RECOVERED,
                        backgroundColor: [
                            'rgba(226, 24, 192, 0.3)',
                        ],
                        borderColor: [
                            'rgba(56, 3, 247, 0.9)'
                        ],
                    }
                ]
                },
                options: {
                    title:{
                        display:true,
                        text: tar,/*---------------------->>>>  montion name of contry clicked ---*/
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }
    p.send();

}









