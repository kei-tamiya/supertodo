//go:generate scaneo $GOFILE

package model

import "time"

// 行動予定タグをまとめる板となるもの
type Board struct {
	ID      int64      `db:"board_id" json:"id"`
	User_Id int64      `json:"user_id"`
	Date    string     `json:"date"`
	Created *time.Time `json:"created"`
	Updated *time.Time `json:"updated"`
}

type User struct {
	ID      int64      `db:"user_id" json:"id"`
	Name    string     `json:"name"`
	Email   string     `json:"email"`
	Salt    string     `json:"salt"`
	Salted  string     `json:"salted"`
	Created *time.Time `json:"created"`
	Updated *time.Time `json:"updated"`
}

// 行動予定タグとなるもの
type Todo struct {
	ID        int64      `db:"todo_id" json:"id"`
	Board_Id  int64      `json:"board_id"`
	User_Id   int64      `json:"user_id"`
	Title     string     `json:"title"`
	Completed bool       `json:"completed"`
	Pos_Top   int64      `json:"pos_top"`
	Pos_Left  int64      `json:"pos_left"`
	Width     int64      `json:"width"`
	Height    int64      `json:"height"`
	Created   *time.Time `json:"created"`
	Updated   *time.Time `json:"updated"`
}
