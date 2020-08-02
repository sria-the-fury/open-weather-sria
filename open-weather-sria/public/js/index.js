let timeShowDiv = document.querySelector(".today-time"),
    dateShowDiv = document.querySelector(".today-date"),
    todayNameShow = document.querySelector(".today-name"),
    reloadButton = document.querySelector("#reload-button"),
    currentDate = new Date(),
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    setInterval(function() {
        let refreshDate = new Date();
        let refreshTime =  timeShowDiv.innerHTML = refreshDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        $('#todayDate').text(
           refreshTime
                );
    }, 1000);

    dateShowDiv.innerHTML = currentDate.getDate()+" "+ months[currentDate.getMonth()]+ " " + currentDate.getFullYear();
    todayNameShow.innerHTML = "( "+dayName[currentDate.getDay()]+ " )";

    reloadButton.addEventListener('click', function(){
        location.reload();

    });





    

