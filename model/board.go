package model

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
)

func BoardOne(db *sqlx.DB, boardId int64) (Board, error) {
	return ScanBoard(db.QueryRow(`select * from boards WHERE board_id = ?`, boardId))
}

func BoardsAll(dbx *sqlx.DB, userId int64) (boards []Board, err error) {
	if err = dbx.Select(&boards, "SELECT * FROM boards WHERE user_id = ?", userId); err != nil {
		return nil, err
	}
	return boards, nil
}

func (t *Board) CheckLatestDate(dbx *sqlx.DB) (board Board, err error) {
	boards := []Board{}
	if err = dbx.Select(&boards, "select * from boards order by created desc limit 1"); err != nil {
		return board, err
	}
	if len(boards) == 0 {
		err = errors.New("Data is not exist in boards table")
		return board, err
	}
	return boards[0], nil
}

func (t *Board) Insert(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	INSERT INTO boards (date)
	VALUES (?)
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(t.Date)
}

func (t *Board) Update(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	update boards set date = ? where board_id = ?
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(t.Date, t.ID)
}
