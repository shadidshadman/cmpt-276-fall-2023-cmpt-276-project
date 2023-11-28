<!DOCTYPE html>
<html>
<head>
<title>Travel Companion Hub</title>
<link rel="icon" type = "image/x-icon" href="images\airplane.jpg">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body,h1,h2,h3,h4,h5,h6 {font-family: "Raleway", Arial, Helvetica, sans-serif}
</style>
</head>
<body class="w3-light-grey">

<!-- Navigation Bar -->
<div class="w3-bar w3-white w3-border-bottom w3-xlarge">
  <a href="#" class="w3-bar-item w3-button w3-text-red w3-hover-red"><b><i class="fa fa-map-marker w3-margin-right"></i>TCHub</b></a>
  <a href="help.html" class="w3-bar-item w3-button w3-right w3-light-grey w3-mobile">Help</a>
  <a href="#" class="w3-bar-item w3-button w3-right w3-light-grey w3-mobile">Login</a>
  <a href="#" class="w3-bar-item w3-button w3-right w3-dark-grey w3-mobile">Sign Up</a>
</div>

<!-- Header -->
<header class="w3-display-container w3-content w3-hide-small" style="max-width:1500px">
  <img class="w3-image" src="travel.jpg" alt="travelbg" width="1500" height="700">
  <div class="w3-display-middle" style="width:65%">
    <div class="w3-bar w3-black">
      <button class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Flight');"><i class="fa fa-plane w3-margin-right"></i>Flight</button>
      <button class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Hotel');"><i class="fa fa-bed w3-margin-right"></i>Hotel</button>
      <button class="w3-bar-item w3-button tablink" onclick="openLink(event, 'Weather');"><i class="fa fa-car w3-margin-right"></i>Weather</button>
    </div>
  

    <!-- Tabs -->
    <div id="Flight" class="w3-container w3-white w3-padding-16 myLink">
      <h3>Travel the world with ease</h3>
      <div class="w3-row-padding" style="margin:0 -16px;">
        <div class="w3-half">
          <label>From</label>
          <input class="w3-input w3-border" type="text" placeholder="Departing from">
        </div>
        <div class="w3-half">
          <label>To</label>
          <input class="w3-input w3-border" type="text" placeholder="Arriving at">
        </div>
      </div>
      <p><a href="flight.html" class="w3-button w3-dark-grey">Search and find dates</button></p>
    </div>

    <div id="Hotel" class="w3-container w3-white w3-padding-16 myLink">
      <h3>Find the best hotels</h3>
      <div class="w3-row-padding" style="margin:0 -16px;">
        <div class="w3-half">
          <label>Location</label>
          <input class="w3-input w3-border" type="text" placeholder="Location">
        </div>
        <div class="w3-half">
          <label>Check In & Out</label>
          <input class="w3-input w3-border" type="text" placeholder="DD MM YYYY - DD MM YYYY">
        </div>
        <div class="w3-row-padding" style="margin:8px -16px;">
          <div class="w3-half w3-margin-bottom">
            <label><i class="fa fa-male"></i> Adults</label>
            <input class="w3-input w3-border" type="number" value="1" name="Adults" min="1" max="6">
          </div>
          <div class="w3-half">
            <label><i class="fa fa-child"></i> Kids</label>
          <input class="w3-input w3-border" type="number" value="0" name="Kids" min="0" max="6">
          </div>
        </div>
      </div>
      <p><a href="hotel.html" class="w3-button w3-dark-grey">Search for Hotels</a></p>
    </div>

    <div id="Weather" class="w3-container w3-white w3-padding-16 myLink">
      <h3>Know what weather to pack for!</h3>
      <input class="w3-input w3-border" type="text" placeholder="Location">
      
    </div>
    <p><a href="weather.html" class="w3-button w3-dark-grey">Search weather</a></p>
  </div>
</header>

<!-- Page content -->
<div class="w3-content" style="max-width:1100px;">

 <!-- Good offers -->
 <div class="w3-container w3-margin-top">
  <h3>Good Offers Right Now</h3>
  <h6>Up to <strong>50%</strong> discount.</h6>
</div>
<div class="w3-row-padding w3-text-white w3-large">
  <div class="w3-half w3-margin-bottom">
    <div class="w3-display-container">
      <img src="vancouver.jpg" alt="Vancouver" style="width:100%">
      <span class="w3-display-bottomleft w3-padding">Vancouver</span>
    </div>
  </div>
  <div class="w3-half">
    <div class="w3-row-padding" style="margin:0 -16px">
      <div class="w3-half w3-margin-bottom">
        <div class="w3-display-container">
          <img src="newyork.jpg" alt="New York" style="width:100%">
          <span class="w3-display-bottomleft w3-padding">New York</span>
        </div>
      </div>
      <div class="w3-half w3-margin-bottom">
        <div class="w3-display-container">
          <img src="singapore.jpg" alt="Singapore" style="width:100%">
          <span class="w3-display-bottomleft w3-padding">Singapore</span>
        </div>
      </div>
    </div>
    <div class="w3-row-padding" style="margin:0 -16px">
      <div class="w3-half w3-margin-bottom">
        <div class="w3-display-container">
          <img src="thailand.jpg" alt="thailand" style="width:100%">
          <span class="w3-display-bottomleft w3-padding">Thailand</span>
        </div>
      </div>
      <div class="w3-half w3-margin-bottom">
        <div class="w3-display-container">
          <img src="philippeans.jpg" alt="Philippines" style="width:100%">
          <span class="w3-display-bottomleft w3-padding">Philippines</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Explore Nature -->
<div class="w3-container">
  <h3>Explore Nature</h3>
  <p>Travel and see nature at its finest.</p>
</div>
<div class="w3-row-padding">
  <div class="w3-half w3-margin-bottom">
    <img src="norway.jpg" alt="Norway" style="width:100%">
    <div class="w3-container w3-white">
      <h3>Flakstad Island, Norway</h3>
      <p class="w3-opacity">Roundtrip from $150 CAD</p>
      <p>See the Northen Lights in person.</p>
      <button class="w3-button w3-margin-bottom">Buy Tickets</button>
    </div>
  </div>
  <div class="w3-half w3-margin-bottom">
    <img src="bali.jpg" alt="Bali" style="width:100%">
    <div class="w3-container w3-white">
      <h3>Bali, Indonesia</h3>
      <p class="w3-opacity">One-way from $129 CAD</p>
      <p>Soak in the beautiful views.</p>
      <button class="w3-button w3-margin-bottom">Buy Tickets</button>
    </div>
  </div>
</div>

<!-- Newsletter -->
<div class="w3-container">
  <div class="w3-panel w3-padding-16 w3-black w3-opacity w3-card w3-hover-opacity-off">
    <h2>Get the best offers first!</h2>
    <p>Join our newsletter.</p>
    <label>E-mail</label>
    <input class="w3-input w3-border" type="text" placeholder="Your Email address">
    <button type="button" class="w3-button w3-red w3-margin-top">Subscribe</button>
  </div>
</div>

<!-- Contact -->
<div class="w3-container">
  <h2>Contact</h2>
  <p>Let us book your next trip!</p>
  <i class="fa fa-map-marker" style="width:30px"></i> Vancouver, BS<br>
  <i class="fa fa-phone" style="width:30px"></i> Phone: +00 123456789<br>
  <i class="fa fa-envelope" style="width:30px"> </i> Email: mail@mail.com<br>
  <form action="/action_page.php" target="_blank">
    <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required name="Name"></p>
    <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Email" required name="Email"></p>
    <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Message" required name="Message"></p>
    <p><button class="w3-button w3-black w3-padding-large" type="submit">SEND MESSAGE</button></p>
  </form>
</div>

<!-- End page content -->
</div>

<!-- Footer -->
<footer class="w3-container w3-center w3-opacity w3-margin-bottom">
<h5>Find Us On</h5>
<div class="w3-xlarge w3-padding-16">
  <i class="fa fa-facebook-official w3-hover-opacity"></i>
  <i class="fa fa-instagram w3-hover-opacity"></i>
  <i class="fa fa-snapchat w3-hover-opacity"></i>
  <i class="fa fa-pinterest-p w3-hover-opacity"></i>
  <i class="fa fa-twitter w3-hover-opacity"></i>
  <i class="fa fa-linkedin w3-hover-opacity"></i>
</div>
<p>Powered by <a href="https://parsa-rajabi.github.io/cmpt-276/#/" target="_blank" class="w3-hover-text-green">cmpt 276</a></p>
</footer>

<script>
// Tabs
function openLink(evt, linkName) {
var i, x, tablinks;
x = document.getElementsByClassName("myLink");
for (i = 0; i < x.length; i++) {
  x[i].style.display = "none";
}
tablinks = document.getElementsByClassName("tablink");
for (i = 0; i < x.length; i++) {
  tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
}
document.getElementById(linkName).style.display = "block";
evt.currentTarget.className += " w3-red";
}

// Click on the first tablink on load
document.getElementsByClassName("tablink")[0].click();
</script>

</body>
</html>
