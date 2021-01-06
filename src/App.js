import React from 'react';
import './App.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import list from './list.json'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      hide: true,
      number: 0,
    };
  }

  handletext = (e) => {
    this.setState({
      text: e.target.value,
      hide: false
    })
    console.log("length", this.state.text.length);
  }

  render() {

    const filtereditem = list.filter(country => {
      return country.name.indexOf(this.state.text) !== -1 || country.name.toLowerCase().indexOf(this.state.text.toLowerCase()) !== -1 || country.id.toLowerCase().indexOf(this.state.text.toLowerCase()) !== -1 || country.address.toLowerCase().indexOf(this.state.text.toLowerCase()) !== -1 || country.pincode.toLowerCase().indexOf(this.state.text.toLowerCase()) !== -1 || country.items.indexOf(this.state.text) !== -1;
    });
    console.log("filtered ", this.state.text);
    return (
      <div className="autosearch">
        <header className="App-header">
          <div className="serch_section">
            <div className="input-section">
             <span className="glass">&#x1F50D;</span>
             {/* <span className="close">&#x2715;</span> */}
            <input 
              className="filter-input"
              type="search"
              value={this.state.text}
              onChange={this.handletext}
              placeholder="Search users by ID, address,name.."
            />
            </div>
            <div className="search-div" hidden={this.state.hide || this.state.text.length === 0}>
              {filtereditem.map((contact) => {
                return (
                  <div className="search-section">
                    <h6>name:{contact.name}</h6>
                    <h6 className="user_i">id:{contact.id}</h6>
                    <h6>address:{contact.address}</h6>
                  </div>
                )
              })}
            </div>
            {filtereditem.length === 0 ? <div className="no-result-found">
              <p>No User Found</p>
            </div> : null}

          </div>

        </header>
      </div>
    );
  }
}
export default App;
