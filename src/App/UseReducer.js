import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer(props) {
  const [state, dispatch] = React.useReducer(reducer, { initialState });

  const onConfirm = () => dispatch({ type: actionTypes.CONFIRM });
  const onError = () => dispatch({ type: actionTypes.ERROR });
  const onCheck = () => dispatch({ type: actionTypes.CHECK });
  const onDelete = () => dispatch({ type: actionTypes.DELETE });
  const onReset = () => dispatch({ type: actionTypes.RESET });
  
  const onWriting = (event) => {
    dispatch({ type: actionTypes.WRITE, payload: event.target.value });
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
  }, [state.loading, state.value]);

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
          onChange={onWriting}
        />
        <button onClick={onCheck}>Check</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Confirm Delete {props.name}</h2>
        <p>Are you sure to delete {props.name}?</p>
        <button onClick={onDelete}>Yes, delete</button>
        <button onClick={onReset}>No, go back</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>{props.name} is Deleted.</h2>
        <button onClick={onReset}>Restore Default {props.name}</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  CONFIRM: "CONFIRM",
  ERROR: "ERROR",
  CHECK: "CHECK",
  WRITE: "WRITE",
  DELETE: "DELETE",
  RESET: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.CONFIRM]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.ERROR]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.CHECK]: {
    ...state,
    loading: true,
  },
  [actionTypes.WRITE]: {
    ...state,
    value: payload,
  },
  [actionTypes.DELETE]: {
    ...state,
    deleted: true,
  },
  [actionTypes.RESET]: {
    ...initialState,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
