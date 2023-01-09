import React, {useState, useRef, useEffect} from 'react'
import { UseCtx } from "../../contexts/Context";

function CropCam() {

  const videoRef = useRef(null)
  const cropRef = useRef(null)
  const cropRef2 = useRef(null)

  const [selectCrop, setSelectCrop] = useState('')

  const [mouseDown, setMouseDown] = useState(false)
  const [initialMouse, setInitialMouse] = useState({x: 0, y: 0})
  const [initialCropPos, setInitialCropPos] = useState({left: 0, top: 0})
  const [cropPos, setCropPos] = useState({left: 10, top: 10})

  const [resizing, setResizing] = useState(false)
  const [cropWidth, setCropWidth] = useState({width: 100 * (341 / 202), height: 100 })
  const [initialCropWidth, setInitialCropWidth] = useState(cropWidth.width)

  //other crop
  const [cropPos2, setCropPos2] = useState({left: 10, top: 10})
  const [cropWidth2, setCropWidth2] = useState({width: 200 * (341 / 202), height: 200 })
  const [initialCropPos2, setInitialCropPos2] = useState({left: 0, top: 0})
  const [initialCropWidth2, setInitialCropWidth2] = useState(cropWidth2.width)


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
    topCrop,
    setTopCrop,
    topPos,
    setTopPos,
    startTime,
    endTime,
    outputVideo,
    setFileName,
    videoEle,
    setVideoEle
  } = UseCtx()

  const onMouseDownCam = (e) => {
    setSelectCrop('cam')
    setMouseDown(true)
    setInitialCropPos({left: cropPos.left, top: cropPos.top})
    setInitialMouse({x: e.clientX, y: e.clientY})
    
    if (e.target.id === 'resizer') {
      setResizing(true)
      setInitialCropWidth(cropWidth.width)
      document.body.style.cursor = 'nwse-resize'
    }
  }

  const onMouseDownFocus = (e) => {
    setSelectCrop('focus')
    setMouseDown(true)
    setInitialCropPos2({left: cropPos2.left, top: cropPos2.top})
    setInitialMouse({x: e.clientX, y: e.clientY})
    
    if (e.target.id === 'resizer') {
      setResizing(true)
      setInitialCropWidth2(cropWidth2.width)
      document.body.style.cursor = 'nwse-resize'
    }
  }

  const onMouseMove = (e) => {
    const mouseX = e.clientX - initialMouse.x
    const mouseY = e.clientY - initialMouse.y
    const cropBounds = cropRef.current.getBoundingClientRect()
    const cropBounds2 = cropRef2.current.getBoundingClientRect()
    const videoBounds = videoRef.current.getBoundingClientRect()
    if (selectCrop === 'cam') {
        if (mouseDown && resizing === true) {
            setCropWidth({width: initialCropWidth + ((mouseX + mouseY) * 1.618), height: cropWidth.width * (16/9)})
            // setBotCrop({width: cropWidth.width, height: cropWidth.width * (341 / 202)})
        }
      if (mouseDown && resizing === false) {
        //protect top left corner
        if (initialCropPos.left + mouseX < videoRef.current.offsetLeft && initialCropPos.top + mouseY < videoRef.current.offsetTop) {
          setCropPos({left: videoRef.current.offsetLeft, top: videoRef.current.offsetTop})
        }
        //protect top right corner
        else if ((initialCropPos.left + cropBounds.width) + mouseX > videoBounds.width && initialCropPos.top + mouseY < videoRef.current.offsetTop) {
          setCropPos({left: videoBounds.width - cropBounds.width, top: videoRef.current.offsetTop})
        }
        //protect bottom left corner
        else if (initialCropPos.left + mouseX < videoRef.current.offsetLeft && (initialCropPos.top + cropBounds.height) + mouseY > videoBounds.height) {
          setCropPos({left: videoRef.current.offsetLeft, top: videoBounds.height - cropBounds.height})
        }
        //protect bottom right corner
        else if ((initialCropPos.left + cropBounds.width) + mouseX > videoBounds.width && (initialCropPos.top + cropBounds.height) + mouseY > videoBounds.height) {
          setCropPos({left: videoBounds.width - cropBounds.width, top: videoBounds.height - cropBounds.height})
        }
        //protect left bounds
        else if (initialCropPos.left + mouseX < videoRef.current.offsetLeft) {
          setCropPos({left: videoRef.current.offsetLeft, top: initialCropPos.top + mouseY})
        } 
        //protect right bounds
        else if ((initialCropPos.left + cropBounds.width) + mouseX > videoBounds.width) {
          setCropPos({left: videoBounds.width - cropBounds.width, top: initialCropPos.top + mouseY})
        } 
        //protect top bounds
        else if (initialCropPos.top + mouseY < videoRef.current.offsetTop) {
          setCropPos({left: initialCropPos.left + mouseX, top: videoRef.current.offsetTop})
        }
        //protect bottom bounds 
        else if ((initialCropPos.top + cropBounds.height) + mouseY > videoBounds.height) {
          setCropPos({left: initialCropPos.left + mouseX, top: videoBounds.height - cropBounds.height})
        }

        else {
          setCropPos({left: initialCropPos.left + mouseX, top: initialCropPos.top + mouseY})
        }
      }
    }

    if (selectCrop === 'focus') {
        if (mouseDown && resizing === true) {
            setCropWidth2({width: initialCropWidth2 + ((mouseX + mouseY) * 1.618), height: cropWidth2.width * (16/9)})
            // setTopCrop({width: cropWidth2.width, height: cropWidth2.width * (341 / 405)})
        }
      if (mouseDown && resizing === false) {
        //protect top left corner
        if (initialCropPos2.left + mouseX < videoRef.current.offsetLeft && initialCropPos2.top + mouseY < videoRef.current.offsetTop) {
          setCropPos2({left: videoRef.current.offsetLeft, top: videoRef.current.offsetTop})
        }
        //protect top right corner
        else if ((initialCropPos2.left + cropBounds.width) + mouseX > videoBounds.width && initialCropPos2.top + mouseY < videoRef.current.offsetTop) {
          setCropPos2({left: videoBounds.width - cropBounds.width, top: videoRef.current.offsetTop})
        }
        //protect bottom left corner
        else if (initialCropPos2.left + mouseX < videoRef.current.offsetLeft && (initialCropPos2.top + cropBounds.height) + mouseY > videoBounds.height) {
          setCropPos2({left: videoRef.current.offsetLeft, top: videoBounds.height - cropBounds.height})
        }
        //protect bottom right corner
        else if ((initialCropPos2.left + cropBounds2.width) + mouseX > videoBounds.width && (initialCropPos2.top + cropBounds.height) + mouseY > videoBounds.height) {
          setCropPos2({left: videoBounds.width - cropBounds2.width, top: videoBounds.height - cropBounds2.height})
        }
        //protect left bounds
        else if (initialCropPos2.left + mouseX < videoRef.current.offsetLeft) {
          setCropPos2({left: videoRef.current.offsetLeft, top: initialCropPos2.top + mouseY})
        } 
        //protect right bounds
        else if ((initialCropPos2.left + cropBounds2.width) + mouseX > videoBounds.width) {
          setCropPos2({left: videoBounds.width - cropBounds2.width, top: initialCropPos2.top + mouseY})
        } 
        //protect top bounds
        else if (initialCropPos2.top + mouseY < videoRef.current.offsetTop) {
          setCropPos2({left: initialCropPos2.left + mouseX, top: videoRef.current.offsetTop})
        }
        //protect bottom bounds 
        else if ((initialCropPos2.top + cropBounds2.height) + mouseY > videoBounds.height) {
          setCropPos2({left: initialCropPos2.left + mouseX, top: videoBounds.height - cropBounds2.height})
        }

        else {
          setCropPos2({left: initialCropPos2.left + mouseX, top: initialCropPos2.top + mouseY})
        }
      }
    }
        
  
  }

  const onMouseUp = (e) => {
    const cropBounds = cropRef.current.getBoundingClientRect()
    const videoBounds = videoRef.current.getBoundingClientRect()

    setMouseDown(false)
    setResizing(false)
    setSelectCrop('')

    setBotPos({x: cropPos.left, y: cropPos.top})
    setTopPos({x: cropPos2.left, y: cropPos2.top})

    setBotCrop({width: parseInt(cropRef.current.style.width), height: parseInt(cropRef.current.style.height)})
    setTopCrop({width: parseInt(cropRef2.current.style.width), height: parseInt(cropRef2.current.style.height)})

    console.log(botPos, topPos)
    console.log(botCrop, topCrop)

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
    border: '4px solid #F2507B',
    left: cropPos.left + 'px',
    top: cropPos.top + 'px',
    width: cropWidth.width * (341 / 202) + 'px',
    height: cropWidth.width + 'px',    
    // maxHeight: (videoContainerHeight - 8) + 'px',
    // maxWidth: ((videoContainerHeight - 8) * (9/16)) + 'px',
    aspectRatio: '9/16',
    zIndex: '4'
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

  const cropperStyle2 = {
    position: 'absolute',
    border: '4px solid #F2507B',
    left: cropPos2.left + 'px',
    top: cropPos2.top + 'px',
    width: cropWidth2.width * (341 / 405) + 'px',
    height: cropWidth2.width + 'px',    
    // maxHeight: (videoContainerHeight - 8) + 'px',
    // maxWidth: ((videoContainerHeight - 8) * (9/16)) + 'px',
    aspectRatio: '9/16',
    zIndex: '4'
  }

  const resizerStyle2 = {
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
        margin: '4vh 6vw',
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
          onMouseDown={onMouseDownCam}
          style={cropperStyle}
        >
          <div 
            id='resizer'
            style={resizerStyle}
            >
          </div>
        </div>

        <div 
          ref={cropRef2}
          onMouseDown={onMouseDownFocus}
          style={cropperStyle2}
        >
          <div 
            id='resizer'
            style={resizerStyle2}
            >
          </div>
        </div>
      </div>
  )
}

export default CropCam