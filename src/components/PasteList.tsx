import { Connect } from "redux-zero/preact";
import { Component, h, createRef } from "preact";
import copy from "clipboard-copy";
import delay from "../util/delay";
import "../style/pasteList.scss";

const mapToProps = ({ pastes }) => ({ pastes });
class PasteList extends Component {
  pasteList = createRef();
  constructor(props) {
    super(props);
    this.state = {};
  }

  copyPaste = e => {
    e.preventDefault();
    console.log(this.pasteList);
    const copyConfirmDiv = e.currentTarget.parentElement.children[1];
    copy(e.currentTarget.children[0].innerText)
      .then(async () => {
        console.log("copied!");
        copyConfirmDiv.classList.toggle("hide");
        await delay(1000);
        copyConfirmDiv.classList.toggle("hide");
      })
      .catch(error => {
        console.log("Copy failed", error);
      });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps() {
    this.pasteList.current.scrollToBottom();
  }

  render() {
    return (
      <Connect mapToProps={mapToProps}>
        {({ pastes }) => (
          <div ref={this.pasteList} id="paste-list">
            {pastes.length > 0
              ? pastes.map((value, index) => (
                  <div id={value.id} class="paste-container" key={index}>
                    <div onClick={this.copyPaste} class="paste">
                      <h3>{value.attributes.content}</h3>
                    </div>
                    <div class="copy-confirm hide">
                      <p>Copied</p>
                      <img src="../assets/icons/check.svg" />
                    </div>
                  </div>
                ))
              : null}
          </div>
        )}
      </Connect>
    );
  }
}

export default PasteList;

// export default () => (
//   <Connect mapToProps={mapToProps}>
//     {({ pastes }) => (
//       <div id="paste-list">
//         <ul>
//           {pastes.map((value, index) => (
//             <li key={index}>
//               {value[0]} - {value[1]}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}
//   </Connect>
// );
