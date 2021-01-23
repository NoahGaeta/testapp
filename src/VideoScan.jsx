import React, { Component } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export default class VideoScan extends Component {
    constructor(props) {
        super(props);
        this.reader = new BrowserMultiFormatReader();
        this.videoRef = React.createRef();
        this.state = {
            videoSrc: undefined
        }
    }

    componentDidMount() {
        this.mounted = true;
        navigator.getUserMedia({video: true}, this.handleVideo.bind(this), this.handleFailure.bind(this));
    }

    componentWillUnmount() {
        console.log('Unmounting');
        this.mounted = false;
        this.stream.getTracks().forEach((track) => track.stop());
    }

    handleVideo(stream) {
        console.log(stream)
        this.stream = stream;
        const elem = document.getElementById('video');
        elem.srcObject = stream;
        this.scanLoop();
    }

    handleFailure(err) {
        console.warn(err);
    }

    async scanLoop() {
        this.reader.decodeFromVideoElementContinuously(this.videoRef.current, (resultDecode) => { 
            if(resultDecode) {
                this.props.updateDetectedCode(resultDecode.getText());
            }
        });
    }

    render() {
        return (
            <div>
                <video 
                    ref={this.videoRef}
                    src={this.state.videoSrc}
                    id='video'
                />
            </div>
        );
    }
}