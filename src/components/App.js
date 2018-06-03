import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      header: 'When someone walks in',
      footer: 'And you know they\'re going to offend you.',
      image: 'http://i0.kym-cdn.com/photos/images/original/000/045/900/lsp.PNG',
      color: '#000000'
    };
  }

  handleNameChange({ target }) {
    this.setState({ name: target.value });
  }

  handleColorChange({ target }) {
    this.setState({ color: target.value });
  }

  handleImageSrc({ target }) {
    this.setState({ image: target.value });
  }
  handleHeaderChange({ target }) {
    this.setState({ header: target.value });
  }
  handleFooterChange({ target }) {
    this.setState({ footer: target.value });
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
      fileSaver.saveAs(blob, 'dankmeme.png');
    });
  }

  render() {
    const { header, footer, image } = this.state;

    return (
      <main>
        <h1>Build Your Dank Meme</h1>
        <section>
          <div id = "form-data">
            <label>

              Add Header:
              <input
                type="text"
                value={header}
                onChange={event => this.handleHeaderChange(event)} />
            </label>
            <label>
              Add Footer:
              <input
                type="text"
                value={footer}
                onChange={event => this.handleFooterChange(event)} />
            </label>
            <label>

              Image URL:
              <input
                type="url"
                value={image}
                onChange={event => this.handleImageSrc(event)} />
            </label>
            <label>
              Upload Image:
              <input
                type="file"
                onChange={event => this.handleUpload(event)} />
            </label>
            <label>
              <br />
            Change Text-Color:
              <input
                type="text"
                onChange={event => this.handleColorChange(event)} />
            </label>
            <label>
              <br />
              Change Font-style:
              <input
                type="text"
                onChange={event => this.handleFontChange(event)} />
            </label>
          </div>



          <div className="image-container"
            ref={node => this.imageExport = node}>
            <div id="upper-meme">{header}</div>
            <img src={image} />
            <div id="lower-meme">{footer}</div>
          </div>

          <div id="export-button">
            <button onClick={() => this.handleExport()}>
              Export Meme
            </button>

          </div>
        </section>
      </main>
    );


  }

}