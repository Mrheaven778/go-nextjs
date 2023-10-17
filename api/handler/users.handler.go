package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/mrheaven/go-nextjs/db"
	"github.com/mrheaven/go-nextjs/models"
	"gorm.io/gorm"
)

func GetUsersHandler(c echo.Context) error {
	var users []models.User
	db.DB.Find(&users)
	return c.JSON(http.StatusOK, users)
}

func GetUserHandler(c echo.Context) error {
	// Obtener el ID de la URL
	id := c.Param("id")

	// Crear una variable para almacenar el usuario
	var user models.User

	// Buscar el usuario por ID

	// Verificar si el usuario no fue encontrado
	if result := db.DB.First(&user, id); result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Usuario no encontrado"})
		}
		// Otro error, devolver un mensaje de error genérico
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al buscar el usuario"})
	}

	db.DB.Model(&user).Association("Tasks").Find(&user.Tasks)

	// Devolver el usuario encontrado como respuesta JSON
	return c.JSON(http.StatusOK, user)
}

func PostUserHandler(c echo.Context) error {
	var user models.User

	// Decodificar el cuerpo de la solicitud JSON en la estructura User
	if err := json.NewDecoder(c.Request().Body).Decode(&user); err != nil {
		fmt.Println("Error al decodificar el JSON:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Error de decodificación JSON"})
	}

	// Crear el usuario en la base d&userse datos
	result := db.DB.Create(&user)
	if result.Error != nil {
		fmt.Println("Error al crear el usuario en la base de datos:", result.Error)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al crear el usuario"})
	}

	return c.JSON(http.StatusCreated, user)
}

func DeleteUserHandler(c echo.Context) error {
	// Obtener el ID de la URL
	id := c.Param("id")

	// Verificar si el usuario existe antes de intentar eliminarlo
	var existingUser models.User
	if result := db.DB.First(&existingUser, id); result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			// El usuario no existe, devolver un mensaje de error
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Usuario no encontrado"})
		}
		// Otro error, devolver un mensaje de error genérico
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al buscar el usuario"})
	}

	// Eliminar el usuario
	if err := db.DB.Unscoped().Delete(&existingUser).Error; err != nil {
		// Error al eliminar el usuario, devolver un mensaje de error
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error al eliminar el usuario"})
	}

	// Devolver una respuesta de éxito
	return c.JSON(http.StatusOK, map[string]string{"message": "Usuario eliminado exitosamente"})
}
