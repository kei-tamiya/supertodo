package controller

import (
	"log"
	"net/http"

	"github.com/kei-tamiya/supertodo/model"

	"fmt"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

// Board はBoardへのリクエストに関する制御をします
type Board struct {
	DB *sqlx.DB
}

type BoardTodos struct {
	BoardTodos map[string]Todos `json:"todos"`
}

type Todos struct {
	Todos []model.Todo
}

// GetはDBから現在ログインしているユーザのBoardを取得して結果を返します
func (b *Board) Get(c *gin.Context) {
	sess := sessions.Default(c)
	userId := sess.Get("uid").(int64)
	boards, err := model.BoardsAll(b.DB, userId)
	if err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	arr := []string{}
	t := &BoardTodos{}
	for _, board := range boards {
		date := board.Date
		arr = append(arr, date)
		todos, err := model.TodosAllOfBoard(b.DB, userId, board.ID)
		if err != nil {
			c.JSON(500, gin.H{"err": err.Error()})
		}
		t.BoardTodos[date] = todos
	}

	if err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	// Find today's board and insert if
	//todayBoard, err := model.TodayBoard(b.DB, userId)
	//date := todayBoard.Date
	//isToday := false
	//for _, b := range boards {
	//	if b.Date == date {
	//		isToday = true
	//	}
	//}
	//if !isToday {
	//	boards = append(boards, todayBoard)
	//}

	log.Printf("todos : %v", &t)
	c.JSON(http.StatusOK, gin.H{"data": &t})
}

func (t *Board) Post(c *gin.Context) {
	var board model.Board
	sess := sessions.Default(c)
	if err := c.BindJSON(&board); err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}
	board.User_Id = sess.Get("uid").(int64)

	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
		result, err := board.Insert(tx)
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		board.ID, err = result.LastInsertId()
		return err
	})

	c.JSON(http.StatusOK, gin.H{"data": &board})
}

//PutはタスクをDBに追加します
//boardをJSONとして受け取ることを想定しています。
func (t *Board) Put(c *gin.Context) {
	var board model.Board
	if err := c.BindJSON(&board); err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	latestBoard, err := board.CheckLatestDate(t.DB)
	if err != nil {
		c.JSON(500, gin.H{"err": err.Error()})

		return
	}

	if board.Date == latestBoard.Date {
		c.JSON(400, gin.H{"err": err.Error()})
		return
	}
	fmt.Println(board.Date)
	fmt.Println(latestBoard.Date)

	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
		result, err := board.Insert(tx)
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		board.ID, err = result.LastInsertId()
		return err
	})

	c.JSON(http.StatusCreated, gin.H{"data": &board})
	return
}

//
//func (t *Board) Delete(c *gin.Context) {
//	var board model.Board
//	if err := c.BindJSON(&board); err != nil {
//		c.JSON(500, gin.H{"err": err.Error()})
//		return
//	}
//
//	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
//		_, err := board.Delete(tx)
//		if err != nil {
//			return err
//		}
//		return tx.Commit()
//	})
//
//	c.Status(http.StatusOK)
//}
//
//func (t *Board) DeleteMulti(c *gin.Context) {
//	var boards []model.Board
//	if err := c.BindJSON(&boards); err != nil {
//		c.JSON(500, gin.H{"err": err.Error()})
//		return
//	}
//
//	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
//		for _, board := range boards {
//			if _, err := board.Delete(tx); err != nil {
//				return err
//			}
//		}
//		return tx.Commit()
//	})
//
//	c.Status(http.StatusOK)
//}
//
//func (t *Board) Toggle(c *gin.Context) {
//	var board model.Board
//	if err := c.BindJSON(&board); err != nil {
//		c.JSON(500, gin.H{"err": err.Error()})
//		return
//	}
//
//	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
//		result, err := board.Toggle(tx)
//		if err != nil {
//			return err
//		}
//		if err := tx.Commit(); err != nil {
//			return err
//		}
//		if n, err := result.RowsAffected(); err != nil {
//			return err
//		} else if n != 1 {
//			return errors.New("no rows updated")
//		}
//		return nil
//	})
//	c.Status(http.StatusOK)
//}
//
//func (t *Board) ToggleAll(c *gin.Context) {
//	var req = struct {
//		Checked bool `json:"checked"`
//	}{}
//	if err := c.BindJSON(&req); err != nil {
//		c.JSON(500, gin.H{"err": err.Error()})
//		return
//	}
//
//	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
//		if _, err := model.BoardsToggleAll(tx, req.Checked); err != nil {
//			return err
//		}
//		return tx.Commit()
//	})
//
//	c.Status(http.StatusOK)
