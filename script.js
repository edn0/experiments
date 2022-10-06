let api_result = [];

async function api_test() {

  let req_url = "https://randomuser.me/api/"

  const rep = await fetch(req_url);

  const data = await rep.json();

  api_result.push(data.results[0]);
  display_data();

}


function display_data() {

  let location = api_result[0].location.city + ", " + api_result[0].location.state + ", " + api_result[0].location.country;
  document.getElementById("user_location").innerHTML = location;

  let photo = api_result[0].picture.large;
  document.getElementById("user_photo").src = photo;

  let user_identity = api_result[0].name.first + ", " + api_result[0].name.last;
  document.getElementById("user_identity").innerHTML = user_identity;

  let user_username = api_result[0].login.username;
  document.getElementById("user_name").innerHTML = user_username;

  let user_password = api_result[0].login.password;
  document.getElementById("user_password").innerHTML = user_password;

  document.getElementById("main_frame").style.opacity = 1;

}

api_test();








class Note {

  constructor (number, content, importance, deadline, status) {

      this.number = number;

      this.content = content;

      this.importance = importance;

      this.deadline = deadline;

      this.status = status;

  }

}




let newdata = JSON.parse(localStorage.notes);
let notes = newdata;  


if (localStorage.notes == false) {
  localStorage.setItem("notes", notes);
}

function create_note () {

  let n = new Note(

      notes.length+1,

      document.querySelector("#note_entry").value,

      document.getElementById("note_importance").value,

      document.getElementById("note_deadline").value,

      "Unfinished" // different possible status to define

      )

  notes.push(n);

  console.table(notes);

  display_notes();

}

function display_notes() {

  document.getElementById("notes_panel").innerHTML = "";


  for (let n in notes) {



    let div = document.createElement('div');
    div.className = "note";
    div.id = "note" + n;
    div.onclick = function () { notes[n].status = "Finished"; display_notes(); };
    document.getElementById("notes_panel").appendChild(div);

    let div_content = document.createElement('div');
    div_content.innerText = notes[n].content;
    div_content.className = "note_content";
    document.getElementsByClassName("note")[n].appendChild(div_content);

    let div_info = document.createElement('div');
    div_info.innerText = notes[n].importance + "  " + notes[n].deadline;
    div_info.className = "note_info";
    document.getElementsByClassName("note")[n].appendChild(div_info);



    // document.getElementsByClassName('note_content')[n].innerText = notes[n].content;

    document.getElementsByClassName('note_info')[n].innerText = notes[n].importance + "  " + notes[n].deadline;



    
    for (let o in document.getElementsByClassName('note')) { // Defines color

      let col = "rgb(" + notes[n].importance*2 + ", " + notes[n].importance + ", " + notes[n].importance;


      document.getElementsByClassName('note')[n].style.backgroundColor = col;
      document.getElementsByClassName('note')[n].style.opacity = 1;
      
    }

  
        
    if (notes[n].status == "Finished") {
      console.log(n + "_ done");
      document.getElementsByClassName("note")[n].style.backgroundColor = "green";
    }
  
  }



  localStorage.setItem("notes", notes);
  localStorage.notes = JSON.stringify(notes), 1;
  
  console.table(newdata);




}

display_notes();