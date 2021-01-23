import logo from './logo.svg';
import './App.css';
import ImageUpload from './ImageUpload';
import VideoScan from './VideoScan';
import { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageSelected: false,
      detectedCode: undefined
    }
  }

  updateDetectedCode(detectedCode) {
    this.setState({ detectedCode });
  }

  render() {
    return (
      <div className="App">
        <div style={{padding: 50}}>
          <button onClick={() => {
            this.setState({ imageSelected: !this.state.imageSelected, detectedCode: undefined })
          }}
          >
            Toggle Selection
          </button>
        </div>
        {this.state.imageSelected ? (
          <ImageUpload
            updateDetectedCode={this.updateDetectedCode.bind(this)}
          />
        ) : (
          <VideoScan
            updateDetectedCode={this.updateDetectedCode.bind(this)}
          />
        )}

        {this.state.detectedCode && (
            <div style={{padding: 50}}>
                <h1>Detected Code:</h1>
                <p>${this.state.detectedCode}</p>
            </div>
        )}
      </div>
    )
  }
}
