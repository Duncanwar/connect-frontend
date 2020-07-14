import React from 'react'
class Upload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      value:''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      value:''
    })
  }
  render() {
    return (
      <div>
        <input type="file"  onChange={this.handleChange} value={this.state.value } title=" "/>
        <img src={this.state.file}/>
      </div>
    );
  }
}
export default Upload