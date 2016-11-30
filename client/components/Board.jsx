import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const Board = () => (
  <div className="wrapContents">
    <Table
      multiSelectable={true}
      enableSelectAll={true}
    >
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Time</TableHeaderColumn>
          <TableHeaderColumn>Todos</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowColumn>0:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>1:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>2:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>3:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>4:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>5:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>6:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>7:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>8:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>9:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>10:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>11:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>12:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>13:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>14:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>15:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>16:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>17:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>18:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow selected={true}>
          <TableRowColumn>19:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>20:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>21:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>22:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>23:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>24:00</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

Board.proptypes = {
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Board);
