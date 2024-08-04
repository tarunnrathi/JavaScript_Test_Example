import { scrollToTarget } from "../../../includes/article.util";

const KeyEvents = ({ data =[] }) => {
  const arr = (data.filter((post) => post?.is_highlight == 1)) || [];
  if (!arr.length) {
    return null;
  }
  return (
    <div>
      <div className="key_event">
        <p className="key_event_title">live blog key events</p>
        <span className="events_title">Key Events</span>
        <ul className="key_event_list">
          {arr && arr.map((post) => {
            return (
              <li>
                <a onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(post?.id);
                }} href={`#${post?.id}`}>{post?.blog_title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default KeyEvents;
