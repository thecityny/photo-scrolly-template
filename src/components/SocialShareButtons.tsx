import React from "react";
import { SocialIcon } from "react-social-icons";

const getShareUrls = () => {
  const shareUrl = `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_SLUG}/`;
  return [
    `https://twitter.com/intent/tweet?text=${shareUrl}`,
    `https://www.facebook.com/sharer/sharer.php?u${shareUrl}`,
    `mailto:?subject=${process.env.REACT_APP_SITE_NAME}&body=Check out this new story: ${shareUrl}`,
  ];
};

export const SocialShareButtons = () => (
  <div
    className="eyebrow mb-2"
    style={{
      opacity: 0.7,
    }}
  >
    Share:{" "}
    {getShareUrls().map((url, i) => (
      <SocialIcon
        key={i}
        className="mr-2"
        target="_blank"
        rel="noopener noreferrer"
        bgColor="#FFFFFF"
        style={{ width: "1.2rem", height: "1.2rem" }}
        url={url}
      />
    ))}
  </div>
);
