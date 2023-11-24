import React from 'react'
import './App.css';
import TopSection from './top_bar';

var global_token;
const getToken = async () => {
    const apiUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
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
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
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

function Filters() {
  return (
    <div class = "filter">
      <h1>Hotels</h1>
      <button id = "filter-btn">Filter</button>
    </div>
  );
}

function SearchBar(props) {
   const {toDestination,fromDestination,from,destination,handleSubmit,getDeparture,departure} = props;
    return (
      <form className = "hotel-search-form" onSubmit={handleSubmit}>
        <div className='new-search-container'>
            <p id = "search-title">Search for Flights</p>
          <div className = "search-input">
            <input type = "text"
                placeholder='FROM'
                onChange={fromDestination} 
                value = {from}
            />
            <input type = "text" 
                placeholder='TO'
                onChange={toDestination}
                value = {destination}
            />
            <br />
            <input type = "text" 
                placeholder='Departure: yyyy-mm-dd'
                onChange = {getDeparture}
                value = {departure}
            />
          </div>
          <button className='hotel-btn' type = "submit">Search</button>
        </div>
      </form>
    );
  }

export default class Flights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          destination: "",
          from: "",

          fromIata : "",
          toIata : "",
          fromName : "",
          toName : "",

          fromCity : "",
          toCity : "",

          departure : "",
          fromInfo : [],
          toInfo : [],

          flightInfo : []
        };
        this.fromDestination = this.fromDestination.bind(this);
        this.toDestination = this.toDestination.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getOriginIata = this.getOriginIata.bind(this);
        this.getDestinationIata = this.getDestinationIata.bind(this);
        this.getFlightInfo = this.getFlightInfo.bind(this);
        this.getDeparture = this.getDeparture.bind(this);
        this.getResult = this.getResult.bind(this);
    }

    // need to get the city and airport name from api
   async handleSubmit(event) {
      event.preventDefault();
      getToken().then(token =>{
        global_token = token;
        //this.getOriginIata();
        this.getDestinationIata();
        //this.getFlightInfo();
      }).catch(error => {console.error("error couldn't get token", error)});
      
    }
    
    getDeparture(event) {
      this.setState({
        departure : event.target.value
      });
    }


    async getDestinationIata() {
      const baseURL = "https://test.api.amadeus.com/v1/reference-data";
      const url = `${baseURL}/locations?subType=AIRPORT&keyword=${encodeURIComponent(this.state.destination)}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`;
      const headers = {
        Accept: "application/vnd.amadeus+json",
        Authorization: `Bearer ${global_token}`
      };
      try {
        const response = await fetch(url,{
          headers,
          method : "GET"
        });
        const content = await response.json();
        await this.getOriginIata();
        this.setState({
          toIata : content.data[0].iataCode,
          toName : content.data[0].name,
          toInfo : content.data,
          toCity : content.data[0].address.cityName
        }, () => {
        });
      }
      catch(error) {
        console.error("couldn't get destination IATA", error);
      }
    }

    async getOriginIata() {
      const baseURL = "https://test.api.amadeus.com/v1/reference-data"
      const url = `${baseURL}/locations?subType=AIRPORT&keyword=${encodeURIComponent(this.state.from)}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`;
      const headers = {
        Accept: "application/vnd.amadeus+json",
        Authorization: `Bearer ${global_token}`
      };
      try {
        const response = await fetch(url,{
          headers,
          method : "GET"
        });
        const content = await response.json();
        this.setState({
          fromIata : content.data[0].iataCode,
          fromName : content.data[0].name,
          fromInfo : content.data,
          fromCity : content.data[0].address.cityName
        }, () => {
          this.getFlightInfo();
        });

      }
      catch(error) {
        console.error("couldn't get origin IATA", error);
      }
    }

    async getFlightInfo() {
      const baseURL = "https://test.api.amadeus.com/v2/shopping";
      const url = `${baseURL}/flight-offers?originLocationCode=${encodeURIComponent(this.state.fromIata.toUpperCase())}&destinationLocationCode=${encodeURIComponent(this.state.toIata.toUpperCase())}&departureDate=${encodeURIComponent(this.state.departure)}&adults=1&nonStop=false&max=30`;
      const headers = {
        Accept: "application/vnd.amadeus+json",
        Authorization: `Bearer ${global_token}`
      };
      try {
        
        const response = await fetch(url, {headers,
        method: "GET"});
      
        const content = await response.json();
        //data.push(content.data);
        
        this.setState({
           flightInfo : content.data
        }, () => {
          this.getResult();
        });
        //console.log(content.data[0].itineraries.length);
      }
      catch(error) {
        console.error("couldn't retrieve flight info", error);
      }
    }

    fromDestination(event) {
      this.setState({
        from: event.target.value
      });
    }
    toDestination(event) {
      this.setState({
        destination: event.target.value
      });
    }

    getResult() {
     // console.log(this.state.flightInfo[0].itineraries[0].segments.length);
        var res = [];
        let index = 0;
        for(let i = 0; i < this.state.flightInfo.length; i++) {
          let seg_len = this.state.flightInfo[i].itineraries[0].segments.length;
          for(let k = 0; k < seg_len; k++) {
          if(this.state.flightInfo[i].itineraries[0].segments[0].departure.iataCode === this.state.fromIata &&
            this.state.flightInfo[i].itineraries[0].segments[seg_len - 1].arrival.iataCode === this.state.toIata) {
            res.push(this.state.flightInfo[i]);
            res[index].originAirport = this.state.fromName;
            res[index].destinationAirport = this.state.toName;
            res[index].fromCityName = this.state.fromCity;
            res[index].toCityName = this.state.toCity;
            index++;
            break;
            }
          }
        }
        return res;
    }
    render() {
        
        //let res = this.getResult();
        // toDestination,fromDestination,from,destination,handleSubmit,getDeparture,departure
        return (
        <>
            <TopSection />
            <SearchBar toDestination = {this.toDestination} fromDestination = {this.fromDestination} from = {this.from}
            destination = {this.destination} handleSubmit = {this.handleSubmit} getDeparture = {this.getDeparture}
            departure = {this.departure}
            />
            <div className = "flight-table">
                {this.getResult().length > 0 && (
                    <table bgcolor='black'>
                        <thead>
                            <tr id="table-head">
                                <th>origin</th>
                                <th>Airport</th>
                                <th>Destination</th>
                                <th>Airport</th>
                                <th>Price</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                            </tr>
                        </thead>
                        <tbody id = "table-body">
                            {this.getResult().map((element, index) => (
                                <tr bgcolor = 'white' key={index}>
                                    <td>{element.fromCityName}</td> 
                                    <td>{element.originAirport} </td>
                                    <td>{element.toCityName}</td> 
                                    <td>{element.destinationAirport}</td>
                                    <td>${element.price.grandTotal} {element.price.currency}</td>
                                    <td>{element.itineraries[0].segments[0].departure.at}</td>
                                    <td>{element.itineraries[0].segments[element.itineraries[0].segments.length - 1].arrival.at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
        </>
        );
    }
}