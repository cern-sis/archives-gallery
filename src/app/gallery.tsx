import LightGallery from "lightgallery/react";
import exifr from "exifr";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgVideo from "lightgallery/plugins/video";
import lgZoom from "lightgallery/plugins/zoom";
import { api } from "@/utils/api";
import { useState } from "react";

export const Gallery = ({ imagesSrc }) => {
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const output = await exifr.parse(arrayBuffer);
      // output - Should be metadata of the image
    } catch (error) {
      console.error("Error fetching or parsing image:", error);
    }
  };
  const onInit = () => {
    console.log("lightGallery has been initialized");
    console.log(imagesSrc);
  };

  return (
    <div className="App" class="bg-red-500">
      <div>
        <LightGallery
          plugins={[lgZoom, lgVideo]}
          mode="lg-fade"
          pager={false}
          thumbnail={true}
          galleryId={"library"}
          autoplayFirstVideo={false}
          elementClassNames={"gallery"}
        >
          {imagesSrc.map((imageSrc, index) => {
            handleFileChange(new URL(imageSrc, api).toString())
            return (
              <a key={index} href={new URL(imageSrc, api).toString()}>
                <img
                  alt={`Gallery item ${index}`}
                  src={new URL(imageSrc, api).toString()}
                  style={{
                    width: "25%",
                    height: "25vh",
                    border: " 1vh solid black",
                    padding: "1vh",
                    backgroundColor: "white",
                  }}
                />
              </a>
            );
          })}
        </LightGallery>
      </div>
    </div>
  );
};
