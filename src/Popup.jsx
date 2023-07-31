export default function Popup({
  width = 400,
  ...props
}) {
  if (props.isopen === false) {
    return null;
  }

  return (
    <div className="popup-container">
      <form className="popup" style={{ width }} onSubmit={(event) => {
        event.preventDefault();
        const value = event.target.elements.value.value;
        props.onconfirm(value);
        props.oncloserequest();
      }}>
        <div className="msg-container">
          {props.children}
        </div>

        <input type="text" name="value" />

        <div className="btn-container">
          <button type="submit">
            OK
          </button>
          <button type="button" onClick={() => props.oncloserequest()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
