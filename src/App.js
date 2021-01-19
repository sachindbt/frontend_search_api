import React from "react";
import "./App.css";
import axios from "axios";
import Select from "react-select";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      hide: true,
      hidden: false,
      number: 0,
      filtereditem: [],
      userdetail: [],
      name: null,
      address: null,
      pincode: null,
      id: null,
      item: [],
      search_text: "",
      show: false,
      getName: null,
      getItem: [],
      getaddress: null,
      getid: null,
      getpincode: null,
      mute: false,
      array: [],
      newitem: "",
    };
  }

  fetchData = async () => {
    await axios
      .get(
        `https://searchapidemo.herokuapp.com/api/user/search?search_word=${this.state.search_text}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ userdetail: response.data });
        console.log(this.state.userdetail, "......................");
        this.filterData();
      })
      .catch(console.error);
  };

  filterData = () => {
    this.state.filtereditem = this.state.userdetail.filter((country) => {
      return (
        country.name.toLowerCase().indexOf(this.state.search_text.toLowerCase()) !== -1 ||
        country.name.indexOf(this.state.search_text.toLowerCase()) !== -1 ||
        country.id
          .toLowerCase()
          .indexOf(this.state.search_text.toLowerCase()) !== -1 ||
        country.address
          .toLowerCase()
          .indexOf(this.state.search_text.toLowerCase()) !== -1 ||
        country.pincode.indexOf(this.state.search_text) !== -1 ||
        country.item.indexOf(this.state.search_text) !== -1
      );
    });

    console.log(JSON.stringify(this.state.filtereditem));


  };



  handletext = (e) => {
    this.setState({
      search_text: e.target.value,
      text: e.target.value,
      hide: false,
      hidden: true,
    });

    // after ellapse of 2 seconds
    console.log("name : " + e.target.name);
    if (e.target.name === "search_text") this.fetchData();

    console.log("length", this.state.text.length);
  };
  // ============================ADD NEW USER API=====================

  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    let obj = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address,
      pincode: this.state.pincode,
      item: this.state.item,
    };
    axios
      .post("https://searchapidemo.herokuapp.com/api/user/new", obj)
      .then((response) => {
        alert("User added successfully");
        console.log(response);
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
     
  };

  // highlightText = (data) => {
  //   const {text} = this.state;

  //   if (text == null || text == undefined)
  //     return;

  //   const start = data.indexOf(text);
  //   const end = text.length;

  //   return(
  //     // data = "SACHIN",
  //     // text = "sa"

  //     <>
  //       <span style="color: blue">text</span> { data[end, data.length] }
  //     </>

  //   )

  // }
  handleclick = (data) => {
    this.setState({
      getName: data.name,
      getaddress: data.address,
      getid: data.id,
      getpincode: data.pincode,
      mute: true,
      getItem:data.item
    });
  };
  setSelected = () => {
    this.setState({
      selectedvalue: this.state.options,
    });
  };
  checkvalue = (e) => {
    this.setState({
      selectedvalue: e.target.value,
    });
    console.log("mmmmmmmmmmmmmm", this.state.selectedvalue);
  };

  changevalue = (e) => {
    this.setState({
      array: e.target.value,
    });
    console.log(",,,,,,,,,,,,,,,", this.state.array);
  };

  render() {
    const { filtereditem } = this.state;
    const { name, address, pincode, id, item } = this.state;
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];

   
    console.log("filtered ", this.state.text);
    return (
      <>
        <div className="autosearch">
          <header className="App-header">
            <div className="serch_section">
              <div className="input-section">
                <span className="glass">&#x1F50D;</span>
                <input
                  name="search_text"
                  className="filter-input"
                  autocomplete="off" 
                  type="search"
                  value={this.state.search_text}
                  onChange={this.handletext}
                  placeholder="Search users by ID, address,name.."
                />
              </div>
              <div
                className="search-div"
                hidden={this.state.hide || this.state.text.length === 0}
              >
                {filtereditem.map((contact) => {
                  console.log("kl", contact.item);
                  return (
                    <div
                      className="search-section"
                      onClick={(e) => {
                        this.handleclick(contact);
                      }}
                    >
                      <h6 className="user_i">id:{contact.id}</h6>
                      <h6>name:{contact.name}</h6>
                      <h6>address:{contact.address.length > 100 ? contact.address.substring(0, 99) + "..." : contact.address}</h6>
                      {contact.item.map((contact) => {
                        return <h6 className="item_list">{contact} found in item</h6>;
                      })}

                      <h6>pincode:{contact.pincode}</h6>
                    </div>
                  );
                })}
              </div>

              {this.state.hidden && filtereditem.length === 0 ? (
                <div className="no-result-found">
                  <p>No User Found</p>
                </div>
              ) : null}
            </div>
      
          </header>
        </div>
        {this.state.mute && (
              <div className="search-section_new">
                <h3 style={{textAlign:"center"}}>Selected user detail</h3>
                <h6>name:{this.state.getName}</h6>
                <h6 className="user_i">id:{this.state.getid}</h6>
                <h6>address:{this.state.getaddress}</h6>
                <h6>pincode:{this.state.getpincode}</h6>
                {this.state.getItem.map((item, index) => {
                    return  <h6>item:{item}</h6>;
                  })}
               
              </div>
            )}
        {/* =========================finalresult========================= */}
        <div className="user_info"></div>
        {/* ========================ADD NEW USER DATA FORM========================= */}
        <div className="add_new_user">
          <div>
            <h3>Add New User</h3>
            <div className="input-group">
              <label>User Name</label>
              <input
                type="text"
                placeholder="Enter user name"
                name="name"
                onChange={this.changeHandler}
                value={name}
              />
            </div>
            <div className="input-group">
              <label>User address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter user address"
                onChange={this.changeHandler}
                value={address}
              />
            </div>
            <div className="input-group">
              <label>User pincode</label>
              <input
                type="number"
                placeholder="Enter user pincode"
                name="pincode"
                onChange={this.changeHandler}
                value={pincode}
              />
            </div>
            <div className="input-group item-list">
              <label>User Item</label>
              <input
                type="text"
                name="newitem"
                value={this.state.newitem}
                onChange={this.changeHandler}
                placeholder="Type a word.."
              />
              <button
                onClick={() => {
                  this.setState(
                    { item: [...this.state.item, this.state.newitem] },
                    () => this.setState({ newitem: "" })
                  );
                  this.state.item.join(",")
                }
              }
              >
                Add
              </button>
              <div className="available_item">
                <p>
                  {this.state.item.map((item, index) => {
                    return <span>{item}, </span>;
                  })}
                </p>
              </div>
            </div>
            <div className="input-group">
              <label>User ID</label>
              <input
                type="text"
                placeholder="Enter user id"
                name="id"
                onChange={this.changeHandler}
                value={id}
              />
            </div>
            <div className="input-group">
              <button type="submite" value="Send" onClick={this.submitHandler}>
                Send
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default App;
