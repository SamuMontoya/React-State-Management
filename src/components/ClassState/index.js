import React from "react";
import { Loading } from "../Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      value: "",
    };
  }

  componentDidUpdate() {
    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("Validating...");
        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Delete {this.props.name}</h2>
        <p>Please, write the security code.</p>
        {(this.state.loading && <p>Loading...</p>) || (this.state.error && <p>Error: the code is Incorrect</p>)}
        <input
          placeholder="Security Code..."
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button onClick={() => this.setState({ loading: true })}>Check</button>
      </div>
    );
  }
}

export { ClassState };
