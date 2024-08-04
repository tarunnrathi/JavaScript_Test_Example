import React, { useEffect } from 'react';
import BudgetSponsorSlider from './BudgetSponsorSlider';

const BudgetCalculator = ({ sponsor }) => {
  useEffect(() => {
    setTimeout(() => {
      const twitterScript = document.createElement('script');
      twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      twitterScript.setAttribute('async', 'true');
      twitterScript.setAttribute('charset', 'utf-8');
      document.querySelector(".twitter_widget").appendChild(twitterScript);
    }, 2500);
  }, []);
  return (
    <>
      <div className="budget_container calculator_mini">
        <div className="budget_page">
          <div className="budget_page_left">
            <div className="tav_calculate">
              <div className="budget__calculator-heading">
                <p>इनकम टैक्स कैलकुलेटर</p>
                <BudgetSponsorSlider sliderId='budgetCalculatorId' sponsor={sponsor} />
              </div>
              <iframe
                src="https://www.moneycontrol.com/techmvc/responsive/savetaxwidget?classic=true"
                frameBorder="0"
              ></iframe>
            </div>
          </div>

          <div className="budget_page_right">
            <div className="twitter_widget">
              <a
                className="twitter-timeline"
                href="https://twitter.com/News18India?ref_src=twsrc%5Etfw"
              >
                Tweets by News18
              </a>
            </div>
          </div>

        </div>
      </div>
      <style jsx global>{`
      .calculator_mini { margin-top: 30px; !important}
      .twitter_widget {
        width: 100%;
        clear: both;
        max-height: 500px;
        overflow: auto;
      }

      .budget__calculator-heading {
        position:relative;
        color: #003b5b;
        text-transform: uppercase;
        font-size: 28px;
        font-weight:bold;
        padding: 10px;

      }
  
      @media screen and (max-width: 800px) {
        .tav_calculate iframe {
          width: 100%;
          height: 665px;
        }
        .budget_page_left{
          margin-bottom: 5px;
        }
 
        .calculator_mini .budget_page_right{
          max-height: 350px;
          margin-top: -10px;
        }

        .budget__calculator-heading  p {
          font-size: 20px;
        }

      }
    `}</style>
    </>
  );
};

export default BudgetCalculator;
