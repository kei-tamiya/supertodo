import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoardOneByApiIfNeeded } from '../actions/BoardActions.jsx';
import { GREEN, BLUE, ORANGE } from '../constant/Color.jsx';
import DatePicker from 'material-ui/DatePicker'

class AddBoard extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e, date) => {
    let selectedDate = JSON.stringify(date).slice(1, 11);
    selectedDate = selectedDate.split("-").join("");
    this.props.dispatch(fetchBoardOneByApiIfNeeded(selectedDate));
  };

  render() {
    const { dispatch } = this.props;
    const styles = {
      errorStyle: {
        color: ORANGE,
      },
      underlineStyle: {
        borderColor: ORANGE,
      },
      floatingLabelStyle: {
        color: ORANGE,
      },
      floatingLabelFocusStyle: {
        color: BLUE,
      },
    };

    return (
      <div>
        <DatePicker hintText="Portrait Dialog"
          autoOk={true}
          defaultDate={new Date()}
          formatDate={(dt) => `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`}
          onChange={(e, date) => this.handleChange(e, date)}
        />
      </div>
    );
  }
}

AddBoard.propTypes = {
  // boards: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   date: PropTypes.string.isRequired,
  // }).isRequired).isRequired,
  selectedBoard: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedBoard: state.selectedBoard.board,
  };
};

export default connect(mapStateToProps)(AddBoard);
