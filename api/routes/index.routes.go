package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/mrheaven/go-nextjs/handler"
)

func Routes(e *echo.Echo) {
	e.GET("/", handler.HomeHandler)
	e.GET("/seed", handler.Seed)
	// rutas de usuario
	e.GET("/users", handler.GetUsersHandler)
	e.GET("/users/:id", handler.GetUserHandler)
	e.POST("/users", handler.PostUserHandler)
	e.DELETE("/users/:id", handler.DeleteUserHandler)

	// rutas de tareas
	e.GET("/tasks", handler.GetTasksHandler)
	e.GET("/tasks/:id", handler.GetTaskHandler)
	e.POST("/tasks", handler.PostTasksHandler)
	e.DELETE("/tasks/:id", handler.DeleteTasksHandler)
}
