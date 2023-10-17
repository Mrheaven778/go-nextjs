package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/mrheaven/go-nextjs/db"
	"github.com/mrheaven/go-nextjs/models"
	"github.com/mrheaven/go-nextjs/routes"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORS())
	// connect to db
	db.Init()

	// creando las tablas
	db.DB.AutoMigrate(models.Tasks{})
	db.DB.AutoMigrate(models.User{})

	// route
	routes.Routes(e)
	// Root level middleware
	e.Use(middleware.Logger())
	e.Start(":8080")
}
