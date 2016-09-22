package model

import (
	"database/sql"
	"time"

	"github.com/jmoiron/sqlx"
)

// 行動予定タグとなるもの
type Todo struct {
	ID        int64      `db:"todo_id" json:"id"`
	Board_Id  int64      `json:"board_id"`
	Title     string     `json:"title"`
	Completed bool       `json:"completed"`
	Top       int64      `json:"top"`
	Left      int64      `json:"left"`
	Width     int64      `json:"width"`
	Height    int64      `json:"height"`
	Created   *time.Time `json:"created"`
	Updated   *time.Time `json:"updated"`
}

func TodosAll(dbx *sqlx.DB) (todos []Todo, err error) {
	if err = dbx.Select(&todos, "SELECT * FROM todos"); err != nil {
		return nil, err
	}
	return todos, nil
}

func (t *Todo) Insert(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	INSERT INTO todos (board_id, title, completed, top, left, width, height)
	VALUES (?, ?, ?, ?, ?, ?, ?)
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	//return stmt.Exec(t.BoardID, t.Title, t.Completed, t.Top, t.Left, t.Width, t.Height)
	return stmt.Exec(2, t.Title, t.Completed, t.Top, t.Left, t.Width, t.Height)
}

//func (t *Todo) fetchBoardID(tx *sqlx.Tx, date string) (sql.Result, error) {
//	stmt, err := tx.Prepare(`
//	SELECT board_id FROM boards WHERE date = ?
//	`)
//	if err != nil {
//		return nil, err
//	}
//
//}
func (t *Todo) Update(tx *sqlx.Tx) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	update todos set content = ? where todo_id = ?
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(t.Title, t.ID)
}
