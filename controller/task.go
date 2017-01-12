package controller

import (
	"net/http"

	"github.com/kei-tamiya/supertodo/model"

	"strconv"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/kotakanbe/go-cve-dictionary/log"
)

// Todo はTodoへのリクエストに関する制御をします
type Todo struct {
	DB *sqlx.DB
}

// GetはDBからtodoを取得して結果を返します
func (t *Todo) Get(c *gin.Context) {
	sess := sessions.Default(c)
	log.Printf("uid : %v", sess.Get("uid").(int64))
	todos, err := model.TodosAll(t.DB, sess.Get("uid").(int64))
	if err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": &todos})
}

func (t *Todo) Post(c *gin.Context) {
	var todo model.Todo
	if err := c.BindJSON(&todo); err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	sess := sessions.Default(c)

	TXHandler(c, t.DB, func(tx *sqlx.Tx) (err error) {
		result, err := todo.Insert(tx, sess.Get("uid").(int64))
		if err != nil {
			c.JSON(500, gin.H{"err": err.Error()})
			return err
		}
		if err := tx.Commit(); err != nil {
			c.JSON(500, gin.H{"err": err.Error()})
			return err
		}
		todo.ID, err = result.LastInsertId()
		if err != nil {
			c.JSON(500, gin.H{"err": err.Error()})
			return err
		}
		todo, err = model.TodoOne(t.DB, todo.ID)
		return err
	})

	c.JSON(http.StatusOK, &todo)
}

// Patch patches task's param on DB
func (t *Todo) Patch(c *gin.Context) {
	var todo model.Todo
	if err := c.BindJSON(&todo); err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	sess := sessions.Default(c)

	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
		_, err := todo.Patch(tx, sess.Get("uid").(int64))
		if err != nil {
			c.JSON(500, gin.H{"err": err.Error()})
			return err
		}
		if err := tx.Commit(); err != nil {
			c.JSON(500, gin.H{"err": err.Error()})
			return err
		}
		return err
	})

	c.JSON(http.StatusOK, gin.H{"data": &todo})
	return
}

// PatchComleted patches task's completed param
//func (t *Todo) PatchCompleted(c *gin.Context) {
//	var todo model.Todo
//	if err := c.BindJSON(&todo); err != nil {
//		c.JSON(500, gin.H{"err": err.Error()})
//		return
//	}
//
//	sess := sessions.Default(c)
//
//	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
//		_, err := todo.PatchCompleted(tx, sess.Get("uid").(int64))
//		if err != nil {
//			c.JSON(500, gin.H{"err": err.Error()})
//			return err
//		}
//		if err := tx.Commit(); err != nil {
//			c.JSON(500, gin.H{"err": err.Error()})
//			return err
//		}
//		return err
//	})
//
//	c.JSON(http.StatusOK, gin.H{"data": &todo})
//	return
//}

func (t *Todo) Delete(c *gin.Context) {
	var todo model.Todo
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"err": err.Error()})
		return
	}

	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
		_, err := todo.Delete(tx, id)
		if err != nil {
			return err
		}
		return tx.Commit()
	})

	c.JSON(http.StatusOK, gin.H{"data": "Delete todo successed"})
}

//
//func (t *Todo) DeleteMulti(c *gin.Context) {
//	var todos []model.Todo
//	if err := c.BindJSON(&todos); err != nil {
//		c.JSON(500, gin.H{"err": err.Error()})
//		return
//	}
//
//	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
//		for _, todo := range todos {
//			if _, err := todo.Delete(tx); err != nil {
//				return err
//			}
//		}
//		return tx.Commit()
//	})
//
//	c.Status(http.StatusOK)
//}
//
//func (t *Todo) Toggle(c *gin.Context) {
//	var todo model.Todo
//	if err := c.BindJSON(&todo); err != nil {
//		c.JSON(500, gin.H{"err": err.Error()})
//		return
//	}
//
//	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
//		result, err := todo.Toggle(tx)
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
//func (t *Todo) ToggleAll(c *gin.Context) {
//	var req = struct {
//		Checked bool `json:"checked"`
//	}{}
//	if err := c.BindJSON(&req); err != nil {
//		c.JSON(500, gin.H{"err": err.Error()})
//		return
//	}
//
//	TXHandler(c, t.DB, func(tx *sqlx.Tx) error {
//		if _, err := model.TodosToggleAll(tx, req.Checked); err != nil {
//			return err
//		}
//		return tx.Commit()
//	})
//
//	c.Status(http.StatusOK)
