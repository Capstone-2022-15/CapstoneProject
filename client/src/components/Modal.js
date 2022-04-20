import "../css/Modal.css";

function Modal(props) {
  const { message } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 30,
        left: 0,
        width: "100%",
        height: 50,
      }}
    >
      <div
        style={{
          width: "30%",
          textAlign: "center",
          borderRadius: 30,
          background: "grey",
          fontSize: 20,
          color: "white",
        }}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Modal;
