import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCtx } from "../../../contexts/Context";
import { useFfmpeg } from "../../../hooks/useFfmpeg";
import CropFull from "../../Croppers/CropFull";
import CropFullHeight from "../../Croppers/CropFullHeight";
import Trim from "../../Trim/Trim";
import OutputModal from "../K3Template/OutputModal";

function FullHeightTemplate() {
  const video = useRef(null);
  const canvas = useRef(null);

  const navigate = useNavigate();

  const [staticVid, setStaticVid] = useState(null);
  const [torf, setTorf] = useState(false);
  const [overlay, setOverlay] = useState(null);

  const [botCropWidth, setBotCropWidth] = useState(window.innerWidth / 10);

  const { fullHeightify } = useFfmpeg();

  const {
    currentVideo,
    botCrop,
    botPos,
    startTime,
    endTime,
    outputVideo,
    setFileName,
    videoEle
  } = UseCtx();

  useEffect(() => {
    if (currentVideo === null) {
      navigate("/menu");
    }
    setStaticVid(URL.createObjectURL(currentVideo));
    setBotCropWidth(window.innerWidth / 7);
  }, []);

  const makeClip = async () => {
    await fullHeightify(
      videoEle,
      currentVideo,
      overlay,
      botCrop,
      botPos,
      startTime,
      endTime
    );
    setTorf(true);
  };

  const testStyle = {
    position: "absolute",
    top: "0px",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      {outputVideo === null ? <></> : <OutputModal />}
      <>
        {/* <Nav /> */}
        <div className="video-edit-container">
          <div style={testStyle}></div>
          <div className="control-container">
            <CropFull /> 
            <Trim />
            <div className="button-container">
              <div className="left-buttons">
                <div>
                  <h3>Change File Name</h3>
                  <input
                    onChange={(e) => setFileName(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div className="right-buttons">
                <h3 onClick={async () => await makeClip()}>Create Video</h3>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default FullHeightTemplate;
