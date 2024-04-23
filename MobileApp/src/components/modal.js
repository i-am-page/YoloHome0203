import React, { useState } from "react";
import "./MyModal.css";
function MyComponent(props) {
  const [showModal, setShowModal] = useState(false);
  const [inputMSSV, setInputMSSV] = useState("");
  const [inputname, setInputname] = useState("");

  const handleInputMSSV = (event) => {
    setInputMSSV(event.target.value);
  };
  const handleInputname = (event) => {
    setInputname(event.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
    // const info = { mssv: inputMSSV, name: inputname };
    // props.onDataReceived(info);
  };
  const continueModal = () => {
    // const info = { mssv: inputMSSV, name: inputname };
    // props.onDataReceived(info);
    props.faceregister(inputMSSV,inputname);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setInputMSSV('')
    setInputname('')
  };

  return (
    <div>
      {/* <button onClick={handleShowModal}>Show Modal</button> */}
      <button className="action face-registration" onClick={handleShowModal}>Face Registration</button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            id="modal"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "10px",
              width: "300px",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form>
              <label htmlFor="fname">Mã số sinh viên:</label>
              <br />
              <input type="text" value={inputMSSV} onChange={handleInputMSSV} />
              <br />
              <label htmlFor="lname">Tên người dùng:</label>
              <br />
              <input type="text" value={inputname} onChange={handleInputname} />
            </form>
            <div className="div_button">
              <button className="close" onClick={closeModal}>
                Close
              </button>
              <button className="close" onClick={continueModal}>
                Countinue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default MyComponent;
