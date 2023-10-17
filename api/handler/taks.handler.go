package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/mrheaven/go-nextjs/db"
	"github.com/mrheaven/go-nextjs/models"
	"gorm.io/gorm"
)

func GetTasksHandler(c echo.Context) error {
	var tasks []models.Tasks
	if err := db.DB.Find(&tasks).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al obtener tareas"})
	}
	return c.JSON(http.StatusOK, tasks)
}

func PostTasksHandler(c echo.Context) error {
	var task models.Tasks

	if err := json.NewDecoder(c.Request().Body).Decode(&task); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Error de decodificacion JS"})
	}

	if task.Title == "" || task.Description == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Title y Description son campos obligatorios"})
	}

	if result := db.DB.Create(&task); result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al crear el usuario"})
	}

	return c.JSON(http.StatusCreated, task)
}

func GetTaskHandler(c echo.Context) error {
	var task models.Tasks
	id := c.Param("id")

	result := db.DB.First(&task, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Tarea no encontrado"})
		}
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Error al buscar la terea"})
	}

	return c.JSON(http.StatusOK, task)
}

func DeleteTasksHandler(c echo.Context) error {
	var task models.Tasks
	id := c.Param("id")

	result := db.DB.First(&task, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Tarea no encontrado"})
		}
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Error al buscar la terea"})
	}
	db.DB.Unscoped().Delete(&task, id)

	return c.JSON(http.StatusOK, task)
}
