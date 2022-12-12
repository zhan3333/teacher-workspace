package internal

import (
	"gorm.io/gorm"
	"time"
)

type Task struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Title     string         `json:"title"`
}

type Student struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Name      string         `json:"name"`
	GroupName string         `json:"group_name"`
}

type TaskStatus struct {
	ID          uint           `json:"id" gorm:"primarykey"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	TaskID      uint           `json:"taskID" gorm:"index"`
	StudentID   uint           `json:"student_id"`
	StudentName string         `json:"student_name"`
	// ACTIVE / DONE
	Status string `json:"status"`
}
