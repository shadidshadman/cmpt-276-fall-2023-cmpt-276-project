import React from 'react'
import './w3.css'
import './App.css';
import {img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9} from './images';

var imgList = [img1,img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9];
// to get access token
var global_token;
const getToken = async () => {
    const apiUrl = 'https://api.amadeus.com/v1/security/oauth2/token';
    const clientId = 'xtU8VJK5vFf7wDosfi8Vs2PC2LahBwRZ';
    const clientSecret = 'Cc0DarAtHJsfKXZ0';
    const apikey = "DJHiMrui9ZRlRv5dfuQAzg1dnOHOpGzj";
    const apisecret = "gxGKuMeB6yUpCq6x";
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${apikey}&client_secret=${apisecret}`,
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        //console.log('Token:', token);
        return token;
      } else {
        console.error('Failed to retrieve token:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during token retrieval:', error);
    }
  };


function SearchBar(props) {
  const { city, handleChange, handleSubmit, handleCountryCode, countryCode,handleCheckIn,handleCheckOut,checkIn,checkOut } = props;
  return (
    <form className = "hotel-search-form" onSubmit = {handleSubmit}>
      <div className='new-search-container'>
          <p id = "search-title">Search for hotels</p>
        <div className = "search-input">
          
          <div className="w3-half">

            <label>Location</label>
            <input 
            className = "w3-input w3-border"
            type = "text" 
            placeholder='City Destination'
            value = {city}
            onChange={handleChange}
            />

          </div>
          
          <div className="w3-half">
          <label>Country Code:</label>
          <input type = "text" 
            className = "w3-input w3-border"
            onChange={handleCountryCode}
            placeholder = " e.g CA"
            id = "country-code" 
            value = {countryCode} />
            </div>
            
            <br />

          <div class="w3-half">

          <label>Check In:</label> 
            <input 
          type = "text" 
          className = "w3-input w3-border"
          placeholder='yyyy-mm-dd'
          value = {checkIn}
          onChange={handleCheckIn}
          />
          </div>

          <div className="w3-half">
          <label>Check Out:</label> 
          <input 
          className = "w3-input w3-border"
          type = "text" 
          placeholder='yyyy-mm-dd'
          value = {checkOut}
          onChange={handleCheckOut}
          />
          </div>
          

        </div>
        <button className='hotel-btn' type = "submit">Search</button>
      </div>
    </form>
  );
}

function Filters() {
  return (
    <div className = "filter">
      <h1>Hotels</h1>
      <button id = "filter-btn">Filter</button>
    </div>
  );
}


class Hotel extends React.Component {
  constructor(props) {
    super(props);
    //hotels contains all the names of the hotels
    this.state = {
      city: "",
      hotels: [], // get rate
      countryCode: "",
      cityCode : "",
      hotelPriceData: [],
      hotelContent: [],
      hotelPrice: [], // get price
      longitude : "",
      latitude : "",

      checkIn : "",
      checkOut : ""
    };
    // so that we can use "this" keyword in given methods
    this.handleChange = this.handleChange.bind(this);
    this.searchHotel = this.searchHotel.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCountryCode = this.handleCountryCode.bind(this);
    this.getRating = this.getRating.bind(this);
    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }
  
  handleCheckIn(event) {
    this.setState({
      checkIn : event.target.value
    });
  }

  handleCheckOut(event) {
    this.setState({
      checkOut : event.target.value
    });
  }

  // when text is entered into input, city is given the text
  handleChange(event) {
    this.setState({
      city: event.target.value 
    });
  }

  handleCountryCode(event) {
    this.setState({
      countryCode: event.target.value
    });
  }
  handleSubmit(event) {
    //prevent default in order to not reload the web page after submitting
    event.preventDefault();
   
    // trigger the hotel search after the city has been inputted
    getToken().then(token =>{
      global_token = token;
      this.searchHotel();
    }).catch(error => {console.error("error couldn't get token", error)});
    
  }

  // fetching data from amadeus api
  async searchHotel() {
    const baseURL = "https://api.amadeus.com/v1/reference-data/locations";
    const url = `${baseURL}/cities?countryCode=${encodeURIComponent(this.state.countryCode.toUpperCase())}&keyword=${encodeURIComponent(this.state.city.toUpperCase())}&max=10&include=AIRPORTS`;
    const headers = {
      Accept: "application/vnd.amadeus+json",
      Authorization: `Bearer ${global_token}`
    };
    
    try {
      const response = await fetch(url, {headers,
      method: "GET"});
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const content = await response.json();
      this.setState({
        cityCode: content.data[0].iataCode,
        hotelContent : content.data,
        longitude : content.data[0].geoCode.longitude,
        latitude: content.data[0].geoCode.latitude
      }, () => {
        this.getRating();
      });
      
    }
    catch(error) {
      console.error('Error fetching hotels:', error);
    }

  }

  // sample data for ratings is limited, therefore can't use sample data for testing purposes
  async getRating() {
    const baseUrl = "https://api.amadeus.com/v1";
    const url = `${baseUrl}/reference-data/locations/hotels/by-geocode?latitude=${encodeURIComponent(this.state.latitude)}&longitude=${encodeURIComponent(this.state.longitude)}&radius=20&radiusUnit=KM&ratings=2,3,4,5&hotelSource=ALL`;
    const headers = {
      Accept: "application/vnd.amadeus+json",
      Authorization: `Bearer ${global_token}`
    };
    try {
      const response = await fetch(url, {headers,
      method: "GET"});
      const ratingContent = await response.json();
      this.setState({
        hotels: ratingContent.data
      }, () =>{
        this.getPrice()
      });
      
      
    }
    catch(error) {
      console.error("Error fetching ratings:", error);
    }
    

  }

  async getPrice() {
    let len = 0;
    //IdList string may not exceed 2048 bytes or else api will not work therefore cannot have len too big
    if(this.state.hotels.length > 175) {
      len = 175;
    }
    else if(this.state.hotels.length <= 175) {
      len = this.state.hotels.length;
    }
    let IDs = [];
    for(let i = 0; i < len; i++) {
      IDs.push(this.state.hotels[i].hotelId);
    }

    const baseUrl = "https://api.amadeus.com/v3";
    const IdList = IDs.join(',');
    const URL = `${baseUrl}/shopping/hotel-offers?hotelIds=${encodeURIComponent(IdList)}&checkInDate=${encodeURIComponent(this.state.checkIn)}&checkOutDate=${encodeURIComponent(this.state.checkOut)}&roomQuantity=1&currency=CAD&paymentPolicy=NONE&bestRateOnly=false`;    
    const headers = {
      Accept: "application/vnd.amadeus+json",
      Authorization: `Bearer ${global_token}`
    };
    try {
      const response = await fetch(URL, {headers,
      method : "GET"});
      const content = await response.json();
      this.setState({
        hotelPrice : content.data
      });
    }
    catch(error) {
      console.error("error, couldn't fetch the prices", error)
    }
  }



  render() {   
    // in order to combine the data from hotel list and hotel search
    // allows us to print out name, rating, price onto screen.
    let res = [];
    var index = 0;
        for(let i = 0; i < this.state.hotelPrice.length; i++) {
            for(let k = 0; k < this.state.hotels.length; k++) {
                if(this.state.hotelPrice[i].hotel.hotelId === this.state.hotels[k].hotelId) {
                    res.push(this.state.hotelPrice[i]);
                    res[index].rating = this.state.hotels[k].rating;
                    index++;
                    break;
                } 
            }
        }
    return (
      <>
        
        <SearchBar city = {this.state.city} handleChange = {this.handleChange}
        handleSubmit = {this.handleSubmit} handleCountryCode = {this.handleCountryCode}
        countryCode = {this.state.countryCode} checkIn = {this.state.checkIn} checkOut = {this.state.checkOut}
        handleCheckIn = {this.handleCheckIn} handleCheckOut = {this.handleCheckOut}
        />
        <Filters />

        {/*the scrollable horizontal list*/}
        <div className= "scrollable-container">
        <div className="hotel-output">
          <ul className='horizontal-list'>
          {res.map((element,index) => (
            <li className = "list-element" key = {element}>
            <img src = {imgList[index % 9]} alt = "hotel" className = "hotel-image" />
              <p>{element.hotel.cityCode} - {element.hotel.name} </p>
              <span className = "rating">
                <p>ratings: {element.rating}/5 </p>
                <p>price: ${element.offers[0].price.total} {element.offers[0].price.currency}</p>
              </span>
            </li>
          ))}
          </ul>
        </div>
        </div>
      </>
    );
  }
};


export default Hotel;

