/**
 * This object contains all of the text, and names for photos/videos, for each slide of your scrolly project.
 *
 * See `slideX` for descriptions of each property and how to fill this out.
 */
export const pageContent = {
  slideX: {
    slideContent:
      "The text content for the given slide, usually a paragraph or two. In the intro slide, slide0, this text isn't shown. If the text includes more than one paragraph, just write {newParagraph} in between to split it up. Do not separate the paragraphs with line breaks.",
    photoFileName:
      "The file name of the photo that goes with the content above. The name needs to match exactly and include the suffix at the end (for example: “060223_fort_greene_interrupters_crop_1.jpg”) If left blank, the content will show up on a blank screen. (OPTIONAL)",
    photoPosition:
      "For engineers to fill out. This specifies what part of the photo should be centered on mobile. (OPTIONAL)",
  },
  slide0: {
    slideContent: "This is the intro photo to my story.",
    photoFileName: "sample-photo-1.jpg",
  },
  slide1: {
    slideContent: "Let's start out with a video.",
    photoFileName:
      "https://s3.amazonaws.com/static.thecity.nyc/video/sample-video.mp4",
  },
  slide2: {
    slideContent:
      "Then, let's show a photo. {newParagraph} And two separate paragraphs.",
    photoFileName: "sample-photo-2.jpg",
    photoPosition: "70% center",
  },
};
