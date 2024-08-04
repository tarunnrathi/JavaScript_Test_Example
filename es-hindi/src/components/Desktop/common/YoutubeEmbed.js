import React from 'react';
import { InView } from 'react-intersection-observer';
import { logEventNew } from "includes/googleAnalytic";

const YoutubeEmbed = ({ id = '', isDesktop, src='', title='', cat }) => {

  const splitSrc = src?.split('/');
  const video_id = splitSrc?.length && splitSrc[splitSrc.length-1];
  return (
    <div className='addef'>
      <InView
       as="div"
       threshold={0.1}
       onChange={(inView, _, entry) => {
         if(inView) {
          // console.log(`%cVideo_Feature_Impression_Article_JSPlayer , Impression ,${title}, ${video_id}, ${cat} , ${id}`, 'color:green;background-color: white');
          logEventNew('Video_Embed_Impression_Article_Youtube', 'Impression', `${title},${video_id} , ${cat} ,  ${id}`);
         }
       }
       }
      >
      <div className="contnt_img" data-video-event ='Article_Youtube' >
       <iframe src={src} title={title} id={`iframe-${id}`} defer loading='lazy' width={isDesktop?560:330} height={isDesktop?315:185} allowfullscreen={"allowfullscreen"} ></iframe>
      </div>
      </InView>

      <style jsx global>{`  
      .embed-container iframe{
        position: static !important;
        ${isDesktop ? 'height: 315px !important' :'height: 185px!important' } ;
        ${isDesktop ? 'width: 560px !important' :'width: 100% !important' } ;
      }`
      }
      </style>
      </div>
  );
};

export default YoutubeEmbed;
