import React, { PropTypes, Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import { fetchOrAddBoardOneByApiIfNeeded } from '../actions/BoardActions.jsx';

class AddBoard extends Component {
  handleChange(e, date) {
    let selectedDate = JSON.stringify(date).slice(1, 11);
    selectedDate = selectedDate.split('-').join('');
    const fixedDate = parseInt(selectedDate, 10) + 1;
    this.props.dispatch(fetchOrAddBoardOneByApiIfNeeded(fixedDate.toString()));
  }

  render() {
    return (
      <div>
        <DatePicker
          hintText="Let's Select Todo's Board."
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

const mapStateToProps = state => ({
  selectedBoard: state.selectedBoard.board,
});

export default connect(mapStateToProps)(AddBoard);
