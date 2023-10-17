package models

import "gorm.io/gorm"

type User struct {
	gorm.Model

	FristName string  `gorm:"not null" json:"firstname"`
	LastName  string  `gorm:"not null" json:"lastname"`
	Email     string  `gorm:"not null;unique_index" json:"email"`
	Tasks     []Tasks `json:"tasks"`
}
