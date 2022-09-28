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