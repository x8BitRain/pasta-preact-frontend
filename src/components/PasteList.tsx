import { Connect } from "redux-zero/preact";

const mapToProps = ({ pastes }) => ({ pastes });

export default () => (
  <Connect mapToProps={mapToProps}>
    {({ pastes }) => (
      <div id="paste-list">
        <ul>
          {pastes.map((value, index) => (
            <li key={index}>
              {value[0]} - {value[1]}
            </li>
          ))}
        </ul>
      </div>
    )}
  </Connect>
);

// class PasteList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {}

//   componentWillUnmount() {}

//   render() {
//     return (
//       <Connect mapToProps={mapToProps}>
//         {({ pastes }) => (
//           <div id="paste-list">
//             <ul>
//               {pastes.map((value, index) => (
//                 <li key={index}>
//                   {value[0]} - {value[1]}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </Connect>
//     );
//   }
// }

// export default PasteList;
