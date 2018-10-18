import React from "react";
import jsQR from "jsqr";
import {
  Button,
  Panel
} from "react-bootstrap";

const BOX_COLOR = "#FF3B58";

function drawBox(location, canvas){
  drawLine(location.topLeftCorner, location.topRightCorner, canvas);
  drawLine(location.topRightCorner, location.bottomRightCorner, canvas);
  drawLine(location.bottomRightCorner, location.bottomLeftCorner, canvas);
  drawLine(location.bottomLeftCorner, location.topLeftCorner, canvas);
}

function drawLine(begin, end, canvas) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = BOX_COLOR;
  canvas.stroke();
}

class Reader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          qrText:"Click scan to get QR contents",
          stream: null,
        };
        this.startScan = this.startScan.bind(this);
        this.scanTick = this.scanTick.bind(this);
    }

    async startScan(e) {
      e.preventDefault();
      const videoElement = document.getElementById("video");

      this.state.stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment" 
        } 
      });
      videoElement.srcObject = this.state.stream;
      videoElement.setAttribute("playsinline", true);
      videoElement.play();

      requestAnimationFrame(this.scanTick);
    }

    scanTick() {
      const videoElement = document.getElementById("video");
      const canvasElement = document.getElementById("canvas");
      const canvasContext = canvasElement.getContext("2d");

      if (videoElement.readyState !== videoElement.HAVE_ENOUGH_DATA){
        return requestAnimationFrame(this.scanTick);
      }

      canvasElement.hidden = false;
      canvasElement.height = videoElement.videoHeight;
      canvasElement.width = videoElement.videoWidth;

      canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        drawBox(code.location, canvasContext);
        videoElement.pause();
        this.state.stream.getTracks().forEach((track, index) => track.stop());
        return this.setState({ ...this.state, qrText: code.data });

      } else {
        return requestAnimationFrame(this.scanTick);
      }
    }

    render() {
      const {
          state,
          startScan,
      } = this;

      return (
        <div>
          <div>
            <Button onClick={startScan}>scan</Button>
          </div>
          <video id="video" hidden></video>
          <canvas 
            id="canvas" 
            width="100%" 
            style={{ transform: "rotateY(180deg)", width: "60%", minWidth: 400 }}
            hidden
          ></canvas>
          <div>
            <Panel style={{ display: "inline-block", width: "60%", minWidth: 400 }}>
              {state.qrText}
            </Panel>
          </div>
        </div>
      );
    }
}

export default Reader;