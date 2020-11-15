import React, { Component } from "react";
import { ListItem, ListItemText, Icon } from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { navigationItems } from "../../common/navigationItems";

const styles = theme => ({
  root: {
    fontSize: "2vw",
    backgroundColor: theme.palette.primary.dark,
    // padding: "10px",
    // minHeight: "75px",
    display: 'flex',
    fontFamily: 'sans-serif',
    color: 'white'
  },
  // phone: {
  //   marginTop: '10px',
  //   marginLeft: '30px',
  //   fontSize: '2.2vw'
  // },
  listItem: {
    textAlign: "left",
    margin: "5px auto",
    maxHeight: '20px'
  },

});

class Nav extends Component {
  // _isMounted = false;

  constructor(props){
    super(props)
    this.state = {

    }
    this.classToggle.bind(this)
  }


  componentDidMount(prevProps){
    // this._isMounted = true;
      document.querySelector('.Navbar__Link-toggle')
        .addEventListener('click', this.classToggle);
  }



  classToggle = () => {
    const navs = document.querySelectorAll('.Navbar__Items')
    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
  }


  render() {
    const { classes } = this.props;

    return (
      <div className='Navbar'>

        <div className="Navbar__Link Navbar__Link-brand">

          <h1 style={{padding: '10px'}}>Data-BETA</h1>
        </div>

        <div className="Navbar__Link Navbar__Link-toggle">
          <i className="fas fa-bars"></i>
        </div>

        <nav className="Navbar__Items Navbar__Items--right">

          {navigationItems.map(item => {
            let List_Item =
              (<ListItem
                button
                component={NavLink}
                to={item.url}
                className={classes.listItem}
                onClick={this.navbarClick}
              >
                <Icon>{item.icon}</Icon>
                &nbsp;
                <ListItemText
                  className={classes.listItemText}
                  primary={item.title}
                />
              </ListItem>);

            if (item.url.includes("https")) {
              List_Item =
                (<ListItem
                  button
                  component="a"
                  href={item.url}
                  className={classes.listItem}
                  onClick={this.navbarClick}
                >
                  <Icon>{item.icon}</Icon>
                  &nbsp;
                  <ListItemText
                    className={classes.listItemText}
                    primary={item.title}
                  />
                </ListItem>)
            }

            return (
              <React.Fragment key={item.id}>
                {List_Item}
            </React.Fragment>
            )
          })}

        </nav>

      </div>
    );
  }
}


export default withStyles(styles)(withRouter(Nav));
