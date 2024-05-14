// script.js


function calculateCGPA() {
    var numSubjects = parseInt(getQueryVariable("numSubjects"));
    var subjectContainer = document.getElementById("subject-container");
    subjectContainer.innerHTML = '';
  
    for (var i = 1; i <= numSubjects; i++) {
      var subjectDiv = document.createElement("div");
      subjectDiv.classList.add("subject-div");
      subjectDiv.innerHTML = `
        <h3>Subject ${i}</h3>
        <div class="input-group">
          <label for="name-${i}">Name:</label>
          <input type="text" id="name-${i}" required>
        </div>
        
        <div class="input-group">
          <label for="internal-obtained-${i}">Internal Obtained:</label>
          <input type="text" id="internal-obtained-${i}" class="obtained" required>
          <label for="internal-total-${i}">Internal Total:</label>
          <input type="text" id="internal-total-${i}" class="total" required>
        </div>
        <div class="input-group">
          <label for="assignment-obtained-${i}">Assignment Obtained:</label>
          <input type="text" id="assignment-obtained-${i}" class="obtained" required>
          <label for="assignment-total-${i}">Assignment Total:</label>
          <input type="text" id="assignment-total-${i}" class="total" required>
        </div>
        <div class="input-group">
          <label for="external-obtained-${i}">External Obtained:</label>
          <input type="text" id="external-obtained-${i}" class="obtained" required>
          <label for="external-total-${i}">External Total:</label>
          <input type="text" id="external-total-${i}" class="total" required>
        </div>
        <div class="input-group">
          <label for="credits-${i}">Credits:</label>
          <input type="text" id="credits-${i}" required>
          <label class="credit-label" id="credit-earned-${i}">Credit Earned:</label>
        </div>
        
      `;
      subjectContainer.appendChild(subjectDiv);
    }
  
    var calculateButton = document.createElement("button");
    calculateButton.textContent = "Calculate";
    calculateButton.addEventListener("click", calculateCredits);
    var buttonContainer = document.createElement("div");
    // buttonContainer.classList.add("button-container");
    // buttonContainer.appendChild(calculateButton);
    // subjectContainer.appendChild(buttonContainer);
  }
  
//   function calculateCredits() {
//     var numSubjects = parseInt(getQueryVariable("numSubjects"));
//     for (var i = 1; i <= numSubjects; i++) {
//       var obtainedInternal = parseInt(document.getElementById(`internal-obtained-${i}`).value);
//       var totalInternal = parseInt(document.getElementById(`internal-total-${i}`).value);
//       var obtainedAssignment = parseInt(document.getElementById(`assignment-obtained-${i}`).value);
//       var totalAssignment = parseInt(document.getElementById(`assignment-total-${i}`).value);
//       var obtainedExternal = parseInt(document.getElementById(`external-obtained-${i}`).value);
//       var totalExternal = parseInt(document.getElementById(`external-total-${i}`).value);
  
//       var credits = parseInt(document.getElementById(`credits-${i}`).value);
//       var creditEarnedLabel = document.getElementById(`credit-earned-${i}`);
  
//       // Calculate credit earned here
//       // Example calculation logic:
//       var creditEarned = ((obtainedInternal / totalInternal) + (obtainedAssignment / totalAssignment) + (obtainedExternal / totalExternal)) * credits;
  
//       creditEarnedLabel.textContent = "Credit Earned: " + creditEarned.toFixed(2);
//     }
//   }
  
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  }
  
// script.js
// script.js

function calculateCredits() {
  var numSubjects = parseInt(getQueryVariable("numSubjects"));
  var tableData = [];
  var totalCreditEarned = 0; // Variable to store the total credit earned

  // Iterate through each subject
  for (var i = 1; i <= numSubjects; i++) {
      var subjectName = document.getElementById(`name-${i}`).value;
      var obtainedInternal = parseInt(document.getElementById(`internal-obtained-${i}`).value);
      var totalInternal = parseInt(document.getElementById(`internal-total-${i}`).value);
      var obtainedAssignment = parseInt(document.getElementById(`assignment-obtained-${i}`).value);
      var totalAssignment = parseInt(document.getElementById(`assignment-total-${i}`).value);
      var obtainedExternal = parseInt(document.getElementById(`external-obtained-${i}`).value);
      var totalExternal = parseInt(document.getElementById(`external-total-${i}`).value);
      var credits = parseInt(document.getElementById(`credits-${i}`).value);
      var creditEarned = calculateCreditEarned(obtainedInternal, totalInternal, obtainedAssignment, totalAssignment, obtainedExternal, totalExternal, credits);
      
      // Push subject data to tableData array
      tableData.push({
          name: subjectName,
          internal: `${obtainedInternal}/${totalInternal}`,
          assignment: `${obtainedAssignment}/${totalAssignment}`,
          external: `${obtainedExternal}/${totalExternal}`,
          credits: credits,
          creditEarned: creditEarned.toFixed(2)
      });

      // Add the credit earned to the total credit earned
      totalCreditEarned += creditEarned;
  }

  // Calculate GPA
  var totalCredits = tableData.reduce((total, subject) => total + subject.credits, 0);
  var gpa = totalCreditEarned / totalCredits;

  // Encode tableData as URI component
  var encodedData = encodeURIComponent(JSON.stringify(tableData));
  
  // Redirect to next page with encoded data
  window.location.href = `result.html?data=${encodedData}&totalCreditEarned=${totalCreditEarned}&gpa=${gpa.toFixed(2)}`;
}

function calculateCreditEarned(obtainedInternal, totalInternal, obtainedAssignment, totalAssignment, obtainedExternal, totalExternal, credits) {
    var internalWeight = (((obtainedInternal + obtainedAssignment) / (totalInternal + totalAssignment)) * 40);
    var externalWeight = ((obtainedExternal / totalExternal) * 60);
    var finalMark = internalWeight + externalWeight;

    var gradePoint;
    if (finalMark >= 90) {
        gradePoint = 10;
    } else if (finalMark >= 80) {
        gradePoint = 9;
    } else if (finalMark >= 70) {
        gradePoint = 8;
    } else if (finalMark >= 60) {
        gradePoint = 7;
    } else if(finalMark >= 50){
        gradePoint = 6;
    }
    else {
        gradePoint = 0;
    }

    var creditEarned = gradePoint * credits;
    return creditEarned;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}
function calculateCGPAResult() {
  document.addEventListener("DOMContentLoaded", function() {
      var totalGPA = 0;
      var totalCredits = 0;
      var totalCreditsEarned = 0;

      // Iterate through each semester input field
      for (var i = 1; i <= 6; i++) { // Assuming there are 6 semesters
          var gpaInput = document.getElementById(`gpa-${i}`);
          if (gpaInput && gpaInput.value !== "") {
              var gpa = parseFloat(gpaInput.value);
              if (!isNaN(gpa) && gpa >= 0 && gpa <= 10) { // Ensure valid GPA values
                  totalGPA += gpa;
                  totalCredits += 10; // Assuming each semester has 10 credits
                  totalCreditsEarned += gpa * 10; // Multiply by 10 to get total grade points
              }
          }
      }

      // Calculate CGPA
      var cgpa = totalCredits > 0 ? totalCreditsEarned / totalCredits : NaN;

      // Print results to console
      console.log("Total GPA:", totalGPA.toFixed(2));
      console.log("Total Credits:", totalCredits);
      console.log("Total Credits Earned:", totalCreditsEarned.toFixed(2));
      console.log("CGPA:", isNaN(cgpa) ? "NaN" : cgpa.toFixed(2));
  });
}


