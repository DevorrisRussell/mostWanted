"use strict";
  //Menu functions.
//Used for the overall flow of the application.
//#region
// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no": 
      searchResults = searchByTraits(people);// TODO: search by traits
      break;
      default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person[0].firstName +
      " " +
      person[0].lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  function displayID(people) { 
  switch (displayOption) {
    case "info":
    let randomInfo = displayPerson(person[0]);// TODO: get person's info
      break;
    case "family":
     let randomfamily = displayPerson(person[0]);// TODO: get person's family
      break;
    case "descendants":
    let randomDescendants =displayPerson(person[0]); //TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people,); // ask again
  } 
  mainMenu(person,people);
}
//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}
//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.

function searchByEyeColor(people) {
let eyeColor = promptFor("which color would you like to search for? blue, brown, hazel, green, black", autoValid);
 let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.eyeColor === eyeColor
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
} 

function searchByDob(people) {
  let dob = promptFor("What is the person's date of birth? mm/dd/yyyy", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.dob === dob
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
function searchByHeight(people) {
  let height = promptFor("What is the person's height in inches? ", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.height === height
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}
  function searchByWeight(people) {
    let weight = promptFor("What is the person's weight in pounds ? ", autoValid);
  
    let foundPerson = people.filter(function (potentialMatch) {
      if (
        potentialMatch.weight === weight
      ) {
        return true;
      } else {
        return false;
      }
    });
    return foundPerson;
  }
    function searchByOccupation(people) {
      let occupation = promptFor("What is the person's occupation? ", autoValid);
    
      let foundPerson = people.filter(function (potentialMatch) {
        if (
          potentialMatch.occupation === occupation
        ) {
          return true;
        } else {
          return false;
        }
      });
      return foundPerson;
    }
      function searchByF(people) {
        let parents = promptFor("What is the person's last name?", autoValid);
        let lastName = promptFor("What is the person's last name?", autoValid);

        let foundPerson = people.filter(function (potentialMatch) {
          if (
            potentialMatch.parents === parents
          ) {
            return true;
          } else {
            return false;
          }
        });
        return foundPerson;
      }

      function searchByFamily(people) {
        let family = promptFor("What is the person's last name?", autoValid);
      
        let foundPerson = people.filter(function (potentialMatch) {
          if (
            potentialMatch.family === searchByFamily
          ) {
            return true;
          } else {
            return false;
          }
        });
        return foundPerson;
      }

      function searchByDescendants(people) {
        let descendants = promptFor("What is the person's descendants? ", autoValid);
      
        let foundPerson = people.filter(function (potentialMatch) {
          if (
            potentialMatch.descendants === descendants
          ) {
            return true;
          } else {
            return false;
          }
        });
        return foundPerson;
      }
      function searchbyGender(people) {
        let gender = promptFor("What is the person's gender? ", autoValid);
      
        let foundPerson = people.filter(function (potentialMatch) {
          if (
            potentialMatch.gender === gender
          ) {
            return true;
          } else {
            return false;
          }
        });
        return foundPerson;
      }
//TODO: add other trait filter functions here.

//#endregion



  

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "gender: " + person.gender + "\n";
  personInfo += "dob: " +  person.dob + "\n";
  personInfo += "height:"  + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "eyeColor: " + person.eyeColor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  personInfo += "parents: " + person.parents + "\n";
  personInfo += "descendents: " + person.descendants + "\n";
  
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  let response;
  do {
    response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}
// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {

    return true;

}

function searchByTraits(people){
    let searchResults;
    let searchTraitType = promptFor(
      "which trait would you like to search for?", autoValid
    ).toLowerCase();
    switch (searchTraitType){
     case "eyecolor":
      searchResults = searchByEyeColor(people);
        displayPeople(searchResults);
        break;
     case "dob": 
    searchResults = searchByDob(people); 
        displayPeople(searchResults); // TODO: search by traits
        break;
    case "height":
   searchResults = searchByHeight(people);
   displayPeople(searchResults);
   break;
   case "weight":
   searchResults = searchByweight(people);
   displayPeople(searchResults);
   break;
   case "gender":
   searchResults = searchbyGender(people);
   displayPeople(searchResults);
   break;
   case "occupation":
   searchResults = searchByOccupation(people);
   displayPeople(searchResults);
   break;
   //case "decendents":
  // searchResults = searchByParents(people);
   //displayPeople(searchResults);
  // break;

   default:
   searchByTraits(people); 
   break; } }  