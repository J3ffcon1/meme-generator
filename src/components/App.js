import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      selected: 'default',
      name: 'Portland',
      color: '#000000',
      image: 'https://ww2.kqed.org/wp-content/uploads/sites/12/2018/01/Portlandia-Candace-and-Toni-Feminist-City-Bookstore-web-1180x664.jpg'
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
    const { selected, name, color, image } = this.state;

    return (
      <main>
        <h1>Build Your Dank Meme</h1>
        <section>
          <div>
            <label>
                Add Header:
              <input
                type="header"
                onChange = {event => this.handleNameChange(event)} />
                            
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