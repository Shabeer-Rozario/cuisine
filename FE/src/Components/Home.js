import axios from 'axios';
import React from 'react'

import '../Components/Styles/Home.css'

import QuickSearch from './QuickSearch';
import Wallpaper from './Wallpaper';

class Home extends React.Component{

     constructor(){
        super();
        this.state = {
            locations: [],
            mealtypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/location/getLocation',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            this.setState({ locations: response.data.data })
        })
        .catch(err => console.log(err));

        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/mealtype/getAllMealTypes',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            this.setState({ mealtypes: response.data.data })
        })
        .catch(err => console.log(err));
    }
    render() {
        const { locations, mealtypes } = this.state;
        console.log(locations, mealtypes)
        return(
            <div>
                <Wallpaper locationsData = {locations} />
                <QuickSearch quicksearchData = {mealtypes}/>
            </div>

        )
    }
}
export default Home;