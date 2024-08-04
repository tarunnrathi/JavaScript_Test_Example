const TopStoryWidgetMobile = ({ topNewsStoryData }) => {

    const firstArray = topNewsStoryData.slice(0, 1);
    const secondArray = topNewsStoryData.slice(1, 3);
    const lastArray = topNewsStoryData.slice(3, 6);

    return (
        <>
            <div className="CN-Sections">
                <div className="CN-storyWrap">
                    {
                        firstArray.map((data, index) =>
                            <div className="CN-LeadStory" key={`firstArray`+index}>
                                <h2 className="CN-LeadHead">
                                    <a href={data.weburl_r}>{data.display_headline}</a>
                                </h2>
                                <figure>
                                    <a href={data.weburl_r}>
                                        <span className="CN-LeadBtn">Exclusive</span> 
                                        <img
                                            loading="lazy"
                                            src={`${
                                                data.images?.url
                                              }?impolicy=website&width=414`}
                                            data-src={`${
                                                data.images?.url
                                              }?impolicy=website&width=414`}
                                            title={data.display_headline}
                                            alt={data.display_headline}
                                            height="240"
                                        />
                                    </a>
                                </figure>
                            </div>
                        )
                    }

                    {
                        secondArray &&
                            <div className="CN-Thumbstory">
                            {
                                secondArray.map((data, index) =>
                                    <div className="CN-ThumbStory-col" key={`secondArray`+index}>
                                        <div className="imgwrap">
                                            <a href={data.weburl_r}>
                                                <img
                                                    loading="lazy"
                                                    src={`${
                                                        data.images?.url
                                                    }?impolicy=website&width=165`}
                                                    data-src={`${
                                                        data.images?.url
                                                    }?impolicy=website&width=165`}
                                                    title={data.display_headline}
                                                    alt={data.display_headline}
                                                    height="110"
                                                />
                                            </a>
                                        </div>
                                        <div className="text">
                                            <a href={data.weburl_r}>
                                                <p>{data.display_headline}</p>
                                            </a>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }

                    <div className="CN-Topstory">
                        <ul>
                        {
                            lastArray.map((data, index) =>
                                <li key={`lastArray`+index}>
                                    <a href={data.weburl_r}>{data.display_headline}</a>
                                </li>                               
                            )
                        }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="clearfix vsp20"></div>
            <style jsx global>{`   
                .CN-Sections {
                border-bottom: 6px solid #EEEEEE;
                margin-bottom: 30px;
                }
                .CN-LeadStory {
                    margin-bottom: 10px;
                }
                .CN-LeadStory .CN-LeadHead {
                    font-size: 19px;
                    line-height: 24px;
                    background: #001e44;
                    padding: 20px 10px 15px 10px;
                    position: relative;
                }
                .CN-LeadStory .CN-LeadHead:before {
                    content: '';
                    position: absolute;
                    width: 40px;
                    background: #e1261c;
                    height: 6px;
                    top: 10px;
                    left: 0;
                }
                .CN-LeadStory .CN-LeadHead a {
                    color: #fff;
                    display: block;
                }
                figure {
                    position: relative;
                    line-height: 0;
                }
                .CN-LeadStory figure a {
                    display: block;
                    position: relative;
                }
                .CN-LeadStory figure a .CN-LeadBtn {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background: #e1261d;
                    padding: 2px 10px;
                    font-size: 11px;
                    color: #fff;
                    text-transform: uppercase;
                    display: none;
                }
                .CN-LeadStory figure a img {
                    width: 100%;
                    display: block;
                }
                .CN-Thumbstory {
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 10px;
                }
                .CN-Thumbstory .CN-ThumbStory-col {
                    width: 48.5%;
                    border: 1px solid #D7D7D7;
                    border-radius: 5px;
                    overflow: hidden;
                }
                .CN-Thumbstory .CN-ThumbStory-col .imgwrap a, .CN-Thumbstory .CN-ThumbStory-col .imgwrap img {
                    display: block;
                    width: 100%;
                }
                .CN-Thumbstory .CN-ThumbStory-col .text {
                    padding: 10px;
                }
                .CN-Thumbstory .CN-ThumbStory-col .text a {
                    display: block;
                    color: #0A0A0A;
                    font-size: 14px;
                }
                .CN-storyWrap .CN-Topstory {
                    background: #F5F5F5;
                    padding: 0 10px;
                }
                .CN-storyWrap .CN-Topstory ul {
                    border-top: 1px solid #D7D7D7;
                    border-bottom: 1px solid #D7D7D7;
                    padding: 15px 10px;
                }
                .CN-storyWrap .CN-Topstory ul li {
                    margin-bottom: 20px;
                    padding-left: 15px;
                    position: relative;
                }
                .CN-storyWrap .CN-Topstory ul li::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    position: absolute;
                    background: #E1261C;
                    border-radius: 50%;
                    left: 0;
                    top: 6px;
                }
                .CN-storyWrap .CN-Topstory ul li a {
                    color: #0A0A0A;
                    font-size: 16px;
                    line-height: 22px;
                }
                .iplmorebtn {
                    display: block;
                    text-align: center;
                    margin: 20px auto;
                    width: 174px;
                    border: 2px solid #e1261c;
                    border-radius: 20px;
                    line-height: 28px;
                }
                .iplmorebtn span {
                    position: relative;
                    color: #eb3d3c;
                    font-size: 14px;
                    padding-right: 18px;
                    font-weight: 700;
                }
                .iplmorebtn span:before {
                    height: 1px;
                    width: 10px;
                    background: #eb3d3c;
                    top: 8px;
                    right: 0;
                }
                .iplmorebtn span:after, .iplmorebtn span:before {
                    content: "";
                    position: absolute;
                }
                .iplmorebtn span:after {
                    width: 6px;
                    height: 6px;
                    border-top: 1px solid #eb3d3c;
                    border-right: 1px solid #eb3d3c;
                    transform: rotate(45deg);
                    top: 5px;
                    right: 0;
                }
            `}</style>
        </>
    );

};

export default TopStoryWidgetMobile;
