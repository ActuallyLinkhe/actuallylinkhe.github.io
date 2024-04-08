const pageviewsCount = document.getElementById('pageviews-count');
const visitsCount = document.getElementById('visits-count');

if (sessionStorage.getItem('visit') === null) {
  // New visit and pageview
  updateCounter('type=visit-pageview');
} else {
  // Pageview
  updateCounter('type=pageview');
}

function updateCounter(type) {

  fetch('https://lnksart-viewcounter.onrender.com:3002/api?'+type) // Dynamic request with URL parameter
    .then(res => res.json())
    .then(data => {
      pageviewsCount.textContent = data.pageviews; // Display pageviews to user
      visitsCount.textContent = data.visits; // Display visits to user
    })

}

sessionStorage.setItem('visit', 'x');
// 'visit' item persists in storage for the remainder of the user session
