/* This is a function that is displaying the current day in the header. */
$(document).ready(function() {
    /* This is a variable that is storing the current day. */
    var currentDay = moment().format('dddd, MMMM Do YYYY');

    /* This is a function that is displaying the current day in the header. */
    $('#currentDay').text(currentDay);

    // This is a for loop that is creating the rows for the planner. With the working hours from 9 to 18
    for (var i = 9; i <= 18; i++) {
        var hour = moment().hour(i).format("h A");
        // This is creating the rows for the planner.
        var row = $("<div>").addClass("row time-block").attr("data-time", i);
        var col1 = $("<div>").addClass("col-1 hour").text(hour);
        var col2 = $("<textarea>").addClass("col-10 description");
        var col3 = $("<button>")
          .addClass("col-1 saveBtn")
          .html("<i class='fas fa-save'></i>");
        // This is appending the rows to the container.
        row.append(col1, col2, col3);
        $(".container").append(row);
        // This is a function that is storing the event in local storage.
        var storedEvent = localStorage.getItem(i);
        if (storedEvent) {
            $("div[data-time='" + i + "']").find("textarea").val(storedEvent);
        }
    }

    // This is a function that is updating the colors of the rows every hour.
    function updateColors() {
        var currentHour = moment().hour();
        $(".time-block").each(function() {
            var blockHour = parseInt($(this).attr("data-time"));
            if (blockHour < currentHour) {
                $(this).removeClass("future present").addClass("past");
            } else if (blockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }
    
    updateColors();
    // This is the call function that is updating the colors of the rows every hour.
    setInterval(updateColors, 3600000);

    // added a event listener to the rows to save the event in local storage
    $(".time-block").on("click", function (event) {
        event.preventDefault();
        var event = $(this)
          .find("textarea")
          .val();
        var time = $(this).attr("data-time");
        localStorage.setItem(time, event);
    });

    // added a event listener to the save button to save the event in local storage
    $(".saveBtn").on("click", function () {
        var event = $(this)
          .siblings("textarea")
          .val();
        var time = $(this)
          .parent()
          .attr("data-time");
        localStorage.setItem(time, event);
    });

    // take the data from local storage and display it in the planner
    $.each(localStorage, function (key, value) {
        $("div[data-time='" + key + "']")
          .find("textarea")
          .val(value);
    });

});