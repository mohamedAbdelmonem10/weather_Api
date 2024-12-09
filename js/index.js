let btnSearch = document.getElementById('btnSearch');
let searchInput = document.getElementById("searchInput");


btnSearch.addEventListener("click", function() {
    search(searchInput.value);
});


let country = [];

async function search(city) {
    try {
        let response = await fetch (`http://api.weatherapi.com/v1/search.json?key=f8df002fbed0461c84a180509240612&q=${city}` , { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "title": "mohamed Abdelmoem" ,
                    "apiKey": "f8df002fbed0461c84a180509240612&q"
                }
            )
        });
        if (response.ok) {
        let data = await response.json();
        
        country = data.country;
        displayData();
        
    
        }
    } catch (error) {
        console.log("Error: " + error);
        
    }
}

search("Germany");  


function displayData () {
    let carton = "";
    for (let i = 0; i < country.length; i++) {
        carton += `
        <div class="col-md-4">
                         <div class="inner">
                             <div class="title text-white-50 d-flex justify-content-between align-items-center p-2">
                                 <span>Thursday</span>
                                 <span>5December</span>
                             </div>
                            <div class="body">
                                <div class="text-white fs-4">
                                    cairo
                                </div>
                                <div class="text-white temp">
                                    21.2oC
                                </div>
                                <img src="./images/116.png" alt="">
                                <div class="text-info pb-3">Partly cloudy</div>
                                <span class="text-white-50"><img src="./images/icon-umberella.png" alt=""> 20%</span>
                            </div>
     
                         </div>
                     </div>        
        `       
    }
    document.getElementById("rowData").innerHTML = carton;
}
