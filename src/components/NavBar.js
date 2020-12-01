import React from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {

  linkList = [
    {label: 'Dashboard', url: '/'},
    {label: 'About', url: '/about'},
    {label: 'Contact', url: '/contact'}
  ]
  
  constructor(props) {
    super(props);
    this.state = {menuOpened: false};
    this.toggleMenuClick = this.toggleMenuClick.bind(this);
  }
  
  toggleMenuClick = function toggleMenuClick(e){
    // e.preventDefault();

    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));

    const newState = this.state;
    newState.menuOpened = !this.state.menuOpened
    this.setState(newState);
  }

  getComponentClassNames(){
    const classNames = ['navbar'];
    if(this.state.menuOpened){
      classNames.push('navbar--opened');
    }
    return classNames.join(' ');
  }
  
  /* 
  componentDidMount() {
    // asd
  }
  
  componentWillUnmount(){
    // asd
  }
  */

  render(){
    
    return (
      <nav className={this.getComponentClassNames()}>
        <div className="navbar--wrapper">
          <a className="navbar--logo" href="/#/about">
            Company Stats
          </a>
          {/* This is a comment. */}
          <ul className="navbar--menu">
            {this.linkList.map((value, index) => (
              <li key={index} className="navbar--item">
                <Link to={value.url} className="navbar--item--link">{value.label}</Link>
              </li>
            ))}
          </ul>
          
          <button onClick={this.toggleMenuClick} className="navbar--toggle"></button>
        </div>
      </nav>
    );
  }
};
