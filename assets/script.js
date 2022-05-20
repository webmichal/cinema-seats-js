const app = document.getElementById("seatsContainer");
const yourSeats = document.querySelector(".bill .yourSeats");
const bill = document.querySelector(".bill .amount");
const movie = document.getElementById("movie");

let occupied = ["A1", "A2", "A3", "C5", "C6"]; 


function updateSeatsStatus() {
    let allSeats = document.querySelectorAll(".seat");
    let selectedSeats = {};

    if(localStorage.getItem("seatsApp") !== null) {
        selectedSeats =  JSON.parse(localStorage.getItem("seatsApp"));
    } 

    if(movie.value in selectedSeats) {
        yourSeats.textContent = selectedSeats[movie.value].length;
        bill.textContent = selectedSeats[movie.value].length * 10;

        [...allSeats].forEach((el) => {
            if(selectedSeats[movie.value].indexOf(el.dataset.seatId) >= 0 && !el.classList.contains("occupied")) {
                el.classList.add("selected");
            } else {
                el.classList.remove("selected");
            }
        });
    } else {
        [...allSeats].forEach((el) => el.classList.remove("selected"));
    }

}

function generateSeats(arrSeats ,container, occupied = []) {
       
    for(let i = 0; i < arrSeats.length; i++) {
        let rowId = String.fromCharCode(65 + i);

        let row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute("data-row-id", rowId);
        
        for(let j = 0; j <= arrSeats[i]; j++) {
            let setSeat = document.createElement("div");
            let seatId = rowId + j;
            
            if(occupied.indexOf(seatId) >= 0) {
                setSeat.classList.add("seat", "occupied");
            } else { 
                setSeat.classList.add("seat");
            } 
                           
            setSeat.setAttribute("data-seat-id", seatId);
            row.append(setSeat);
        }

        container.append(row);
    }

    updateSeatsStatus();
}

function saveSelectedSeats() {
    let getSelectedSeats = document.querySelectorAll(".row .seat.selected");
    let seatsObj = localStorage.getItem("seatsApp") !== null? JSON.parse(localStorage.getItem("seatsApp")): {};
    seatsObj[movie.value] = [];

    [...getSelectedSeats].forEach((e) => seatsObj[movie.value].push(e.dataset.seatId));

    localStorage.setItem("seatsApp", JSON.stringify(seatsObj));
    updateSeatsStatus();
}


app.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
        saveSelectedSeats();
    }
});

movie.addEventListener("change", (e) => {
    updateSeatsStatus();
});

generateSeats([8, 8, 8, 8, 10, 12], app, occupied);