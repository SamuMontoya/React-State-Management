import React from "react";

class Loading extends React.Component {
  componentWillUnmount(props){
    console.log('componentWillUnmount')
  }

  render() {
    return (
      <p>Loading...</p>
    );
  }
}

export { Loading };
