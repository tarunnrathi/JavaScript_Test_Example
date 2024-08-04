import React, { useState } from "react";
import { scrollToTarget } from "includes/article.util";

const KeyEvents = ({ data = [], isAmp = false }) => {
  const [showEvent, setShowEvent] = useState(false);

  const toggleEvent = () => {
    setShowEvent(!showEvent);
  };

  const arr = (data.filter((post) => post?.is_highlight == 1)) || [];
  if (!arr.length) {
    return null;
  }

  return (
    <div>
      <div className="keyEvents" id="keyEvents">
        {isAmp ? (
          <div>
            <button
              className="keyEventsHead"
              data-amp-bind-class="keyEventShow? 'keyEventsHead active':'keyEventsHead'"
              on="tap:AMP.setState({keyEventShow: !keyEventShow})"
              // on="tap:keyEventsHead.toggleClass(class='active')"
              // className={showEvent ? "keyEventsHead" : "keyEventsHead active"}
            >
              <span>:: key events</span>
              <div className="icon"></div>
            </button>
            <ul
              // id="keyEventsContent"
              // className={
              //   showEvent ? "keyEventsContent active" : "keyEventsContent"
              // }
              className="keyEventsContent"
              data-amp-bind-class="keyEventShow ? 'keyEventsContent active' : 'keyEventsContent'"
            >
              {arr && arr.map((post) => {
                    return (
                      <li>
                        <a
                          on={`tap:AMP.scrollTo(id='${post?.id}', position='center')`}
                        >
                          {post?.blog_title}
                        </a>
                      </li>
                    );
                  })}
            </ul>
          </div>
        ) : (
          <div>
            <div
              onClick={toggleEvent}
              className={showEvent ? "keyEventsHead" : "keyEventsHead active"}
            >
              <span>:: key events</span>
              <div className="icon"></div>
            </div>
            <ul
              id="keyEventsContent"
              className={
                showEvent ? "keyEventsContent active" : "keyEventsContent"
              }
            >
              {arr && arr.map((post) => {
                    return (
                      <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToTarget(post?.id);
                          }}
                          href={`#${post?.id}`}
                        >
                          {post?.blog_title}
                        </a>
                      </li>
                    );
                  })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyEvents;
