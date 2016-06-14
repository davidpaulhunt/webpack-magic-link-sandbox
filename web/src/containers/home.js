import React from 'react';
import { connect } from 'react-redux';

export default connect()(() => (
  <div className="home-wrapper">
    <p>This is home aka the splash page.</p>
  </div>
));

// class HomeContainer extends Component {
//   static propTypes = {
//     me: PropTypes.object,
//     dispatch: PropTypes.func,
//   }
//
//   render() {
//     return (
//       <div className="home-wrapper">
//         <p>This is home.</p>
//       </div>
//     );
//   }
// }
//
// export default connect()(HomeContainer);
