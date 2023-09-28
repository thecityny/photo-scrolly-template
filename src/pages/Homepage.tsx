import React from "react";
import { PageLayout } from "../components/PageLayout";
import parse from "html-react-parser";
import { pageContent } from "../page-content";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "../styles/app.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { OutboundLink } from "src/components/OutboundLink";
import { VideoContainer } from "src/components/Video";
import classnames from "classnames";
import { SocialShareButtons } from "src/components/SocialShareButtons";

type Author = {
  name: string;
  url: string;
};

const getDatePublished = () => {
  const timestamp = process.env.REACT_APP_PUB_DATE;
  if (!timestamp) {
    throw new Error("No publication date defined in .env file!");
  } else {
    const date = new Date(timestamp.replace(/-/g, "/"));
    const dateFormatted = date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateFormatted;
  }
};

const convertToHtml = (text: string) => {
  let formattedText = text;

  // Make links outbound:
  formattedText = formattedText.replace(
    "<a href=",
    '<a target="_blank" rel="noopener noreferrer" href='
  );

  // Fix double spaces and non-spaced commas:
  formattedText = formattedText.replace("  ", " ").replace(",", ", ");

  return parse(formattedText);
};

type Slide = {
  slideContent: string;
  photoFileName?: string;
  photoPosition?: string;
};

const Paragraph: React.FC<{ text: string }> = ({ text }) => (
  <p className="copy">{convertToHtml(text)}</p>
);

export const splitParagraphs = (content: string) =>
  content.split("{newParagraph}");

export const formatContent = (content: string) => (
  <>
    {splitParagraphs(content).map((paragraph, i) => (
      <Paragraph key={i} text={paragraph} />
    ))}
  </>
);

const { slideX, slide0, ...slideContent } = pageContent;

const introSlide = slide0 as Slide;
const slides = Object.entries(slideContent).map((entry) => entry[1]) as Slide[];

export const Homepage = () => {
  const byline = JSON.parse(process.env.REACT_APP_AUTHOR as string) as Author[];

  return (
    <PageLayout>
      <div className="app">
        <div className="scrolly-container">
          <div className="scrolly-image">
            <LazyLoadImage
              alt=""
              height="100vh"
              src={require(`../assets/images/scrolly-photos/${introSlide.photoFileName}`)}
              width="100%"
              effect="blur"
              style={{
                objectPosition: introSlide.photoPosition || "50% 50%",
              }}
            />
          </div>
          <div className="hero is-fullheight is-flex is-flex-direction-column is-justify-content-flex-end">
            <div className="landing-content mx-5">
              <h1 className="headline mb-0">Title goes here...</h1>
              <div className="deck mt-1 mb-0">
                And a subtitle could go here...
              </div>
              <div className="attribution mt-0">
                <p className="byline mt-1">
                  By{" "}
                  {byline.map((author, i) => (
                    <span key={i} className="author">
                      <OutboundLink to={author.url}>{author.name}</OutboundLink>
                      {i < byline.length - 2
                        ? ", "
                        : i < byline.length - 1
                        ? " and "
                        : ""}
                    </span>
                  ))}
                  {" | "}
                  {getDatePublished()}
                </p>
              </div>
              <SocialShareButtons />
            </div>
          </div>
        </div>

        {slides.map((slide, i) => {
          const { slideContent, photoFileName, photoPosition } = slide;

          // CASE 1: No Photo
          if (!photoFileName) {
            return (
              <React.Fragment key={i}>
                <div className="hero is-medium">
                  <div className="hero-body" />
                </div>
                <div className="hero is-fullheight">
                  <div
                    className="hero-body container"
                    style={{
                      maxWidth: "600px",
                    }}
                  >
                    {formatContent(slideContent)}
                  </div>
                </div>
                <div className="hero is-medium">
                  <div className="hero-body" />
                </div>
              </React.Fragment>
            );
          }

          // CASE 2: VIDEO
          if (photoFileName.endsWith(".mp4")) {
            return (
              <VideoContainer
                videoUrl={photoFileName}
                slideContent={slideContent}
                key={i}
              />
            );
          }

          // CASE 3: PHOTO
          return (
            <div
              key={i}
              className={classnames(
                "scrolly-container",
                "is-flex",
                "is-flex-direction-column",
                "is-justify-content-space-between",
                "is-align-items-center",
                splitParagraphs(slideContent).length > 1 && "is-doubled"
              )}
              style={{
                height: `${
                  200 + (splitParagraphs(slideContent).length || 1) * 100
                }vh`,
              }}
            >
              <div className="scrolly-image">
                <LazyLoadImage
                  alt=""
                  height="100vh"
                  src={require(`../assets/images/scrolly-photos/${photoFileName}`)}
                  width="100%"
                  effect="blur"
                  style={{
                    objectPosition: photoPosition || "50% 50%",
                  }}
                />
              </div>
              {splitParagraphs(slideContent).map((slideText, i) => (
                <div
                  className="scrolly-caption is-flex-direction-column is-justify-content-center p-3 mx-2"
                  style={{
                    marginTop: `${i + 1}00vh`,
                  }}
                  key={i}
                >
                  <Paragraph text={slideText} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
};
