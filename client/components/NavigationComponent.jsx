/* eslint-disable no-unused-expressions */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import Search from '../components/SearchBox.jsx';
import SubNavigation from '../containers/SubNavContainer.jsx'
import { Route, Link, withRouter } from 'react-router-dom';
import logo from '../styles/assets/prestige_worldwide.jpg';



const Navigation = props => (
  <div id="nav-bar" className="header header-fixed unselectable header-animated">
    {/* LOGO LEFT */}
    <div className="header-brand">
      <div className="nav_item no-hover">
        <a href="/">
          <img className="logo" src={logo} alt="logo" />
        </a>
      </div>
    </div>

    <div className="header-nav" id="header-menu">
      {/* Nav Left */}
      <div className="nav-left">
        <div className="nav-item text-center">
          <Link to="/">Cards</Link>
        </div>
        <div className="nav-item text-center">
          <Link to="/messages">Messages</Link>
        </div>
      </div>
      {/* NAV CENTER */}
      <div className="nav-center">
        <div className="nav-item no-hover" id="header-search">
          <Search
            fetchSearchedItems={props.fetchSearchedItems}
            searchValue={props.searchValue}
            searchBoxChange={props.searchBoxChange}
          />
        </div>
      </div>
      {/* NAV RIGHT */}
      <div className="nav-right">

        <button className='add-item' onClick={props.toggleAddItemModal}>+</button>

        {/* <div className="nav-item has-sub toggle-hover" id="dropdown">
          <a className="nav-dropdown-link">Categories</a>
          <ul className="dropdown-menu dropdown-animated" role="menu">
            <li role="menu-item">
              <center>
                <a href="/">Show All</a>
              </center>
            </li>
            <li
              role="menu-item"
              onClick={() => {
                props.fetchCategory('outdoor');
              }}
            >
              <center>Outdoor</center>
            </li>
            <li
              role="menu-item"
              onClick={() => {
                props.fetchCategory('household');
              }}
            >
              <center>Household</center>
            </li>
            <li
              role="menu-item"
              onClick={() => {
                props.fetchCategory('entertainment');
              }}
            >
              <center>Entertainment</center>
            </li>
            <li
              role="menu-item"
              onClick={() => {
                props.fetchCategory('toys');
              }}
            >
              <center>Toys</center>
            </li>
          </ul>
        </div>*/}
      </div>
    </div>
  </div>
);

export default Navigation;
