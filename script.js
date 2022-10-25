let api_result = [];






let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

let time = hour + ":" + minutes + ":" + seconds;
console.log(time);



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

if (localStorage.length < 0) {
  localStorage.setItem("notes", []);
  localStorage.notes = [];
  
}



let newdata = JSON.parse(localStorage.notes);
let notes = newdata;  


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

    
    let div_exit = document.createElement('div');
    div_exit.onclick = function () { notes.splice(n, 1); display_notes(); }
    div_exit.innerHTML = "❌";
    div_exit.className = "note_exit";
    document.getElementById("note" + n).appendChild(div_exit);

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
      document.getElementsByClassName("note")[n].style.backgroundColor = "green";

      if (notes[n].deadline > now) {
        console.log(notes[n].deadline + " > " + now);
      }
      else {
        console.log(now + " < " + notes[n].deadline)
      }
    }
  
  }



  localStorage.setItem("notes", notes);
  localStorage.notes = JSON.stringify(notes), 1;
  




}

display_notes();


async function get_players() {
let player_count = await fetch('https://servers-frontend.fivem.net/api/servers/single/q8538p', {
  headers: {
      'authority': 'servers-frontend.fivem.net',
      'accept': '*/*',
      'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
      'origin': 'https://shop.unityrp.io',
      'referer': 'https://shop.unityrp.io/',
      'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
  }
});

console.table(player_count.JSON());

}

