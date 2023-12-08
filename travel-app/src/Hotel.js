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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    const apikey = "NRaZw0fhT9N10P24mIz6sJ7kjD3vxzQd";
    const apisecret = "Qv0lGP8At7XlDb3X";
  
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
  const { city, handleChange, handleSubmit, handleCountryCode, 
    countryCode,handleCheckIn,handleCheckOut,checkOutObj, checkInObj } = props;
  return (
    <form className = "hotel-search-form" onSubmit = {handleSubmit}>
      <div className='new-search-container'>
          <p id = "search-title">Search for hotels</p>
        <div className = "search-input">
          
          <div className="w3-half">

            <label htmlFor="Location">Destination Location:</label>
            <input 
            id = "Location"
            className = "w3-input w3-border"
            type = "text" 
            placeholder='City'
            value = {city}
            onChange={handleChange}
            />

          </div>
          
          <div className="w3-half">
          <label htmlFor="country-code">Two Letter Country Code:</label>
          <input 
            type = "text" 
            className = "w3-input w3-border"
            onChange={handleCountryCode}
            placeholder = " e.g. CA"
            id = "country-code" 
            value = {countryCode} />
            </div>
            
            <br />

          <div class="w3-half">
          <label htmlFor = "CheckIn">Check In:</label>
          <label className='DatePicker'>
          <DatePicker 
          id = "CheckIn"
          placeholderText='yyyy-mm-dd'
          className = "w3-input w3-border"
          selected={checkInObj}
          onChange = {date => handleCheckIn(date)} 
          minDate={new Date()}
          maxDate={new Date(2024,11,31)}
          dateFormat= "yyyy-MM-dd"
          wrapperClassName="date-box"
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          />
          </label>
          </div>

          <div className="w3-half">
          <label htmlFor="CheckOut">Check Out:</label>
          <label className='DatePicker'> 
          <DatePicker 
          id = "CheckOut"
          placeholderText='yyyy-mm-dd'
          className = "w3-input w3-border"
          selected={checkOutObj}
          onChange = {date => handleCheckOut(date)} 
          minDate={new Date()}
          maxDate={new Date(2024,11,31)}
          dateFormat= "yyyy-MM-dd"
          wrapperClassName='date-box'
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          />
          </label>
          </div>
          

        </div>
        
        <button className='hotel-btn' type = "submit">Search</button>
      </div>
    </form>
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
      hotelContent: [],
      hotelPrice: [], // get price
      longitude : "",
      latitude : "",

      checkIn : "",
      checkOut : "",
      checkInObj : "",
      checkOutObj : "",
      loading : false
    };
    // so that we can use "this" keyword in given methods
    this.handleChange = this.handleChange.bind(this);
    this.searchHotel = this.searchHotel.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCountryCode = this.handleCountryCode.bind(this);
    this.getRating = this.getRating.bind(this);
    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.getResults = this.getResults.bind(this);
    this.removeLoading = this.removeLoading.bind(this);
  }
  
  handleCheckIn(date) {
    const formattedDate = date.toISOString().split('T')[0];
    this.setState({
      checkInObj : date,
      checkIn : formattedDate
    });
    
  }

  handleCheckOut(date) {
    const formattedDate = date.toISOString().split('T')[0];
    this.setState({
      checkOutObj : date,
      checkOut : formattedDate
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
    this.setState({
      loading : true
    });
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
      const content = await response.json();
      if(content.data === undefined) {
        this.setState({
          hotelContent : content.data
        },() =>  {
          this.removeLoading();
        });
      }
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
      }, () =>  {
        this.removeLoading();
      });
    }
    catch(error) {
      console.error("error, couldn't fetch the prices", error)
    }
  }

  getResults() {
    let res = [];
    var index = 0;
    if(this.state.hotelPrice !== undefined && this.state.hotelContent !== undefined ) {
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
    }
      return res;
  }

  removeLoading() {
    this.setState({
      loading : false
    });
  }

  render() {   
    // in order to combine the data from hotel list and hotel search
    // allows us to print out name, rating, price onto screen.
    
    return (
      <>
        <SearchBar city = {this.state.city} 
        handleChange = {this.handleChange}
        handleSubmit = {this.handleSubmit} 
        handleCountryCode = {this.handleCountryCode}
        countryCode = {this.state.countryCode} 
        checkInObj = {this.state.checkInObj} 
        checkOutObj = {this.state.checkOutObj}
        handleCheckIn = {this.handleCheckIn} 
        handleCheckOut = {this.handleCheckOut}
        />
        {this.state.loading === true && (
          <div className = "spinner"></div>
        )}

        <div className= "scrollable-container">
          {(this.state.hotelPrice !== undefined && this.state.hotelContent !== undefined) && 
           (
        <div className="hotel-output">
          <ul className='horizontal-list'>
          {this.getResults().map((element,index) => (
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
        </div>) 
        }
        {(this.state.hotelContent === undefined 
        || this.state.hotelPrice === undefined) && (
          <p>Invalid information entered, please re-enter</p>
        )}
        </div>
      </>
    );
  }
};


export default Hotel;

