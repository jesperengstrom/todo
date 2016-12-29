//Jesper Engström FEND16 - examination Todo 24/11 2016

//Event listeners som uppdaterar listorna när DOM laddat klart och styr vad som händer när knappen "lägg till" klickas.

document.addEventListener("DOMContentLoaded", displayRefresh);
document.getElementById("addButton").addEventListener("click", addTask);

//Två arrayer där mina pågående och slutförda toDos lagras

var taskArr = [];
var completedArr = [];

/* addTask Kollar så att man skrivit något i textfältet, lagrar värdet och lägger den sist i ena arrayen, 
kallar på displayRefresh så att listorna skrivs ut till skärmen*/

function addTask() {
    var textbox = document.getElementById("textbox");
    var input = textbox.value;
    if (input === "") {
        alert("Du måste fylla i något!");
    } else {
        taskArr.push(input);
        textbox.value = null;
        displayRefresh();
    }
}

/* displayRefresh ropar två gånger på displayArr med olika argument. 
Resutatet blir att två olika listor skrivs ut (pågående och avslutade toDos) */

function displayRefresh() {
    displayArr(taskArr, "task");
    displayArr(completedArr, "completed");
}

/*displayArr bestämmer var och hur arrayerna renderas. 
Genom att loopa igenom innerhållet skapas li-elementen med dess innehåll mm.
för varje gång anropas också buttonMaker så att rätt knappar läggs till*/

function displayArr(arr, val) {
    var ul = document.getElementById(val + "List");
    if (arr.length === 0) {
        ul.innerHTML = '<span id="grey">Listan är tom</span>';
    } else ul.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = arr[i];
        ul.appendChild(li);
        buttonMaker(arr, i, li, "Ta bort");
        if (arr === taskArr) {
            buttonMaker(arr, i, li, "Slutförd");
        }
    }
}

/*buttonMaker genererar en knapp med ett namn + event handler + funktionalitet, t.ex att flytta 
ett element från den ena arrayen till den andra. */

function buttonMaker(arr, i, li, btnMessage) {
    var button = document.createElement("button");
    button.innerHTML = btnMessage;
    li.appendChild(button);
    button.addEventListener("click",
        function() {
            var move = arr.splice(i, 1);
            if (btnMessage === "Slutförd") {
                completedArr.unshift(move);
            }
            displayRefresh();
        });
}