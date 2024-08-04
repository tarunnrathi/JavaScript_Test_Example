import React from "react";
const IplAuctionSocialShare = ({
  isAMP = false,
  isMobile = false,
  title,
  url,
  domain
}) => {
  const watsURLMobile = (isMobile) ? "whatsapp://send?text=" + title + " - " + domain + url : `https://web.whatsapp.com/send?text=${title}&url=${domain}${url}/`;
	return (
		<>
			<div className="share_icons">
        <a
          href={`https://www.facebook.com/sharer.php?u=${domain}${url}&t=${title}`}
          target="_blank"
        >
          {
            isAMP ? (
              <amp-img
                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/fb_svg_1609922228.svg"
                width={8}
                height={16}
              ></amp-img>
            ) : (
              <img
                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/fb_svg_1609922228.svg"
                width={8}
                height={16}
              />
            )
          }          
        </a>
        <a
          href={`http://twitter.com/share?text=${title}&url=${domain}${url}`}
          target="_blank"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1" height="16" width="16" id="IconChangeColor"> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" id="mainIconPathAttribute"></path> </svg>
        </a>
        <a
          href={watsURLMobile}
          target="_blank"
        >
          {
            isAMP ? (
              <amp-img
                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/wh_svg_1609922278.svg"
                width={16}
                height={16}
              ></amp-img>
            ) : (
              <img
                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/wh_svg_1609922278.svg"
                width={16}
                height={16}
              />
            )
          }
          
        </a>
      </div>
			<style jsx global>{`
        .share_icons{width:50px;padding-top:5px}
        .share_icons a{display:block;margin-bottom:20px}
        @media (max-width:768px){          
          .share_icons {display: flex; justify-content: center; width: 100%; margin: 0px 0 20px;}
          .share_icons a {display: block; margin: 0 10px;}
        }      
		  `}</style>
		</>
	);
};

export default IplAuctionSocialShare;
