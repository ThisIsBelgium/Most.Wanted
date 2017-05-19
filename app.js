/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var searchedPersons=searchByName(people)
      var person = personSelector(searchedPersons)
      mainMenu(person,people)
     
    break;
    case 'no':
      var filteredPeople = filterSelection(people)
      var filteredNames = filteredPeople.map(function(person){
        return (person.firstName + " " + person.lastName)
      })
    	alert(filteredNames)
		app(people)	 
    break;
    break;
    default:
    app(people); // restart 
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
      alert("Height in inches:\n" + person.height + "\n" + "Weight in pounds:\n" + person.weight + "\n" + "Occupation:\n" + person.occupation + "\n" + "Eye color:\n" + person.eyeColor)
    break;
    case "family":
      var spouseName = spouseCheck(person,people)
      var parentString = parentCheck(person,people)
      var childString = childCheck(person,people)
      var siblingNamesPreFilter = siblingCheck(person,people)
      var siblingNames = siblingNamesPreFilter.filter(function(a){
        return a!==(person.firstName + " " + person.lastName)
      })
      alert("Spouse name:" + "\n" + spouseName + "\n" + "Parents:" + "\n" + parentString + "\n" + "Children:" + "\n" + childString + "\n" + "Siblings:" + "\n" + siblingNames)
    break;
    case "descendants":
      var descendants = []
      var descendantsNames=[]
      descendantCheck(person,people,descendants)
      for (var i = 0; i <= descendants.length-1 ; i++) {
        descendantCheck(descendants[i],people,descendants)
      }
      for (var i = 0; i <= descendants.length-1; i++) {
        descendantsNames.push(descendants[i].firstName + " " + descendants[i].lastName)
      }
      alert(descendantsNames)

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
  var searchedPersons = []
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
    for (var i=0; i<=people.length-1; i++){
        if (people[i].firstName === firstName && people[i].lastName === lastName){
          searchedPersons.push(people[i])
        }
      
    }return searchedPersons

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

function filterSelection(people){
  var selection = prompt("Height,Weight,Occupation,Eye Color" + "\n" + "(Seperated by commas)")
  var selection = selection.toLowerCase()
  var filters = selection.split(",")
    for (var i = 0; i <= filters.length-1; i++) {
      if (filters[i] == "height") {
        var heightSelect = prompt("Height in inches?")
        var people = people.filter(function heightFilter(person){
          return person.height == heightSelect
          });
      }else if (filters[i] == "weight") {
        var weightSelect = prompt("Weight in pounds?")
        var people = people.filter(function weightFilter(person){
          return person.weight == weightSelect
        })
      }else if (filters[i] == "occupation"){
        var occupationSelect = prompt("Occupation?")
        var people = people.filter(function occupationFilter(person){
          return person.occupation == occupationSelect
        })
      }else if (filters[i] == "eye color") {
        var eyeColorSelect = prompt("Eye color?")
        var people = people.filter(function eyeColorFilter(person){
          return person.eyeColor == eyeColorSelect
        })
      //else if (filters[i] = "Age"){
      	//var ageSelect = prompt("How old?")
        //for (var a = 0; a <= people.length-1; a++) {
        	//people[a].dob = getAge(people[a].dob)
        	//var people = people.filter(function ageFilter(person){
        	//return person.dob == ageSelect
        		
    	}
    }return people
  }


function getAge(dateOfBirth) 
{
    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}




      
function spouseCheck(person,people){
     for (var i = 0; i <= people.length-1; i++) {
        if (person.currentSpouse == people[i].id){
          var spouseName= (people[i].firstName + " " + people[i].lastName)
      }
    }if (spouseName === 0) {
      return "N/A"
    }else{return spouseName}
  }

function parentCheck(person,people){
  var parentNames=[]
  var parentId=[]
  for (var i = 0; i <= 1; i++) {
    parentId.push(person.parents[i])
  }if (parentId[0]>0) {
    for (var i = 0; i <= people.length-1; i++) {
      if (people[i].id === parentId[0] || people[i].id === parentId[1]) {
        parentNames.push(people[i].firstName + " " + people[i].lastName)
      } 
    } 
  }var parentString = parentNames.join()
  if (parentString === "") {
    return "N/A"
  }
  return parentString
}

function childCheck(person,people){
  var childNames=[]
  for (var i = 0; i <= people.length-1; i++) {
    if (person.id == people[i].parents[0] || person.id == people[i].parents[1]){
      childNames.push(people[i].firstName + " " + people[i].lastName)
    }
  }var childString=childNames.join()
  if (childString === "") {
    return "N/A"
  }
  return childString
} 

function siblingCheck(person,people){
  var siblingNames=[]
    for (var i = 0 ; i <= people.length-1; i++) {
      if (person.parents[0] == people[i].parents[0]){
    for (var i = 0 ; i <= people.length-1; i++) {
      if (person.parents[0]>0 && person.parents[0] == people[i].parents[0]){
        siblingNames.push(people[i].firstName + " " + people[i].lastName)
        }
      } return siblingNames
    }
  }
}


function descendantCheck(person,people,descendants){
  for (var i = 0 ; i <= people.length-1 ; i++) {
    if (person.id == people[i].parents[0] || person.id == people[i].parents[1]) {
      descendants.push(people[i])
    }
  }
}

function personSelector(searchedPersons){
  for (var i = 0; i <= searchedPersons.length ; i++) {
        if (searchedPersons.length>=0) {
          var selectPerson =  searchedPersons[i]
          var selection = prompt(selectPerson.firstName + " " + selectPerson.lastName + ":" + selectPerson.dob + "\n "+ "Is the person above the name you are looking for?(Y/N)")
            if (selection = "yes") {
              return selectPerson
            }
        }
    }
  }
  
      
        
          
       
      


    
     






  


   

