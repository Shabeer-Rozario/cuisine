import React from "react";
import { withRouter } from "react-router-dom";

class QuickSearchitems extends React.Component{
  handleNavigate = (mealname, mealtype) => {
    const locationId = sessionStorage.getItem('locationId');
    if(locationId) {
      this.props.history.push(`/filter?mealname=${mealname}&mealtype=${mealtype}&location=${locationId}`);
    }else
    this.props.history.push(`/filter?mealname=${mealname}&mealtype=${mealtype}`);
  }
    render() {
       const {name, content, image, meal_type } = this.props. QuicksearchitemsData ;
        console.log(image)
        return(     
        
                  <div className="boxes" onClick={() => this.handleNavigate(name,meal_type)}>
                    <div className="boxContent">
                      <img
                        src={image}
                        alt="chaat"
                        className="qsImage"
                      />
                      <h4 className="itemHeading">{name}</h4>
                      <p className="itemDescription">
                          {content}
                      </p>
                    </div>
                    </div>
       
           
        )
    }
}

export default  withRouter(QuickSearchitems);