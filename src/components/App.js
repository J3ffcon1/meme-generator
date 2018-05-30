import React, { Component } from 'react';
import cowsay from 'cowsay-browser';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

let cows = null;
cowsay.list((err, _cows) => {
  cows = _cows;
});

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      cows,
      selected: 'default',
      name: 'Portland',
      color: '#000000',
      image: null
    };
  }

  handleNameChange({ target }) {
    this.setState({ name: target.value });
  }

  handleColorChange({ target }) {
    this.setState({ color: target.value });
  }

  handleCowChange({ target }) {
    this.setState({ selected: target.value });
  }

  handleImageSrc({ target }) {
    this.setState({ image: target.value });
  }

  handleUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  }

  handleExport() {
    dom2image.toBlob(this.imageExport).then(blob => {
      fileSaver.saveAs(blob, 'cute-image.png');
    });
  }

  render() {
    const { cows, selected, name, color, image } = this.state;

    return (
      <main>
        <h1>Enter Your Meme</h1>
        <section>
          <div>
            <label>
                            Image URL:
              <input onChange={event => this.handleImageSrc(event)} />
                            Upload Image:
              <input
                type="file"
                onChange={event => this.handleUpload(event)}
              />
            </label>
          </div>


          <div className="image-container"
            ref={node => this.imageExport = node}
          >
            {/* <h1>Thats a Dank meme!</h1> */}
            <img src={image} />
          </div>
        </section>
        <div id ="export-button">
          <button onClick={() => this.handleExport()}>
                            Export Meme
          </button>
        </div>
      </main>
    );


  }

}