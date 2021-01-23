import React, { Component } from 'react';
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat } from '@zxing/library';

export default class ImageUploader extends Component {
    constructor(props) {
        super(props);
    }

    scan(file) {
        const reader = new FileReader();
        reader.onload = (fileUpload) => {
            console.log('FILE', fileUpload)
            const hints = new Map();
            hints.set(DecodeHintType.PURE_BARCODE);
            const decoder = new BrowserMultiFormatReader(hints);
            decoder.decodeFromImage(undefined, fileUpload.target.result).then((decodeResult) => {
                this.props.updateDetectedCode(decodeResult.getText());
            }).catch((err) => {
                console.warn(err);
            });
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <input
                    type='file'
                    onChange={(event) => {
                        this.scan(event.target.files[0]);
                    }}
                /> 
            </div>
        );
    }
}
