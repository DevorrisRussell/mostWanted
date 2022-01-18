"use strict";

function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      searchResults = searchByMultiCriteria(people);
    break;
    default:
      app(people); 
      break;
  }
  mainMenu(searchResults, people);
}


function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let personIndex = choosePerson(person)
  let displayOption = promptFor(
    "Found " +
      personIndex.firstName +
      " " +
      personIndex.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );


  switch (displayOption) {
    case "info":
      // TODO: get person's info
      displayInfo(personIndex)
      break;
    case "family":
      // TODO: get person's family
      displayFamily(personIndex, people)
      break;
    case "descendants":
      // TODO: get person's descendants
      displayDescendants(personIndex, people)
      break;
    case "restart":
      app(people); 
      break;
    case "quit":
      return; 
    default:
      return mainMenu(person, people); 
  }
}

function displayInfo(personIndex){
  let info = personIndex.firstName+" "+personIndex.lastName + "\n"
  info += "Gender: "+personIndex.gender+"\n"
  info += "DOB: "+personIndex.dob+"\n"
  info += "Height: "+personIndex.height+"\n"
  info += "Weight: "+personIndex.weight+"\n"
  info += "Eye Color: "+personIndex.eyeColor+"\n"
  info += "Occupation: "+personIndex.occupation

  console.log(info)
  alert(info)
}

function displayFamily(personIndex, person){
  let info = personIndex.firstName+" "+personIndex.lastName + "\n"
  info +=  "Parents: "
 
  let parentsArray = getParentsArray(personIndex)
    for(let i=0;i<person.length;i++){
    if(parentsArray[0]===(person[i].id)){
      info+=person[i].firstName + " " + person[i].lastName + "  " 
    }
  }
  info += "\n Spouse: "

  for(let i=0;i<person.length;i++){
    if(person[i].id === personIndex.currentSpouse){
      info+=person[i].firstName + " " + person[i].lastName + "  " 
    }
  }
  info += "\n Siblings: "


    for(let i=0;i<person.length;i++){
      if(person[i].parents[0] === personIndex.parents[0] && person[i].id != personIndex.id){
        info+=person[i].firstName + " " + person[i].lastName + "  " 
      }
}
console.log(info)
alert(info)
}

function displayDescendants(personIndex, person){
  let info = personIndex.firstName+" "+personIndex.lastName + "\n"
  info+="Descendants: "
  for(let i=0;i<person.length;i++){
    if(personIndex.id === person[i].parents[0]){
      info+=person[i].firstName + " " + person[i].lastName + "  " 
    }
  }
  console.log(info)
  alert(info)

}

function getParentsArray(person){
  let newArray = []
  let array = person.parents
  for(let i=0;i<array.length;i++){
    newArray.push(parseInt(array[i]))
  }
  return newArray

}

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
  // return foundPerson;
    return foundPerson
}


function searchByEyeColor(people) {}

//TODO: add other trait filter functions here.

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
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function promptFor(question, valid) {
  let isValid;
  let response
  do {
    response = prompt(question.trim());
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
function customValidation(input) {}

//#endregion
function critieraVerification(){
  let whenComplete = false;
  while(whenComplete === false){
    let question = prompt("do you know anymore criteria? yes or no?", autoValid);
        if (question === "no"){ 
            whenComplete = true;   
         multiSearch(people)
         }  
        else {(question === "yes");
            return mainMenu(person,people)
      
    }
  }
}



function searchByCriteria(people) {
  let singleMulti=promptFor( "Do you know a single criteria, Yes or No",yesNo).toLowerCase();
  if (singleMulti==="yes") {
    let firstCriteria = promptFor("Enter gender, dob, height, weight, eyeColor, occupation, ", autoValid);
    let specificTrait =prompt("Enter the "+firstCriteria)
    let foundOnlyCriteria = getSingleCriteria(people, firstCriteria, specificTrait)
     alert(foundOnlyCriteria)
     return foundOnlyCriteria
    }
  else {
   return mainMenu(person, people)}
}
  function getSingleCriteria(people, firstCriteria, specificTrait){
  let foundOnlyCriteria;
   if(firstCriteria == "gender"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.gender === specificTrait){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "dob"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.dob === specificTrait){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "height"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.height === parseInt(specificTrait)){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "weight"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.weight === parseInt(specificTrait)){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "eyeColor"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.eyeColor === specificTrait){
          return true;}
      else {
          return false;}
      });
  }else if(firstCriteria == "occupation"){
    foundOnlyCriteria = people.filter(function(potentialMatch){
      if(potentialMatch.occupation === specificTrait){
          return true;}
      else {
          return false;}
      });
  }
return foundOnlyCriteria

}
function searchByMultiCriteria(people) {

  let searchResults;
  let newEyeColor=""
  let newGender=""
  let newHeight=""
  let newWeight=""
  let newDateOfBirth=""
  let singleMulti = promptFor(
    "Do you know multiple traits, Yes or No", yesNo).toLowerCase();
    if (singleMulti === "yes"){
      newEyeColor = cycleThroughTraits("Eye Color")
      newGender=cycleThroughTraits("gender")
      newHeight=parseInt(cycleThroughTraits("height"))
      newWeight=parseInt(cycleThroughTraits("weight"))
      newDateOfBirth=cycleThroughTraits("Date of birth")
     let ans= people.filter(function(potentialMatch){
        if(
    
          (potentialMatch.eyeColor===newEyeColor || newEyeColor== "")&&
        (potentialMatch.gender===newGender || newGender == "") &&
        (potentialMatch.height===newHeight || newHeight == "" || isNaN(newHeight)) &&
        (potentialMatch.weight===newWeight || newWeight == "" || isNaN(newWeight)) &&
        (potentialMatch.dateOfBirth===newDateOfBirth || newDateOfBirth =="")
        
        )
        return potentialMatch 
      })

      searchResults = answer
    }else {
    searchResults =searchByCriteria(people)

}
return searchResults

}

function choosePerson(foundOnlyCriteria){
  let newDialog = dialog(foundOnlyCriteria)
  let response = prompt("Which person do you want to choose?\n"+newDialog)
  return foundOnlyCriteria[response-1]
  
}

function dialog(foundOnlyCriteria){
  let newDialog=""
  for(let i= 0; i<foundOnlyCriteria.length; i++){
    newDialog +=((i+1)+". "+foundOnlyCriteria[i].firstName+ " "+foundOnlyCriteria[i].lastName + "\n")
  }
  return newDialog
}

 
function cycleThroughTraits(traits){
 let newSearch=prompt("Enter "+ traits)
 return newSearch
}
