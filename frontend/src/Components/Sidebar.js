
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as  NavLink, Link } from "react-router-dom";
import Wis from '../4.png'
import Vk from '../5.png'
import Face from '../6.png'
import Inst from '../7.png'
import { addUser, addId } from '../redux/actions';

export class Sidebar extends Component {
  // get = async () =>{
  //   await window.FB.login( (response) => {
  //     if (response.authResponse) {
  //         this.props.addId(response.authResponse.userID)
  //     }  
  // }, { scope: "user_posts" })
  // }

  render() {
    return (
      <div className = "sideBar">
        <ul>
       <li><Link to="/servicePosts" ><img  src = {Wis} width = "250px"/></Link></li>
       <li><Link to="/VK"><img src = {Vk} width = "230px"/></Link></li>
       <li><Link to="/facebook"><img onClick={this.get} src = {Face} width = "180px" className="faceInst"/></Link></li>
       <li><Link to="/instagram"><img src = {Inst} width = "180px"className="faceInst"/></Link></li>
      </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards
})

function mapDispatchToProps(dispatch) {
  return {
    add: (user) => dispatch( addUser(user) ),
    addId: (id) => dispatch( addId(id) ),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
