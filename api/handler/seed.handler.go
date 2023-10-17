package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/mrheaven/go-nextjs/db"
	"github.com/mrheaven/go-nextjs/models"
)

// Seed realiza la inserción de datos de prueba en las tablas
func Seed(c echo.Context) error {
	// Obtener la instancia de la base de datos desde el contexto
	db := db.DB

	// Iniciar una transacción
	tx := db.Begin()
	if tx.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al iniciar la transacción"})
	}

	// Deferir el rollback en caso de error
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Crear usuarios
	users := []models.User{
		{FristName: "John", LastName: "Doe", Email: "john@example.com"},
		{FristName: "Jane", LastName: "Doe", Email: "jane@example.com"},
		{FristName: "Bob", LastName: "Smith", Email: "bob@example.com"},
		{FristName: "Alice", LastName: "Johnson", Email: "alice@example.com"},
		{FristName: "Charlie", LastName: "Brown", Email: "charlie@example.com"},
		{FristName: "Eva", LastName: "Williams", Email: "eva@example.com"},
		{FristName: "David", LastName: "Clark", Email: "david@example.com"},
		{FristName: "Sophia", LastName: "Moore", Email: "sophia@example.com"},
		{FristName: "William", LastName: "Davis", Email: "william@example.com"},
		{FristName: "Emma", LastName: "Thomas", Email: "emma@example.com"},
	}

	for i := range users {
		if err := tx.Create(&users[i]).Error; err != nil {
			tx.Rollback()
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al crear usuarios"})
		}

		// Crear tareas asociadas al usuario
		tasks := []models.Tasks{
			{Title: "Task 1", Description: "Description for Task 1", UserID: users[i].ID},
			{Title: "Task 2", Description: "Description for Task 2", UserID: users[i].ID},
		}

		if err := tx.Create(&tasks).Error; err != nil {
			tx.Rollback()
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al crear tareas"})
		}
	}

	// Commit de la transacción
	tx.Commit()

	return c.JSON(http.StatusCreated, map[string]string{"message": "Seed creada exitosamente"})
}
