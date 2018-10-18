import React from "react";
import { QRCode } from 'react-qr-svg';

const QR_BG_COLOR = "#FFFFFF";
const QR_FG_COLOR = "#000000";

class Writer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      qrText: "Enter QR contents here...",
      level: "L",
    };
    this.updateQrText = this.updateQrText.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
  }

  updateQrText (e){
    e.preventDefault();
    this.setState({ ...this.state, qrText: e.target.value });
  }

  updateLevel (e){
    e.preventDefault();
    this.setState({ ...this.state, level: e.target.value });
  }


  render() {
    const {
      state,
      updateQrText,
      updateLevel,
    } = this;

    return (
      <div>
        <textarea 
          onChange={updateQrText} 
          type="text" 
          value={state.qrText}
          style={{ width: "60%", minWidth: 400 }}
        />
        <div>
          <a 
            href="https://en.wikipedia.org/wiki/QR_code#Error_correction" 
            target="_blank"
            rel="noopener noreferrer"
          >Error Correction Level</a>
        </div>
        <div>
          <select onChange={updateLevel}>
            <option value="L">Level L (Low) 7% of codewords can be restored.</option>
            <option value="M">Level M (Medium) 15% of codewords can be restored.</option>
            <option value="Q">Level Q (Quartile) 25% of codewords can be restored.</option>
            <option value="H">Level H (High) 30% of codewords can be restored.</option>
          </select>
        </div>
        <div>
          <QRCode
            bgColor={QR_BG_COLOR}
            fgColor={QR_FG_COLOR}
            level={state.level}
            style={{ width: "60%", minWidth: 400 }}
            value={state.qrText}
          />
        </div>
      </div>
    );
  }
}

export default Writer;