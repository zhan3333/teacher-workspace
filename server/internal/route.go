package internal

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Route struct {
	app    *gin.Engine
	db     *gorm.DB
	config *Config
}

func (r Route) App() *gin.Engine {
	return r.app
}

func NewRoute(app *gin.Engine, db *gorm.DB, config *Config) Route {
	route := Route{
		app:    app,
		db:     db,
		config: config,
	}
	api := app.Group("api")
	{

		// 获取任务详情
		api.GET("tasks/:task_id", route.GetTask)
		// 创建任务
		api.POST("tasks", route.CreateTask)
		// 获取任务列表
		api.GET("tasks", route.GetTaskList)
		// 删除任务
		api.DELETE("tasks/:task_id", route.DelTask)

		// 获取任务状态列表
		api.GET("tasks-status/:task_id", route.GetTaskStatus)
		// 设置状态
		api.POST("tasks-status", route.UpdateTaskStatus)
	}
	return route
}
