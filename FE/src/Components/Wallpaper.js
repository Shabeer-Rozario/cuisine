import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Wallpaper extends React.Component{
  constructor () {
    super();
    this.state = {
      restaurent: [],
      inputText: '',
      suggestions:[]
    }
  }

  handleLocation = (event) => {
      const locationId = event.target.value;
      sessionStorage.setItem('locationId', locationId)

      axios({
        method: 'GET',
        url: `http://localhost:3001/api/restaurent/getRestaurent/${locationId} `,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        this.setState({ restaurent: response.data.data.restaurent })
    })
    .catch(err => console.log(err));
  }

  handleSearch = (event) => {
      let inputText = event.target.value;

      const { restaurent } = this.state;
      const suggestions =restaurent.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
      this.setState({ suggestions, inputText});
  }

  showSuggestion = () =>{
    const { suggestions, inputText } = this.state;

    if(suggestions.length == 0 && inputText == undefined) {
      return null;
    }
    if(suggestions.length > 0 && inputText == '') {
      return null;
    }
    if( suggestions.length == 0 && inputText) {
      return <ul>
        <li>No Search Results Found</li>
      </ul>
    }
    return (
      <ul>
        {
          suggestions.map((item, index) =>(<li key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} - ${item.locality},${item.city}`}</li>))
        }
      </ul>
    )
  }

  selectingRestaurant = (resObj) => {
    this.props.history.push(`/details?restaurent=${resObj._id}`);
  }
    render(){
      const { locationsData } = this.props;
        return(
            <div>
                 <img
      src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
      alt="Zomato Website Image"
      className="homeImage"
    />
    
    <div className="topSection">
      <div className="logo">Zomato</div>
      <div className="headerText">Discover the best food & drinks in Salem</div>
      <div className="searchOptions">
        <span>
          <select className="locationBox" onChange={this.handleLocation}>
            <option value='0'>Select City</option>
            {locationsData.map((item,l) =>{
              return <option value={item.location_id} key={l}>{`${item.name}, ${item.city}`}</option>
            })}
          </select>
        </span>
        <span className="searchBox">
          <i className="bi bi-search searchIcon"></i>
          <input id="query"
            type="text"
            className="searchInput"
            placeholder="Search for Restuarants" onChange={this.handleSearch}
          />
           {this.showSuggestion()}
        </span>
      </div>
    </div>
            </div>
        )
    }
}

export default withRouter(Wallpaper);