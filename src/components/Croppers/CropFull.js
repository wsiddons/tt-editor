import React, {useState, useRef, useEffect} from 'react'
import { UseCtx } from "../../contexts/Context";

function CropFull() {

  const videoRef = useRef(null)
  const cropRef = useRef(null)

  const [mouseDown, setMouseDown] = useState(false)
  const [initialMouse, setInitialMouse] = useState({x: 0, y: 0})
  const [initialCropPos, setInitialCropPos] = useState({left: 0, top: 0})
  const [cropPos, setCropPos] = useState({left: 10, top: 10})

  const [maxPos, setMaxPos] = useState({left: null, top: 0})

  const [resizing, setResizing] = useState(false)
  const [cropWidth, setCropWidth] = useState({width: 200, height: 200 * (16/9)})
  const [initialCropWidth, setInitialCropWidth] = useState(cropWidth.width)

  const [videoContainerHeight, setVideoContainerHeight] = useState(0)

  const [staticVid, setStaticVid] = useState(null)

  useEffect(() => {
    setStaticVid(URL.createObjectURL(currentVideo))
    setVideoEle(videoRef)
  }, [])

  const {
    currentVideo,
    botCrop,
    setBotCrop,
    botPos,
    setBotPos,
    startTime,
    endTime,
    outputVideo,
    setFileName,
    videoEle,
    setVideoEle
  } = UseCtx()

  const onMouseDown = (e) => {
    setMouseDown(true)
    setInitialCropPos({left: cropPos.left, top: cropPos.top})
    setInitialMouse({x: e.clientX, y: e.clientY})
    
    if (e.target.id === 'resizer') {
      setResizing(true)
      setInitialCropWidth(cropWidth.width)
      document.body.style.cursor = 'nwse-resize'
    }
  }

  const onMouseMove = (e) => {
    const mouseX = e.clientX - initialMouse.x
    const mouseY = e.clientY - initialMouse.y
    const cropBounds = cropRef.current.getBoundingClientRect()
    const videoBounds = videoRef.current.getBoundingClientRect()
    if (mouseDown && resizing === true) {
          setCropWidth({width: initialCropWidth + ((mouseX + mouseY) * 1.618), height: cropWidth.width * (16/9)})
          setBotCrop({width: cropWidth.width, height: cropWidth.width * (16/9)})
      }
    if (mouseDown && resizing === false) {
      //protect top left corner
      if (initialCropPos.left + mouseX < videoRef.current.offsetLeft && initialCropPos.top + mouseY < videoRef.current.offsetTop) {
        setCropPos({left: videoRef.current.offsetLeft, top: videoRef.current.offsetTop})
        setBotPos({x: cropPos.left, y: cropPos.top})
      }
      //protect top right corner
      else if ((initialCropPos.left + cropBounds.width) + mouseX > videoBounds.width && initialCropPos.top + mouseY < videoRef.current.offsetTop) {
        setCropPos({left: videoBounds.width - cropBounds.width, top: videoRef.current.offsetTop})
        setBotPos({x: cropPos.left, y: cropPos.top})
      }
      //protect bottom left corner
      else if (initialCropPos.left + mouseX < videoRef.current.offsetLeft && (initialCropPos.top + cropBounds.height) + mouseY > videoBounds.height) {
        setCropPos({left: videoRef.current.offsetLeft, top: videoBounds.height - cropBounds.height})
        setBotPos({x: cropPos.left, y: cropPos.top})
      }
      //protect bottom right corner
      else if ((initialCropPos.left + cropBounds.width) + mouseX > videoBounds.width && (initialCropPos.top + cropBounds.height) + mouseY > videoBounds.height) {
        setCropPos({left: videoBounds.width - cropBounds.width, top: videoBounds.height - cropBounds.height})
        setBotPos({x: cropPos.left, y: cropPos.top})
      }
      //protect left bounds
      else if (initialCropPos.left + mouseX < videoRef.current.offsetLeft) {
        setCropPos({left: videoRef.current.offsetLeft, top: initialCropPos.top + mouseY})
        setBotPos({x: cropPos.left, y: cropPos.top})
      } 
      //protect right bounds
      else if ((initialCropPos.left + cropBounds.width) + mouseX > videoBounds.width) {
        setCropPos({left: videoBounds.width - cropBounds.width, top: initialCropPos.top + mouseY})
        setBotPos({x: cropPos.left, y: cropPos.top})
      } 
      //protect top bounds
      else if (initialCropPos.top + mouseY < videoRef.current.offsetTop) {
        setCropPos({left: initialCropPos.left + mouseX, top: videoRef.current.offsetTop})
        setBotPos({x: cropPos.left, y: cropPos.top})
      }
      //protect bottom bounds 
      else if ((initialCropPos.top + cropBounds.height) + mouseY > videoBounds.height) {
        setCropPos({left: initialCropPos.left + mouseX, top: videoBounds.height - cropBounds.height})
        setBotPos({x: cropPos.left, y: cropPos.top})
      }
      
      else {
        setCropPos({left: initialCropPos.left + mouseX, top: initialCropPos.top + mouseY})
        setBotPos({x: cropPos.left, y: cropPos.top})
        console.log(botPos)
      }
    }
  
  }

  const onMouseUp = (e) => {
    const cropBounds = cropRef.current.getBoundingClientRect()
    const videoBounds = videoRef.current.getBoundingClientRect()

    setMouseDown(false)
    setResizing(false)
    setBotPos({x: cropPos.left, y: cropPos.top})
    console.log(botPos)
    document.body.style.cursor = 'default'

    if(cropBounds.height > videoBounds.height) {
        setCropWidth({width: (videoBounds.height - 4) * (9/16), height: videoBounds.height - 4})
        setBotCrop({width: (videoBounds.height - 4) * (9/16), height: videoBounds.height - 4})
    }
  }

    const videoStyle = {
    maxWidth: '100%',
    // maxheight: '228px',
  }

  const cropperStyle = {
    position: 'absolute',
    border: '2px solid #F2507B',
    left: cropPos.left + 'px',
    top: cropPos.top + 'px',
    width: cropWidth.width + 'px',
    height: cropWidth.width * (16/9) + 'px',    
    // maxHeight: (videoContainerHeight - 8) + 'px',
    // maxWidth: ((videoContainerHeight - 8) * (9/16)) + 'px',
    aspectRatio: '9/16',
    zIndex: '10'
  }

  const resizerStyle = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    right: '-10px',
    bottom: '-10px',
    backgroundColor: '#F2507B',
    borderRadius: '20px',
    cursor: 'nwse-resize',
    zIndex: '5'
  }

  return (
    <div 
      style={{
        position: 'relative', 
        overflow: 'hidden', 
        height: '100%', 
        maxHeight: videoContainerHeight,
        margin: '3vh',
        outline: '4px solid #8762D9'
    }}
      onLoadedData={() => setVideoContainerHeight(videoRef.current.offsetHeight)}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      > 
        <video 
          ref={videoRef}
          style={videoStyle} 
          src={staticVid} 
          controls={true}
        />
        <div 
          ref={cropRef}
          onMouseDown={onMouseDown}
          style={cropperStyle}
        >
          <div 
            id='resizer'
            style={resizerStyle}
            >
          </div>
        </div>
      </div>
  )
}

export default CropFull