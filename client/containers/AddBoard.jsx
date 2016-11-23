import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrAddBoardOneByApiIfNeeded } from '../actions/BoardActions.jsx';
import { GREEN, BLUE, ORANGE } from '../constant/Color.jsx';
import DatePicker from 'material-ui/DatePicker';

class AddBoard extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e, date) => {
    let selectedDate = JSON.stringify(date).slice(1, 11);
    selectedDate = selectedDate.split("-").join("");
    let fixedDate = parseInt(selectedDate)+1;
    this.props.dispatch(fetchOrAddBoardOneByApiIfNeeded(fixedDate.toString()));
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
        <DatePicker hintText="Let's Select Todo's Board."
          autoOk={true}
          defaultDate={new Date()}
          formatDate={(date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
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
