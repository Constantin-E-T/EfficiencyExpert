
$(document).ready(function() {
    var currentDay = moment().format('dddd, MMMM Do YYYY');

    $('#currentDay').text(currentDay);

    // This is a for loop that is creating the rows for the planner. With the working hours from 9 to 18
    for (var i = 9; i < 18; i++) {
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
});