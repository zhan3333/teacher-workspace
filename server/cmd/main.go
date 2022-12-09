package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"net/http"
	"strings"
	"teacher-workspace/server/internal"
	"time"
)

func main() {
	viper.SetConfigFile("config/production.toml")
	if err := viper.ReadInConfig(); err != nil {
		panic("read config failed: " + err.Error())
	}
	var conf internal.Config
	if err := viper.Unmarshal(&conf); err != nil {
		panic("unmarshal config failed: " + err.Error())
	}
	db, err := getStore(&conf.DB)
	if err != nil {
		panic(err)
	}

	server := gin.Default()
	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowHeaders:     []string{"Authorization", "Origin", "Content-Length", "Content-Type"},
		AllowCredentials: true,
		ExposeHeaders:    []string{"X-Request-Id"},
		MaxAge:           12 * time.Hour,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
	}))

	// web 文件
	server.Static("/web", "web")
	server.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/web") {
			c.File("web/index.html")
		} else {
			c.String(http.StatusNotFound, "not found route")
		}
	})

	app := internal.NewRoute(server, db, &conf)

	if err := app.App().Run(":9003"); err != nil {
		panic(err)
	}
}

func getStore(conf *internal.DB) (*gorm.DB, error) {
	db, err := gorm.Open(mysql.Open(conf.DSN()), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("open db: %w", err)
	}
	if err := db.AutoMigrate(
		&internal.Task{},
		&internal.Student{},
		&internal.TaskStatus{},
	); err != nil {
		return nil, fmt.Errorf("auto migrate: %w", err)
	}
	return db, nil
}
