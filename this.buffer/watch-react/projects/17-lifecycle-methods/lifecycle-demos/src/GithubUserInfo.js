import { Component } from "react";
import axios from "axios";

export class GithubUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { imgUrl: "", name: "" };
  }

  async componentDidMount() {
    const url = `https://api.github.com/users/${this.props.username}`;
    const res = await axios.get(url);
    const data = res.data;
    this.setState({ imgUrl: data.avatar_url, name: data.name });
  }

  render() {
    return (
      <div>
        <h1>Github user: {this.state.name}</h1>
        <img src={this.state.imgUrl} alt="" />
      </div>
    );
  }
}
