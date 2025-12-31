const mobileSize = 800;
const screenSize = window.innerWidth;
let isMobile;


//NEOCITIES SITE VISITS
function fetchSiteData() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          const site_data = JSON.parse(this.responseText);
          resolve(site_data);
        } else {
          reject('Failed to fetch data');
        }
      }
    };
    xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=actuallylinkhe", true);
    xhttp.send();
  });
}

function displayHits() {
  fetchSiteData()
    .then(site_data => {
      let num_arr = site_data.info.views.toString().split("");
      let num_str = "";
      for (let i = 0; i < num_arr.length; i++) {
        num_str += num_arr[i];
        if ((num_arr.length - 1 - i) % 3 === 0 && (num_arr.length - 1 - i) !== 0) {
          num_str += ",";
        }
      }
      document.getElementById("hitcount").innerHTML = num_str;
    })
    .catch(error => {
      console.error("Error loading hits:", error);
    });
}


//SIDEBAR
function fetchSidebar(){
  fetch('/assets/main/sidebar.html')
  .then(response => {
    return response.text()
  })
  .then((html) => {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = html;
  })
  .catch(error => {
    console.error('Failed to fetch element: ', error)
  })
}

document.addEventListener("DOMContentLoaded", () => {
    const BIRTH_DATE = "2005-01-15";

    const age = calculateAge(BIRTH_DATE);

    // Update element on the page
    const ageElement = document.getElementById("age");
    if (ageElement) {
        ageElement.textContent = age;
    }
});

function calculateAge(birthDate) {
    const today = new Date();
    const dob = new Date(birthDate);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
        age--;
    }

    return age;
}

//RUN
document.addEventListener('DOMContentLoaded', (event) => {
  isMobile = screenSize <= mobileSize;
  if (document.getElementById('sidebar')) { fetchSidebar(); }
  if (document.getElementById('hitcount')) { displayHits(); }
});