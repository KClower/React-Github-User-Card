import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import axios from 'axios';




export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      githubUser: '',
      userName: "",
      error: ""
    }
  }

  componentDidMount() {
    axios
      .get('https://api.github.com/users/KClower')
      .then((response) => {
        this.setState({
          githubUser: response.data
        })
        console.log(response.data)
      })
      .catch((err) => console.log(err));
  }

  handleChanges = e => {
    this.setState({
      userName: e.target.value,
    });
    console.log(e.target.value)
  };

  findUser = e => {
    e.preventDefault();

    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then((response) => {
        this.setState({
          githubUser: response.data,
          error: "",
        })
      })
      .catch((err) => {
        this.setState({
          githubUser: "",
          error: "Looks like this user does not exist. Please check name and try again."
        })
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.findUser}>
          <input
            type="text"
            value={this.state.userName}
            onChange={this.handleChanges}
          />
          <button>Find User</button>

        </form>
        {this.state.githubUser.length === 0
          ? <p style={{ color: "red" }}>{this.state.error}</p>
          : (<Card
            style={{
              width: '18rem'
            }}
          >
            <CardBody>
              <CardTitle tag="h1" className='mb-0'>
                {this.state.githubUser.name}
              </CardTitle>
              <CardSubtitle
                className="mb-2 mt-0 text-muted"
                tag="h3"
              >
                {this.state.githubUser.login}
              </CardSubtitle>
            </CardBody>
            <img
              alt="User Image"
              src={this.state.githubUser.avatar_url}
              width="100%"
            />
            <CardBody>
              <CardText>
                {this.state.githubUser.bio}
              </CardText>
              <CardText>
                {this.state.githubUser.location}
              </CardText>
            </CardBody>
          </Card>)}

      </div>
    )
  }
}


