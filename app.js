/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var person=searchByName(people)
      mainMenu(person,people)

    break;
    case 'no':
      var ids=searchTrait(people)
      alert(ids)
   
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      alert(person.height + "\n" + person.weight + "\n" + person.occupation + "\n" + person.eyeColor)
    break;
    case "family":
     for (var i = 0; i <= 21; i++) {
        if (person.currentSpouse === people[i].id){
          var spouseName= (people[i].firstName + " " + people[i].lastName)
        }
    }
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
    for (var i=0; i<=21; i++){
        if (people[i].firstName === firstName && people[i].lastName === lastName){
          return(people[i])
        }
      
    }

}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function searchTrait(people){
  var traits = promptFor("What trait are you looking for?", chars);
  var traitArray= [];
    switch(traits){
      case "age":

      case "height":
        searchedValue = prompt("Enther the eight (in inches) you would like to search for");
        for (var i = 0; i<= 21; i++) {
          if (people[i].height == searchedValue) {
              traitArray.push(people[i].firstName + " " + people[i].lastName);
          }
        } return(traitArray);

      case "weight":
        searchedValue = prompt("Enter the weight (in pounds) you would like to seach for.");
        for (var i = 0; i<=21; i++) {
          if (people[i].weight == searchedValue) {
              traitArray.push(people[i].firstName + " " + people[i].lastName);
          }
        } return(traitArray);
      }


    }

      //case "weight":

      //case "occupation":

      //case "eyeColor":
    
