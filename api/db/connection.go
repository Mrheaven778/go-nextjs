package db

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	// Inicializar la conexión a la base de datos al cargar el paquete
	err := dbConnection()
	if err != nil {
		fmt.Println("Error al conectar a la base de datos:", err)
	}
}

func dbConnection() error {
	// Cargar variables de entorno desde el archivo .env
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error al cargar el archivo .env")
		return err
	}

	// Obtener valores de las variables de entorno
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbname := os.Getenv("DB_NAME")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")

	// Construir la cadena de conexión DSN
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", host, user, password, dbname, port)

	// Conectar a la base de datos
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Error al conectar a la base de datos:", err)
		return err
	}

	fmt.Println("Conexión exitosa a la base de datos por el port " + port)

	return nil
}
