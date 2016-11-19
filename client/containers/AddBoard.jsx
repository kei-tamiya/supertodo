import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoardOneByApiIfNeeded } from '../actions/BoardActions.jsx';
import { GREEN, BLUE, ORANGE } from '../constant/Color.jsx';
import DatePicker from 'material-ui/DatePicker'

class AddBoard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  // }

  handleChange = (e, date) => {
    // event.preventDefault();
    let selectedDate = JSON.stringify(date).slice(1, 11);
    selectedDate = selectedDate.replace("-", "");
    console.log("selectedDate" + selectedDate);
    // console.log("event" + JSON.stringify(x));
    // this.props.dispatch(fetchBoardOneByApiIfNeeded(date));
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
  selectedBoard: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedBoard: state.boards.selectedBoard,
  };
};

export default connect(mapStateToProps)(AddBoard);
