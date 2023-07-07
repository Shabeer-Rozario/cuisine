import React from "react";
import QuickSearchitems from "./QuickSearchitems";


class QuickSearch extends React.Component{
    render() {
        const {quicksearchData} = this.props;
        return(
            <div>
                <div className="bottomSection">
      <h1 className="heading">Quick Search</h1>
      <h3 className="subHeading">Discover restuarants by type of meal</h3>
      <div className="boxContainer">

        {
            quicksearchData.map((item) =>{
                return  <QuickSearchitems QuicksearchitemsData = {item} />
            })
        }
       
       
        </div>
      </div>
    </div>
        )
    }
}

export default QuickSearch;