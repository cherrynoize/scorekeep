let popupReturnValue;

export function togglePopup(tag) {
  let popup = document.getElementById("popup__tag__" + tag);
  if (popup) {
    popup.classList.toggle("active");
  }
}

export function queryPopup(tag) {
  state = state ? 2 : 1;
  popupReturnValue = undefined;
  togglePopup(tag);
  while (state <= 1);
  return popupReturnValue;
}

export default function Popup(props) {
  let id = "popup__tag__" + props.tag;
  let classList = "popup " + props.divClass;
  let msg = props.children;

  function evalOk() {
    popupReturnValue =
      document.getElementById(props.resultElementId);
    togglePopup();
  }

  function evalCancel() {
    togglePopup();
  }

  return (
    <div className="popup-container">
      <div id={id} className={classList} {...props}>
        <div className={"msg-container " + props.msgClass}>
          {msg}
        </div>
        <div className={"btn-container " + props.btnClass}>
          <button onClick={evalOk}>
            OK
          </button>
          <button onClick={evalCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
