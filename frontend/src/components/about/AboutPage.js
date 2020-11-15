import React from "react";
import imgHorvathClock  from '../../assets/images/Horvath-clock-progression.png';

const AboutPage = () => (
  <div>

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
    <figure>
      <img className='imgClock' src={imgHorvathClock}/>
    </figure>
  </div>
);

export default AboutPage;
