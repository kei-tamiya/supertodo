package controller

import (
	"net/http"

	"github.com/kei-tamiya/model"

	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

// Board はBoardへのリクエストに関する制御をします
type Board struct {
	DB *sqlx.DB
}

// GetはDBからユーザを取得して結果を返します
func (t *Board) Get(c *gin.Context) {
	var board model.Board
	boards, err := board.BoardsAll(t.DB)
	if err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}
	c.JSON(http.StatusOK, boards)
}

func (t *Board) Post(c *gin.Context) {
	var board model.Board
	if err := c.BindJSON(&board); err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
		result, err := board.Update(tx)
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		board.ID, err = result.LastInsertId()
		return err
	})

	c.JSON(http.StatusOK, board)
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

	c.JSON(http.StatusCreated, board)
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
