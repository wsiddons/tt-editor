import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCtx } from "../../../contexts/Context";
import { useFfmpeg } from "../../../hooks/useFfmpeg";
import CropBot from "../../Croppers/CropBot";
import CropCam from "../../Croppers/CropCam";
import CropTop from "../../Croppers/CropTop";
import Trim from "../../Trim/Trim";
import TrimFancy from "../../Trim/TrimFancy";
import OutputModal from "./OutputModal";

function K3Template() {
  const video = useRef(null);
  const canvas = useRef(null);

  const navigate = useNavigate();

  const [staticVid, setStaticVid] = useState(null);
  const [torf, setTorf] = useState(false);
  const [overlay, setOverlay] = useState(null);

  const [topCropWidth, setTopCropWidth] = useState(window.innerWidth / 4);
  const [botCropWidth, setBotCropWidth] = useState(window.innerWidth / 7);

  const { k3Templify, k3Templifyv2 } = useFfmpeg();

  const {
    currentVideo,
    botCrop,
    topCrop,
    topPos,
    botPos,
    startTime,
    endTime,
    outputVideo,
    setFileName,
    videoEle,
    loading,
    setLoading

  } = UseCtx();

  useEffect(() => {
    if (currentVideo === null) {
      navigate("/menu");
    }
    setStaticVid(URL.createObjectURL(currentVideo));
    setTopCropWidth(window.innerWidth / 5);
    setBotCropWidth(window.innerWidth / 7);
  }, []);

  const makeClip = async () => {
    // await k3Templifyv2(
    //   videoEle,
    //   currentVideo,
    //   startTime,
    //   endTime
    // );
    setLoading(true)
    await k3Templify(
      videoEle,
      currentVideo,
      overlay,
      topCrop,
      botCrop,
      topPos,
      botPos,
      startTime,
      endTime
    )
  }

  const videoStyle = {
    maxWidth: "80%",
    margin: "5vh 0",
    outline: "4px solid #f2507b",
  };
  const canvasStyle = {
    width: "20%",
    minWidth: "300px",
    aspectRatio: "9/16",
  };

  const testStyle = {
    position: "absolute",
    top: "0px",
    display: "flex",
    justifyContent: "center",
  };
console.log(loading)
  return (
    <>
      {loading === false ? <></> : <OutputModal />}
      <>
        {/* <Nav /> */}
        <div className="video-edit-container">
          <div style={testStyle}></div>
          <div className="control-container">
            <CropCam />
            <TrimFancy />
            {/* <Trim /> */}
            <div className="button-container">
              <div className="left-buttons">
                <div>
                  <h3>Add Overlay</h3>
                  <input
                    onChange={(e) => setOverlay(e.target.files[0])}
                    type="file"
                  />
                </div>
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
                {/* <h3 onClick={() => setTorf(!torf)}>toggle modal</h3> */}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default K3Template;
