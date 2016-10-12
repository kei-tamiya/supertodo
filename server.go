package base

import (
	"log"
	"net/http"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/kei-tamiya/supertodo/controller"
	"github.com/kei-tamiya/supertodo/db"
	csrf "github.com/utrack/gin-csrf"
)

// Serverはベースアプリケーションのserverを示します
//
type Server struct {
	dbx    *sqlx.DB
	Engine *gin.Engine
}

func (s *Server) Close() error {
	return s.dbx.Close()
}

// InitはServerを初期化する
func (s *Server) Init(dbconf, env string) {
	cs, err := db.NewConfigsFromFile(dbconf)
	if err != nil {
		log.Fatalf("cannot open database configuration. exit. %s", err)
	}
	dbx, err := cs.Open(env)
	if err != nil {
		log.Fatalf("db initialization failed: %s", err)
	}
	s.dbx = dbx

	store := sessions.NewCookieStore([]byte("secret"))
	s.Engine.Use(sessions.Sessions("todosession", store))
	s.Engine.Use(csrf.Middleware(csrf.Options{
		Secret: "secret",
		ErrorFunc: func(c *gin.Context) {
			c.JSON(400, gin.H{"error": "CSRF token mismatch"})
			c.Abort()
		},
	}))

	s.Route()
}

// Newはベースアプリケーションを初期化します
func New() *Server {
	r := gin.Default()
	return &Server{Engine: r}
}

func (s *Server) Run(addr ...string) {
	s.Engine.Run(addr...)
}

// Routeはベースアプリケーションのroutingを設定します
func (s *Server) Route() {
	// ヘルスチェック用
	s.Engine.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "%s", "pong")
	})
	s.Engine.GET("/token", func(c *gin.Context) {
		c.JSON(http.StatusOK, map[string]string{
			"token": csrf.GetToken(c),
		})
	})
	user := &controller.User{DB: s.dbx}
	todo := &controller.Todo{DB: s.dbx}

	auth := s.Engine.Group("/")
	auth.Use(controller.AuthRequired())
	{
		auth.GET("/authtest", func(c *gin.Context) {
			c.String(200, "you're authed")
		})
		auth.GET("/new", func(c *gin.Context) {
			//c.HTML(200, "new.tmpl", gin.H{
			//	"title":   "New: supertodo",
			//	"csrf":    csrf.GetToken(c),
			//	"context": c,
			//})
		})
		//auth.GET("/logout", func(c *gin.Context) {
		//	c.HTML(http.StatusOK, "logout.tmpl", gin.H{
		//		"csrf":    csrf.GetToken(c),
		//		"context": c,
		//	})
		//})
		//auth.POST("/logout", user.Logout)

		s.Engine.GET("/api/todos", todo.Get)
		s.Engine.PUT("/api/todos", todo.Put)
		//s.Engine.POST("/api/todos", todo.Post)

	}

	board := &controller.Board{DB: s.dbx}
	s.Engine.GET("/api/boards", board.Get)
	s.Engine.PUT("/api/boards", board.Put)
	s.Engine.POST("/api/boards", board.Post)
	s.Engine.POST("/api/todos", todo.Post)

	s.Engine.POST("api/signup", user.SignUp)
	//s.Engine.DELETE("/api/todos", todo.Delete)
	//
	//s.Engine.DELETE("/api/todos/multi", todo.DeleteMulti)
	//
	//s.Engine.POST("/api/todos/toggle", todo.Toggle)
	//s.Engine.POST("/api/todos/toggleall", todo.ToggleAll)

	s.Engine.StaticFile("/", "public/index.html")
	s.Engine.Static("/static", "public")
}
