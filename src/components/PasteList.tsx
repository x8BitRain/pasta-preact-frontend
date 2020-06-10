import { Connect } from "redux-zero/preact";
import { Component, h, createRef } from "preact";
import copy from "clipboard-copy";
import store from "../util/Store";
import isValidUrl from "../util/isValidUrl";
import flashMessage from "../util/flashMessage";
import "../style/pasteList.scss";

const mapToProps = ({ pastes }) => ({ pastes });
class PasteList extends Component {
  pasteList = createRef();
  constructor(props) {
    super(props);
    this.state = {};
  }

  copyPaste = (e: any) => {
    store.getState().clickableLinks ? null : e.preventDefault();
    copy(e.currentTarget.children[0].innerText)
      .then(() => {
        console.log("copied!");
        flashMessage({
          content: "Copied to clipboard",
          type: true,
          delay: 2000
        });
      })
      .catch(error => {
        console.log("Copy failed", error);
        flashMessage({
          content: "Could not copy to clipboard" + error,
          type: true,
          delay: 2000
        });
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
                      {isValidUrl(value.attributes.content) &&
                      store.getState().clickableLinks ? (
                        <a
                          class="paste-text"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={value.attributes.content}
                        >
                          {value.attributes.content}
                        </a>
                      ) : (
                        <p class="paste-text">{value.attributes.content}</p>
                      )}
                    </div>
                  </div>
                ))
              : null}
            {/* <div id="input-block"></div> */}
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
