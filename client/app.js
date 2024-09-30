console.log("connected");

let gameReviewWrapper = document.querySelector("section")

function addGameReview(data){
    let reviewWrapper = document.createElement("div");
    reviewWrapper.classList.add("review-item");

    let reviewHeader = document.createElement("div");
    reviewHeader.classList.add("review-header");

    let gameName = document.createElement("h3");
    gameName.textContent = data.name;
    reviewHeader.appendChild(gameName);
    
    let ratingGame = document.createElement("span");
    //ratingGame.textContent = data.rating;

    let icon1 = document.createElement("ion-icon");
    let icon2 = document.createElement("ion-icon");
    let icon3 = document.createElement("ion-icon");
    let icon4 = document.createElement("ion-icon");
    let icon5 = document.createElement("ion-icon");

    if(data.rating == 1) {
        icon1.setAttribute("name", "star");
        icon2.setAttribute("name", "star-outline");
        icon3.setAttribute("name", "star-outline");
        icon4.setAttribute("name", "star-outline");
        icon5.setAttribute("name", "star-outline");
    }else if (data.rating == 2){
        icon1.setAttribute("name", "star");
        icon2.setAttribute("name", "star");
        icon3.setAttribute("name", "star-outline");
        icon4.setAttribute("name", "star-outline");
        icon5.setAttribute("name", "star-outline");
    }else if (data.rating == 3){
        icon1.setAttribute("name", "star");
        icon2.setAttribute("name", "star");
        icon3.setAttribute("name", "star");
        icon4.setAttribute("name", "star-outline");
        icon5.setAttribute("name", "star-outline");
    }else if (data.rating == 4){
        icon1.setAttribute("name", "star");
        icon2.setAttribute("name", "star");
        icon3.setAttribute("name", "star");
        icon4.setAttribute("name", "star");
        icon5.setAttribute("name", "star-outline");
    }else{
        icon1.setAttribute("name", "star");
        icon2.setAttribute("name", "star");
        icon3.setAttribute("name", "star");
        icon4.setAttribute("name", "star");
        icon5.setAttribute("name", "star");
    }

    ratingGame.classList.add("rating");
    ratingGame.appendChild(icon1);
    ratingGame.appendChild(icon2);
    ratingGame.appendChild(icon3);
    ratingGame.appendChild(icon4);
    ratingGame.appendChild(icon5);
    
    reviewHeader.appendChild(ratingGame);
    reviewWrapper.appendChild(reviewHeader);
    
    let descGame = document.createElement("p");
    descGame.textContent = data.description;
    descGame.classList.add("review-description");
    reviewWrapper.appendChild(descGame);
    gameReviewWrapper.appendChild(reviewWrapper);
}


function loadGameFromServer(){
    fetch("http://localhost:8080/games")
    .then(function(response){
        response.json()
            .then(function(data){
                console.log(data);
                let Games = data;
                Games.forEach(addGameReview) //calls function on each item in Games
            })
    })
}


let addMessageButton = document.querySelector("#add-message-button")
function addNewReview(){
    console.log("button clicked");
    
    //grab text from textarea
    let inputText = document.querySelector("#message-input");
    console.log(inputText.value);
    let inputText2 = document.querySelector("#description-input");
    console.log(inputText2.value);
    let inputText3 = document.querySelector("#rating-input");
    console.log(inputText3.value);
    
    if (!inputText.value || !inputText2.value || !inputText3.value) {
        alert("Please fill out all fields!");
        return;
    }


    //prep data to send over to server
    let data = "name=" + encodeURIComponent(inputText.value);
    data += "&description=" + encodeURIComponent(inputText2.value);
    data += "&rating=" + encodeURIComponent(inputText3.value);
    
    //send new review to the server
    fetch("http://localhost:8080/games",{
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("New message created!", response)

        //clear for updated messages
        gameReviewWrapper.textContent = "";

        //reload so the user doesn't have to
        loadGameFromServer();

        //Reset Inputs
        inputText.value = "";
        inputText2.value = "";
        inputText3.selectedIndex = 0; // Reset dropdown to default
    });
}


// Query selector for the select element and ion-icon element
const ratingSelect = document.querySelector("#rating-input");
const iconElement1 = document.querySelector("#rating-icon1");
const iconElement2 = document.querySelector("#rating-icon2");
const iconElement3 = document.querySelector("#rating-icon3");
const iconElement4 = document.querySelector("#rating-icon4");
const iconElement5 = document.querySelector("#rating-icon5");

// Function to update the icon based on selected value
function updateRatingIcon() {
    let ratingValue = ratingSelect.value;

    // Change the icon's 'name' attribute based on the rating value
    switch(ratingValue) {
        case "1":
            iconElement1.setAttribute("name", "star");
            iconElement2.setAttribute("name", "star-outline");
            iconElement3.setAttribute("name", "star-outline");
            iconElement4.setAttribute("name", "star-outline");
            iconElement5.setAttribute("name", "star-outline");
            break;
        case "2":
            iconElement1.setAttribute("name", "star");
            iconElement2.setAttribute("name", "star");
            iconElement3.setAttribute("name", "star-outline");
            iconElement4.setAttribute("name", "star-outline");
            iconElement5.setAttribute("name", "star-outline");
            break;
        case "3":
            iconElement1.setAttribute("name", "star");
            iconElement2.setAttribute("name", "star");
            iconElement3.setAttribute("name", "star");
            iconElement4.setAttribute("name", "star-outline");
            iconElement5.setAttribute("name", "star-outline");
            break;
        case "4":
            iconElement1.setAttribute("name", "star");
            iconElement2.setAttribute("name", "star");
            iconElement3.setAttribute("name", "star");
            iconElement4.setAttribute("name", "star");
            iconElement5.setAttribute("name", "star-outline");
            break;
        case "5":
            iconElement1.setAttribute("name", "star");
            iconElement2.setAttribute("name", "star");
            iconElement3.setAttribute("name", "star");
            iconElement4.setAttribute("name", "star");
            iconElement5.setAttribute("name", "star");
            break;
        default:
            iconElement1.setAttribute("name", "star-outline");
            iconElement2.setAttribute("name", "star-outline");
            iconElement3.setAttribute("name", "star-outline");
            iconElement4.setAttribute("name", "star-outline");
            iconElement5.setAttribute("name", "star-outline");
            break;
    }
}

// Add event listener to the rating select element
ratingSelect.addEventListener("change", updateRatingIcon);

addMessageButton.onclick = addNewReview;
loadGameFromServer()