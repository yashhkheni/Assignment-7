$(document).ready(function() {
  
  $.ajax({
    url: "characters.json",
    dataType: "json",
    success: function(characters) {
     
      var $rows = $.map(characters, function(character) {
        var $row = $("<tr>");
        $row.append($("<td>").text(character.firstName));
        $row.append($("<td>").text(character.lastName));
        $row.append($("<td>").text(character.gender));
		$row.append($("<td>").text(character.village));
        $row.append($("<td>").text(character.occupation));
        $row.append($("<td>").text(character.dateOfBirth));
        
        return $row;
      });

     
      $("#characters-table tbody").append($rows);

      
      $("#characters-table th").click(function() {
        var $th = $(this);
        var sortBy = $th.data("sortBy");
        var sortOrder = $th.hasClass("asc") ? "desc" : "asc";

       
        var sortFn;
        switch (sortBy) {
          case "firstName":
            sortFn = function(a, b) {
              return a.cells[0].textContent.localeCompare(b.cells[0].textContent);
            };
            break;
          case "lastName":
            sortFn = function(a, b) {
              return a.cells[1].textContent.localeCompare(b.cells[1].textContent);
            };
            break;
          case "gender":
            sortFn = function(a, b) {
              return a.cells[3].textContent.localeCompare(b.cells[3].textContent);
            };
            break;
		  case "village":
            sortFn = function(a, b) {
              return a.cells[6].textContent.localeCompare(b.cells[6].textContent);
            };
            break;
          case "occupation":
            sortFn = function(a, b) {
              return a.cells[4].textContent.localeCompare(b.cells[4].textContent);
            };
            break;
          case "dateOfBirth":
            sortFn = function(a, b) {
              return new Date(a.cells[5].textContent) - new Date(b.cells[5].textContent);
            };
            break;
          
        }
        
        var $sortChevron = $th.find(".sort-chevron");
        $("#characters-table th").removeClass("asc desc");
        if (sortOrder === "asc") {
          $sortChevron.removeClass("desc").addClass("asc");
          $th.addClass("asc");
          $("#characters-table tbody").append($("#characters-table tbody tr").sort(sortFn));
        } else {
          $sortChevron.removeClass("asc").addClass("desc");
          $th.addClass("desc");
          $("#characters-table tbody").append($("#characters-table tbody tr").sort(sortFn).get().reverse());
        }
        
        return false;
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Error retrieving character data: " + textStatus + ", " + errorThrown);
    }
  });
});
