function searchPlace() {
    const placeInput = document.getElementById("place-search").value.trim();
    const resultsSection = document.getElementById("results-section");
    if (!placeInput) return;
    
    // Clear previous results
    resultsSection.innerHTML = "";

    fetch(`http://localhost:8000/cities/${encodeURIComponent(placeInput)}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data) {
                resultsSection.innerHTML = "<p>Place not found</p>";
                return;
            }
            console.log(data.souvenirs);
            // Create a card for famous places
            const famousPlacesCard = document.createElement("div");
            famousPlacesCard.className = "card";
            famousPlacesCard.innerHTML = `
                <h3>Famous Place of ${data.city}: ${data.famousVisitingPlace.name}</h3>
                 <br>
                <p>Description: ${data.famousVisitingPlace.description}</p>
                 <br>
                <p>Rating: ${data.rating}</p>
                 <br>
                <p>Local langauges : ${data.local_languages} </p>
            `;
            resultsSection.appendChild(famousPlacesCard);

            // Check data.famousVisitingPlace.nearestHotels exists before using it
            if (data.famousVisitingPlace.nearestHotels && data.famousVisitingPlace.nearestHotels.length > 0) {
                const hotelsCard = document.createElement("div");
                hotelsCard.className = "card";
                hotelsCard.innerHTML = `
                    <h3>Hotels Near ${data.famousVisitingPlace.name}</h3>
                    <br>
                    <p>Name:${data.famousVisitingPlace.nearestHotels[0].name}</p>
                    <br>
                    <p>Description :${data.famousVisitingPlace.nearestHotels[0].description}</p>
                    <br>
                    <p>Distance from the ${data.famousVisitingPlace.name} is ${data.famousVisitingPlace.nearestHotels[0].distanceFromPlace} Approximately</p>
                    <br>   
                `;
                resultsSection.appendChild(hotelsCard);
            } else {
                console.warn("Nearest hotel data not available");
            }

            // Check nearestRailwayStation and nearestAirport exist before using them
            if (data.famousVisitingPlace.nearestRailwayStation && data.famousVisitingPlace.nearestAirport) {
                const transportationCard = document.createElement("div");
                transportationCard.className = "card";
                transportationCard.innerHTML = `
                    <h3>Transportation to reach ${data.famousVisitingPlace.name}</h3>
                    <br>
                    <p>Nearest Railway Station: ${data.famousVisitingPlace.nearestRailwayStation.name} ${data.famousVisitingPlace.nearestRailwayStation.distanceFromPlace} Approximately</p>
                    <br>
                    <p>Nearest Airport: ${data.famousVisitingPlace.nearestAirport.name} ${data.famousVisitingPlace.nearestAirport.distanceFromPlace} Approximately</p>
                `;
                resultsSection.appendChild(transportationCard);
            } else {
                console.warn("Nearest transportation data not available");
            }

            // Check data.souvenirs exists  
            if (data.souvenirs && data.souvenirs.length >1) {
                const souvenirsList = data.souvenirs.map(souvenir => {
                    return `<li>Souvenir: ${souvenir.name} <br> <br> Price: ${souvenir.price}  <br><br> Description: ${souvenir.description}</li>`;
                }).join('');
                const souvenirsCard = document.createElement("div");
                souvenirsCard.className = "card";
                souvenirsCard.innerHTML = `
                    <h3>Best Souvenirs from ${data.city}</h3>
                    <br>
                    <ul>${souvenirsList}</ul>
                `;
                resultsSection.appendChild(souvenirsCard);
            } else {
                console.warn("Souvenirs data not available or insufficient");
            }
        })
        .catch((error) =>{
            console.error("Error fetching data:", error);
            resultsSection.innerHTML="<p><strong>Response for this request is currenty not avalaible , We will Update it Soon<strong></p>";
        });
}

