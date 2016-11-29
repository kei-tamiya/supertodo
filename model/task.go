package model

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
)

//func (t *Todo) SelectTodo(tx *sqlx.Tx) (sql.Result, error) {
//	stmt, err := tx.Prepare(`
//	SELECT * FROM todos where todo_id = ?
//	`)
//	if err != nil {
//		return nil, err
//	}
//	defer stmt.Close()
//
//	return stmt.Exec(t.ID)
//}

func TodoOne(db *sqlx.DB, id int64) (Todo, error) {
	return ScanTodo(db.QueryRow(`select * from todos WHERE todo_id = ?`, id))
}

func TodosAll(dbx *sqlx.DB, userId int64) (todos []Todo, err error) {
	if err = dbx.Select(&todos, "SELECT * FROM todos WHERE user_id = ?", userId); err != nil {
		return nil, err
	}
	return todos, nil
}

func TodosAllOfBoard(dbx *sqlx.DB, userId int64, boardId int64) (todos []Todo, err error) {
	if err = dbx.Select(&todos, "SELECT * FROM todos WHERE (user_id, board_id) = (?, ?)", userId, boardId); err != nil {
		return nil, err
	}
	return todos, nil
}

func (t *Todo) Insert(tx *sqlx.Tx, userId int64) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	INSERT INTO todos (board_id, user_id, title, completed)
	VALUES (?, ?, ?, ?)
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(t.Board_Id, userId, t.Title, t.Completed)
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

func (t *Todo) Patch(tx *sqlx.Tx, userId int64) (sql.Result, error) {
	stmt, err := tx.Prepare(`
	UPDATE todos SET title = ?, completed = ?, pos_top = ?, pos_left = ? WHERE (todo_id, user_id) = (?, ?)
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(t.Title, t.Completed, t.Top, t.Left, t.ID, userId)
}

//func (t *Todo) PatchCompleted(tx *sqlx.Tx, userId int64) (sql.Result, error) {
//	stmt, err := tx.Prepare(`
//	UPDATE todos SET completed WHERE (todo_id, user_id) = (?, ?)
//	`)
//	if err != nil {
//		return nil, err
//	}
//	defer stmt.Close()
//	return stmt.Exec(t.Completed, t.ID, userId)
//}

func (t *Todo) Delete(tx *sqlx.Tx, id int64) (sql.Result, error) {
	stmt, err := tx.Prepare(`DELETE FROM todos WHERE todo_id = ?`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(id)
}
