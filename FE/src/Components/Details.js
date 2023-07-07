import React from "react";
import queryString from 'query-string';
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import '../Components/Styles/Details2.css';
import Modal from 'react-modal';
import { get, post } from '../Components/service/service'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Care from "./Carousel";

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#d50000',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#1b5e20',
        },

    },
});

// const { enqueueSnackbar } = useSnackbar();
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#B0E0E6',
        border: 'solid 2px brown'
    },
};



class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurent: {},
            restaurentModelData: {},
            resId: false,
            galleryModelIsOpen: false,
            menuItemsModalIsOpen: false,
            promenuItemModalIsopen: false,
            totalPrice: 0
        }
    }


    async componentDidMount() {
        const qs = queryString.parse(this.props.location.search)
        const { restaurent } = qs;
      
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/restaurent/getRestaurentDetails/${restaurent}`,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            this.setState({ restaurent: response.data.data.restaurent })
        }).catch(err => console.log(err))

    }
    async handleOrder(resId) {
        var result = await get(`restaurent/menuitems/${resId}`).catch((err) => {
            console.log(err);
        })
        if (!result.error) {
            console.log(result.data)
        } else {
            console.log(result.message);
        }
    }
    handleModal = async (resmenuId, value) => {
        this.setState({ menuItemsModalIsOpen: value })
        var menuData = await get(`restaurent/Restaurentmenuitems/${resmenuId}`).catch((err) => {
            console.log(err);
        })
        console.log(menuData)
        if (!menuData.error) {
            this.setState({ restaurentModelData: menuData.data.ResMenu })
        }

    }

    closeModal = () => {
        this.setState({ menuItemsModalIsOpen: false })
    }
    addItemHandler = (minprice) => {
        console.log(minprice);
        const { totalPrice } = this.state;
        this.setState({ totalPrice: totalPrice + minprice });

    };
    removeItemHandler = (minprice) => {
        const { totalPrice } = this.state;

        this.setState({ totalPrice: totalPrice - minprice })
    }

    notify = () =>
        toast.success("successfully order placed", { position: toast.POSITION.TOP_LEFT })

    handleGalleryModal = () => {
        this.setState({ galleryModelIsOpen: true })
    }
    render() {
        const { restaurent, menuItemsModalIsOpen, restaurentModelData, totalPrice } = this.state;
        return (
            <div>
                <div>
                   <Care />
                    <button className="clickSearch" onClick={this.handleGalleryModal}>Click to see image Gallery</button>
                </div>
                <div className="tabs">
                    <h3 className="heading">{restaurent.name}</h3>
                    
                    <ul>
                        {
                            restaurent?.cuisine?.map((item, index) => (<li key={index} >{`${item.name}`}</li>))
                        }
                    </ul>

                    <Tabs>
                        <TabList>
                            <Tab>Overview</Tab>
                            <Tab>Contact</Tab>
                        </TabList>
                        <TabPanel className="pannel">
                        <h4 className="about">About this place</h4>
                        <h4 className="head">cuisine</h4>
                        <br></br>
                        <h3 className="value">Bakery, Fast-food</h3>
                        <h3 className="head">Average Cost</h3>
                        <p className="value"> &#8377; {restaurent.min_price} for two people(approx)</p>
                        </TabPanel>
                        <TabPanel className="pannel">
                        <h4 className="Phone">Phone number</h4>
                        <h4>{restaurent.contact_number}</h4>
                        <br></br>
                        <h3>{restaurent.name}</h3>
                        <p>{restaurent.address}</p>
                    </TabPanel>
                    </Tabs>
                   
                </div>
                <div>
                    <button className="btn-order" onClick={() => this.handleModal(restaurent._id, true)}>Place online order</button>
                </div>
                <Modal
                    isOpen={menuItemsModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }} onClick={() => this.handleModal('menuItemsModalIsOpen', false)}></div>
                    </div>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-md-4">
                                <h2>Menu Modal</h2>
                                <ul class="list-group">
                                    name : {restaurent.name}
                                    <br />
                                    city : {restaurent.city}
                                    <br />
                                    cuisine :
                                    {
                                        restaurent?.cuisine?.map((item, index) => (<li key={index} >{`${item.name}`}</li>))
                                    }
                                    Number : {restaurent.contact_number}
                                   
                                </ul>
                                <br />
                                <button className="cancelbtn" onClick={this.closeModal}>Cancel</button>
                            </div>
                            <div className="col-md-4 offset-md-4">
                                <ThemeProvider theme={theme}>
                                    <Button onClick={() => this.removeItemHandler(restaurent.min_price)}>-</Button>
                                    <Button color="secondary" onClick={() => this.addItemHandler(restaurent.min_price)}>+</Button>
                                </ThemeProvider>
                            </div>
                            <div className="col-md-4 offset-md-8 orderdetails">
                                name: {restaurent.name}
                                <br />
                                cuisine :
                                {
                                    restaurent?.cuisine?.map((item, index) => (<li key={index} >{`${item.name}`}</li>))
                                }
                                Price:{totalPrice}
                            </div>
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <Button className="paynow" color="error" onClick={() => this.notify()}>pay now</Button>
                                    <ToastContainer />
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </Modal >
            </div >
        )
    }
}
export default Details;