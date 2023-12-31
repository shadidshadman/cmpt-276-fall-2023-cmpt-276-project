import React from 'react'
import './w3.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//used for getting the access token in order to use the APIs
var global_token;
const getToken = async () => {
    const apiUrl = 'https://api.amadeus.com/v1/security/oauth2/token';
    const apiID = "8Scu4JiUEJnquAgpDbqyIOZjMHQOgAyD";
    const apiPass = "SNQCPQb5a80UeCqj";
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${apiID}&client_secret=${apiPass}`,
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
   const {toDestination,fromDestination,from,destination,handleSubmit,getDeparture,departureObj,tempDate, getTempDate} = props;
    return (
      <form className = "hotel-search-form" onSubmit={handleSubmit}>
        <div className='new-search-container'>
            <p id = "search-title">Search for flights</p>
          <div className = "search-input">

          <div className="w3-half"> 
          <label>Departure Location:</label>
            <input type = "text"
             className = "w3-input w3-border"
                placeholder='City'
                onChange={fromDestination} 
                value = {from}
            />
            </div>

            <div className="w3-half"> 
            <label>Arrival Location:</label>
            <input type = "text" 
                placeholder='City'
                className = "w3-input w3-border"
                onChange={toDestination}
                value = {destination}
            />
            </div>

            <div className="w3-half"> 
            <label>Departure Date:</label>
            <label className='DatePicker'>
            <DatePicker 
            placeholderText='yyyy-mm-dd'
            className = "w3-input w3-border"
            selected={departureObj}
            onChange = {date => getDeparture(date)} 
            minDate={new Date()}
            maxDate={new Date(2024,11,31)}
            dateFormat= "yyyy-MM-dd"
            wrapperClassName="date-box"
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            />
          </label>
          <button type = "submit">Search</button>
            </div>
            
          </div>
        </div>
      </form>
    );
  }

export default class Flights extends React.Component {
    constructor(props) {
        super(props);
        // member variables
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
          departureObj : "",
          tempDate : "",

          originInfo: [],
          destinationInfo : [],
          flightInfo : [],
          loading: false
        };
        // allows the functions to use the "this" keyword
        this.fromDestination = this.fromDestination.bind(this);
        this.toDestination = this.toDestination.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getOriginIata = this.getOriginIata.bind(this);
        this.getDestinationIata = this.getDestinationIata.bind(this);
        this.getFlightInfo = this.getFlightInfo.bind(this);
        this.getDeparture = this.getDeparture.bind(this);
        this.getResult = this.getResult.bind(this);
        this.getTempDate = this.getTempDate.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }

    // initiates the api calls, they're all chained together
     handleSubmit(event) {
      event.preventDefault();
      this.setState({
        loading: true
      });
      getToken().then(token =>{
        global_token = token;
        this.getDestinationIata();
      }).catch(error => {console.error("error couldn't get token", error)});
      
    }
    removeLoading() {
      this.setState({
        loading: false
      });
    }
    getTempDate(date) {
      this.setState({
        tempDate : date
      });
    }

    // collect data to place into the api url
    getDeparture(date) {
      const formattedDate = date.toISOString().split('T')[0];
      this.setState({
        departureObj : date,
        departure : formattedDate
      });
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

    // get data from apis
    async getDestinationIata() {
      const baseURL = "https://api.amadeus.com/v1/reference-data";
      const url = `${baseURL}/locations?subType=AIRPORT&keyword=${encodeURIComponent(this.state.destination)}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`;
      const headers = {
        Accept: "application/vnd.amadeus+json",
        Authorization: `Bearer ${global_token}`
      };
      if(this.state.destination === "") {
        this.setState({
          destinationInfo : undefined
        }, () => {
          this.removeLoading();
        });
      }
      else {
      try {
        const response = await fetch(url,{
          headers,
          method : "GET"
        });
        const content = await response.json();
        //await this.getOriginIata();
        if(content.data[0] === undefined) {
          this.setState({
            destinationInfo : content.data[0]
          }, () => {
            this.removeLoading();
          });
        }
        this.setState({
          destinationInfo : content.data,
          toIata : content.data[0].iataCode,
          toName : content.data[0].name,
          toCity : content.data[0].address.cityName,
        }, () => {
          this.getOriginIata();
        });
      }
      catch(error) {
        console.error("couldn't get destination IATA", error);
      }
    }
    }

    async getOriginIata() {
      const baseURL = "https://api.amadeus.com/v1/reference-data"
      const url = `${baseURL}/locations?subType=AIRPORT&keyword=${encodeURIComponent(this.state.from)}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`;
      const headers = {
        Accept: "application/vnd.amadeus+json",
        Authorization: `Bearer ${global_token}`
      };
      if(this.state.from === "") {
        this.setState({
          destinationInfo : undefined
        }, () => {
          this.removeLoading();
        });
      }
      else {
      try {
        const response = await fetch(url,{
          headers,
          method : "GET"
        });
        const content = await response.json();
        if(content.data[0] === undefined) {
          this.setState({
            originInfo : content.data[0]
          }, () => {
            this.removeLoading();
          });
        }
        this.setState({
          originInfo : content.data,
          fromIata : content.data[0].iataCode,
          fromName : content.data[0].name,
          fromCity : content.data[0].address.cityName,
        }, () => {
          this.getFlightInfo();
        });

      }
      catch(error) {
        console.error("couldn't get origin IATA", error);
      }
    }
    }

    async getFlightInfo() {
      const baseURL = "https://api.amadeus.com/v2/shopping";
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
          this.removeLoading();
        });
        //console.log(content.data[0].itineraries.length);
      }
      catch(error) {
        console.error("couldn't retrieve flight info", error);
      }
    }
    // done getting info from apis


    // parsing and organize data inorder to get it into printable format
    getResult() {
        var res = [];
        let index = 0;
        if(this.state.originInfo !== undefined && this.state.destinationInfo !== undefined 
          && this.state.flightInfo !== undefined) {
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
              res[index].price.currency = "CAD";
              index++;
              break;
            }
          }
        }
      }
        return res;
    }
    render() {
        
        // toDestination,fromDestination,from,destination,handleSubmit,getDeparture,departure
        //rendering info onto screen
        return (
        <>
            
            <SearchBar toDestination = {this.toDestination} 
            fromDestination = {this.fromDestination} 
            from = {this.from}
            destination = {this.destination} 
            handleSubmit = {this.handleSubmit} 
            getDeparture = {this.getDeparture}
            departureObj = {this.state.departureObj}
            getTempDate = {this.getTempDate}
            tempDate = {this.state.tempDate}
            />
            <div className = "output">
            {this.state.loading === true && (
              <div className = "spinner2"></div>
            )}
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
                                <tr bgcolor = 'grey' key={index}>
                                    <td>{element.fromCityName}</td> 
                                    <td>{element.originAirport} </td>
                                    <td>{element.toCityName}</td> 
                                    <td>{element.destinationAirport}</td>
                                    <td>${(element.price.grandTotal * 1.46).toFixed(2)} {element.price.currency}</td>
                                    <td>{element.itineraries[0].segments[0].departure.at}</td>
                                    <td>{element.itineraries[0].segments[element.itineraries[0].segments.length - 1].arrival.at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {(this.state.originInfo === undefined ||
                this.state.destinationInfo === undefined || 
                this.state.flightInfo === undefined) && (
                  <p>Invalid input, please re-enter information</p>
                )}
            </div>
            </div>
            
            
        </>
        );
    }
}
