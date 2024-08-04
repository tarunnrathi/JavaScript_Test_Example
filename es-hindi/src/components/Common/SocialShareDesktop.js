import React from "react";

const SocialShare = ({ url, headline }) => (
  <div className="newphtshare">
    <a
      href={"https://www.facebook.com/sharer.php?u=" + url + "&t=" + headline}
      target="_blank"
      className="forfb"
    >
      <span className="newiconsprite newfb"></span>
    </a>
    <a
      href={"https://twitter.com/share?text=" + headline + "&url=" + url}
      target="_blank"
      className="fortwtr"
    >
      <span className="newiconsprite newtwtr"></span>
    </a>
    <a
      href={"https://web.whatsapp.com/send?text=" + headline + " - " + url}
      target="_blank"
      className="forwtap"
    >
      <span className="newiconsprite newwtap"></span>
    </a>
  </div>
);
export default SocialShare;
