console.log("connected");


const apiUrl = window.location.protocol === 'file:'
    ? 'http://localhost:8080'
    : '';

let gameReviewWrapper = document.querySelector("section");

// Getting the element out of the boxes, just getting inputs
let inputGame = document.querySelector("#game-input");
let inputAuthor = document.querySelector("#author-input");
let inputPlaytime = document.querySelector("#playtime-input");
let inputRating = document.querySelector("#rating-input");
let inputDesc = document.querySelector("#description-input");
let saveReviewButton = document.querySelector("#save-message-button");

//For changing between update and add
let editId = null;


// Adding a listener for playtime input validation
inputPlaytime.addEventListener("input", function() {
    // Regular expression for validating real numbers
    const realNumberPattern = /^-?\d*\.?\d*$/;

    // If the input doesn't match the pattern, remove the last character
    if (!realNumberPattern.test(inputPlaytime.value)) {
        inputPlaytime.value = inputPlaytime.value.slice(0, -1);
    }
});

function saveReview(){
    console.log("save button clicked");
    //prep data to send over to server
    let data = "gameName=" + encodeURIComponent(inputGame.value);
    data += "&authorName=" + encodeURIComponent(inputAuthor.value);
    data += "&gamePlaytime=" + encodeURIComponent(inputPlaytime.value);
    data += "&rating=" + encodeURIComponent(inputRating.value);
    data += "&description=" + encodeURIComponent(inputDesc.value);
    let corsMethod = "POST";
    let URL = apiUrl + "/games";

    if(editId){
        corsMethod = "PUT";
        URL = apiUrl + "/games/" + editId;
    }

    //send new review to the server
    fetch(URL,{
        method: corsMethod,
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
        inputGame.value = "";
        inputAuthor.value = "";
        inputPlaytime.value = "";
        inputRating.selectedIndex = 0; // Reset dropdown to default
        inputDesc.value = "";
    });
}



function addGameReview(data){
    console.log("data", data)
    let reviewWrapper = document.createElement("div");
    reviewWrapper.classList.add("review-item");

    let reviewHeader = document.createElement("div");
    reviewHeader.classList.add("review-header");

    let game = document.createElement("h3");
    game.textContent = data.gameName;
    reviewHeader.appendChild(game);

    // // Author Name and Playtime
    // let authorAndPlaytime = document.createElement("span");
    // authorAndPlaytime.textContent = `AUTHOR: ${data.authorName}    (${data.gamePlaytime} hours)`;
    // reviewHeader.appendChild(authorAndPlaytime);
    


    // Author Name and Playtime
    let authorAndPlaytime = document.createElement("span");

    // Create a span for the bold "AUTHOR" text
    let authorBold = document.createElement("span");
    authorBold.textContent = "AUTHOR: ";
    authorBold.style.fontWeight = "bold"; // Make "AUTHOR" bold

    // Add the rest of the text
    let authorText = document.createTextNode(`${data.authorName} (${data.gamePlaytime} hours)`);

    // Append both to the span
    authorAndPlaytime.appendChild(authorBold);
    authorAndPlaytime.appendChild(authorText);

    reviewHeader.appendChild(authorAndPlaytime);




    let ratingGame = document.createElement("span");

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

    let actionContainer = document.createElement("div");
actionContainer.classList.add("review-actions");

    // EDIT BUTTON
    let editButton = document.createElement("button");
    editButton.textContent = "EDIT";
    actionContainer.appendChild(editButton);

    // DELETE BUTTON
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    actionContainer.appendChild(deleteButton);

    // Append actionContainer to the reviewWrapper
    reviewWrapper.appendChild(actionContainer);


    //Edit Button listener
    editButton.onclick = function (){
        console.log("game id:", data.id)
        //grab text from textarea
        inputGame.value = data.gameName;
        inputAuthor.value = data.authorName;
        inputPlaytime.value = data.gamePlaytime;
        inputRating.value = data.rating;
        updateRatingIcon();
        inputDesc.value = data.description;
        editId = data.id;
    }

    //DELETE Button listener
    deleteButton.onclick = function (){
        console.log("game id:", data.id)
        //Confirm DELETION
        if (confirm("Are you sure you want to delete this review?")) {
            fetch(apiUrl + "/games/" + data.id, {
                method: "DELETE"
            }).then(function (response) {
                if (response.ok) {
                    reviewWrapper.remove(); // Remove from DOM
                }
            });
        }
    }

    
    gameReviewWrapper.appendChild(reviewWrapper);
}


function loadGameFromServer(){
    fetch(apiUrl + "/games")
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
    inputGame.value = "";
    inputAuthor.value = "";
    inputPlaytime.value = "";
    inputRating.selectedIndex = 0; // Reset dropdown to default
    inputDesc.value = "";
    editId = null;
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
saveReviewButton.onclick = saveReview;

loadGameFromServer()