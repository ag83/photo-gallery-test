import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Photos from "../components/Photos";
import * as actions from "../actions/PhotoActions";


function mapStateToProps({photos}) {
	return {
		...photos
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);