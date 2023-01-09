import React from 'react'
import { UseCtx } from '../../../contexts/Context'

function OutputModal() {
    const {outputVideo, fileName, setOutputVideo, loadingText, setLoading} = UseCtx()

    const newClip = () => {
      setLoading(false)
      setOutputVideo(null)
    }
    
  return (
    <div className='video-container-style'>
     <video 
        controls={true}
        src={outputVideo}
        width='228px'
        height='405px'
        autoPlay={false}
      />
      <div >
        {outputVideo === null ? <a>{loadingText}.</a> 
        :
        <>
        <>
        <a href={outputVideo} target='_blank' download={`${fileName}`}>download {fileName}.mp4</a>
        </>
        <>
        <button onClick={newClip}>make another</button>
        </>
        </>
        }
      </div>
      </div>
  ) 
}

export default OutputModal