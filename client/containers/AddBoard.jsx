import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrAddBoardByApi } from '../actions/BoardActions.jsx';
import { GREEN, BLUE, ORANGE } from '../constant/Color.jsx';
import DatePicker from 'material-ui/DatePicker'

class AddBoard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  // }

  handleChange = (e) => {
    e.preventDefault();
    this.props.dispatch(fetchOrAddBoardByApi(date));
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
                    onChange={this.handleChange}
        />
      </div>
    );
  }
}

AddBoard.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedValue: state.boards.selectedValue,
  };
};

export default connect(mapStateToProps)(AddBoard);
