import React from "react";

const SECURITY_CODE = "paradigma";

function UseState(props) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({ ...state, error: true, loading: false });
  };

  const onWriting = (text) => {
    setState({ ...state, value: text });
  };

  const onCheck = () => {
    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onReset = () => {
    setState({ ...state, confirmed: false, deleted: false, value: "" });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (SECURITY_CODE === state.value) {
          onConfirm();
        } else {
          onError();
        }
      }, 3000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete {props.name}</h2>
        <p>Please, write the security code.</p>
        {(state.loading && <p>Loading...</p>) ||
          (state.error && <p>Error: the code is Incorrect</p>)}
        <input
          placeholder="Security Code..."
          value={state.value}
          onChange={(event) => onWriting(event.target.value)}
        />
        <button onClick={() => onCheck()}>Check</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Confirm Delete {props.name}</h2>
        <p>Are you sure to delete {props.name}?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Yes, delete
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No, go back
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>{props.name} is Deleted.</h2>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Restore Default {props.name}
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
