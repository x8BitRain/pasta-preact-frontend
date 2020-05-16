import { Connect } from "redux-zero/preact";
import { Component, h } from "preact";

const mapToProps = ({ pastes }) => ({ pastes });
class PasteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Connect mapToProps={mapToProps}>
        {({ pastes }) => (
          <div id="paste-list">
            <ul>
              {pastes.length > 0
                ? pastes.map((value, index) => <li key={index}>{value.attributes.content}</li>)
                : null}
            </ul>
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
