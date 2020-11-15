import React from "react";
import { Link } from "react-router-dom";
import databeta_screenlogo  from '../../assets/images/Data-BETA-screenlogo.jpg';
import { withStyles } from "@material-ui/core/styles";
import FooterPage from './FooterPage';
import AboutPage from '../about/AboutPage';

// const HomePage = () => (
//   <div className="jumbotron">
//     <h1>Data - BETA</h1>
//     <h3>Anti-Aging Science</h3>
//     <figure>
//       <img className='imgClock' src={databeta_screenlogo}/>
//     </figure>


//     <div className='centerPositionButton'>
//       <Link to="about" className="btn btn-primary btn-lg">
//         Learn more
//       </Link>
//     </div>
//   </div>
// );

// export default HomePage;



const styles = theme => ({
  root: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between"
    }
  },
  flexContainer: {
    background: '#eff0f2',
    margin: "0 auto 0 auto"
  },
  flexSection: {
    padding: "20px",
    boxSizing: "border-box",
    flexBasis: "50%",
    marginBottom: "20px"
  },
  mainText: {
    fontFamily: "Times New Roman, Times, serif",
    fontSize: "18px",
    lineHeight: "1.6"
  },
  centerHeader: {
    textAlign: "center"
  }
});

class HomePage extends React.Component {

  render() {
    const { classes } = this.props;

    // console.log('HomePage: this.props:', this.props)
    return (
      <div>
        <div className={[classes.flexContainer, classes.centerHeader].join(' ')}>

          <h2>Anti-Aging Science</h2>
          <hr/>
        </div>
        <div className={[classes.root, classes.flexContainer].join(' ')}>

          <div className={classes.flexSection}>
            <h3>A new technology, a new kind of clinical trial</h3>
            &nbsp;
            <p>
              We’ve been testing different supplements, trying different diets and exercise programs.
            </p>
            <p>
              We’ve been guessing what works, based on animal tests and a bit of biochemistry. We’ve had to guess because we have no human data. Lifespan trials in humans take decades and cost hundreds of millions of dollars.
            </p>
            <p>
              That’s what has changed. There is now a blood test based on DNA methylation* that measures biological age, predicting vulnerability to age-related disease even better than a person’s actual, chronological age. It works well enough that we should be able to measure the benefits of an anti-aging program over a period of two years.
            </p>
            <p>
              For the first time, we can test multiple supplements simultaneously. This is important, because much of what we do is redundant. Many diet regimes and supplements work on a few biochemical pathways. The pathways become saturated, and the result is that we’re adding the same three years to our life expectancy, over and over again.
            </p>
            <p>
              Synergy is when two different supplements combine to produce a bigger benefit than the sum of their separate effects. Synergy is what we’re looking for. The Data-BETA program is designed to find the rare combinations that work together to produce a big anti-aging benefit.
            </p>
            <figcaption className = 'centerPositionLink'><a href="https://youtu.be/4VTHsQcqxkA">3-minute Introduction to DataBeta research study video</a>
            </figcaption>
          </div>
          <div className={classes.flexSection}>

            <figure>
              <img className='imgClock' src={databeta_screenlogo}/>
            </figure>
        </div>

        </div>

        <FooterPage />
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(HomePage);
