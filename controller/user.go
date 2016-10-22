package controller

import (
	"net/http"
	"time"

	"log"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/kei-tamiya/supertodo/model"
)

type User struct {
	DB *sqlx.DB
}

type NewUser struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

type LoggedInUser struct {
}

func (u *User) SignUp(c *gin.Context) {
	var m model.User
	var n NewUser
	if err := c.BindJSON(&n); err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	m.Email = n.Email
	m.Name = n.Name

	b, err := model.UserExists(u.DB, m.Email)

	if err != nil {
		log.Printf("query err: %s", err)
		c.String(500, "db error")
		return
	}
	if b {
		c.String(200, "given email address is already used.")
		log.Printf("email : %v", m.Email)
		return
	}

	TXHandler(c, u.DB, func(tx *sqlx.Tx) error {
		if _, err := m.Insert(tx, n.Password); err != nil {
			return err
		}

		return tx.Commit()
	})

	m, err = model.Auth(u.DB, m.Email, n.Password)
	if err != nil {
		log.Printf("auth failed: %s", err)
		c.String(500, "can't auth")
		return
	}

	log.Printf("authed: %#v", m)

	sess := sessions.Default(c)
	sess.Set("uid", m.ID)
	sess.Set("name", m.Name)
	sess.Set("email", m.Email)
	sess.Save()

	// Todo implement Redirect on React
	c.JSON(http.StatusOK, gin.H{"data": "ok"})
}

// Login try login.
func (u *User) Login(c *gin.Context) {
	m, err := model.Auth(u.DB, c.PostForm("email"), c.PostForm("password"))
	if err != nil {
		log.Printf("auth failed: %s", err)
		c.String(500, "can't auth")
		return
	}

	log.Printf("authed: %#v", m)

	sess := sessions.Default(c)
	sess.Set("uid", m.ID)
	sess.Set("name", m.Name)
	sess.Set("email", m.Email)
	sess.Save()

	c.Redirect(301, "/")
	// TODO ここは直す
}

// Logout makes user logged out.
func (u *User) Logout(c *gin.Context) {
	sess := sessions.Default(c)
	sess.Options(sessions.Options{MaxAge: -1})
	sess.Clear()
	sess.Save()

	// clear cookie
	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "wikisession",
		Value:   "",
		Path:    "/",
		Expires: time.Now().AddDate(0, -1, 0),
	})

	c.Redirect(301, "/")
}

// LoggedIn returns if current session user is logged in or not.
func LoggedIn(c *gin.Context) bool {
	if c == nil {
		return false
	}
	sess := sessions.Default(c)
	return sess.Get("uid") != nil && sess.Get("name") != nil && sess.Get("email") != nil
}

// CurrentName returns current user name who logged in.
func CurrentName(c *gin.Context) string {
	if c == nil {
		return ""
	}
	return sessions.Default(c).Get("name").(string)
}

// AuthRequired returns a handler function which checks
// if user logged in or not.
func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !LoggedIn(c) {
			c.AbortWithStatus(401)
		}
	}
}
