package internal

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func (r Route) GetTask(c *gin.Context) {
	taskIdStr := c.Param("task_id")
	taskID, err := strconv.Atoi(taskIdStr)
	if err != nil {
		c.String(http.StatusBadRequest, "invalid task_id %s: %w", taskIdStr, err)
		return
	}
	task := Task{}
	err = r.db.Where("id = ?", taskID).Find(&task).Error
	if err != nil {
		c.String(http.StatusInternalServerError, "query task failed: %w", err)
		return
	}
	if task.ID == 0 {
		c.Status(http.StatusNotFound)
		return
	}
	c.JSON(http.StatusOK, task)
	return
}

func (r Route) CreateTask(c *gin.Context) {
	req := struct {
		Title string `form:"title" binding:"required"`
	}{}
	if err := c.Bind(&req); err != nil {
		return
	}
	task := Task{
		Title: req.Title,
	}
	if err := r.db.Create(&task).Error; err != nil {
		c.String(http.StatusInternalServerError, "create task failed: %w", err)
		return
	}
}

func (r Route) GetTaskList(c *gin.Context) {
	tasks := []Task{}
	err := r.db.Order("id desc").Find(&tasks).Error
	if err != nil {
		c.String(http.StatusInternalServerError, "query tasks failed: %w", err)
		return
	}
	c.JSON(http.StatusOK, tasks)
	return
}

func (r Route) GetTaskStatus(c *gin.Context) {
	taskIdStr := c.Param("task_id")
	taskID, err := strconv.Atoi(taskIdStr)
	if err != nil {
		c.String(http.StatusBadRequest, "invalid task_id %s: %w", taskIdStr, err)
		return
	}
	students := []Student{}
	err = r.db.Find(&students).Error
	if err != nil {
		c.String(http.StatusInternalServerError, "query students failed: %w", err)
		return
	}

	type TaskStatus struct {
		TaskID      uint   `json:"task_id"`
		StudentID   uint   `json:"student_id"`
		StudentName string `json:"student_name"`
		Status      string `json:"status"`
	}
	result := []TaskStatus{}
	for _, v := range students {
		result = append(result, TaskStatus{
			TaskID:      0,
			StudentID:   v.ID,
			StudentName: v.Name,
			Status:      "ACTIVE",
		})
	}
	savedStatus := []TaskStatus{}
	err = r.db.Where("task_id = ?", taskID).Find(&savedStatus).Error
	if err != nil {
		c.String(http.StatusInternalServerError, "queyr task status failed: %w", err)
		return
	}
	for _, v := range savedStatus {
		for i, r := range result {
			if r.StudentID == v.StudentID {
				result[i].TaskID = v.TaskID
				result[i].Status = v.Status
			}
		}
	}
	c.JSON(http.StatusOK, result)
	return
}

func (r Route) UpdateTaskStatus(c *gin.Context) {
	req := struct {
		TaskID      uint   `form:"task_id" binding:"required" json:"task_id"`
		StudentName string `form:"student_name" binding:"required" json:"student_name"`
		Status      string `form:"status" binding:"required" json:"status"`
	}{}
	if err := c.Bind(&req); err != nil {
		return
	}
	status := TaskStatus{}
	err := r.db.Where("task_id = ?", req.TaskID).Where("student_name = ?", req.StudentName).Find(&status).Error
	if err != nil {
		c.String(http.StatusInternalServerError, "query status failed: %w", err)
		return
	}
	fmt.Println(status)
	if status.ID == 0 {
		student := Student{}
		if err := r.db.Where("name = ?", req.StudentName).Find(&student).Error; err != nil {
			c.String(http.StatusInternalServerError, "query student failed: %w", err)
			return
		}
		if student.ID == 0 {
			c.String(http.StatusBadRequest, "query student notfound: %w", err)
			return
		}

		status.Status = req.Status
		status.TaskID = req.TaskID
		status.StudentName = req.StudentName
		status.StudentID = student.ID
		err := r.db.Create(&status).Error
		if err != nil {
			c.String(http.StatusInternalServerError, "create status failed: %w", err)
			return
		}
	} else {
		if status.Status != req.Status {
			status.Status = req.Status
			if err := r.db.Save(&status).Error; err != nil {
				c.String(http.StatusInternalServerError, "update status failed: %w", err)
				return
			}
		}
	}
}

func (r Route) DelTask(c *gin.Context) {
	taskIdStr := c.Param("task_id")
	taskID, err := strconv.Atoi(taskIdStr)
	if err != nil {
		c.String(http.StatusBadRequest, "invalid task_id %s: %w", taskIdStr, err)
		return
	}
	if err := r.db.Delete(&Task{}, taskID); err != nil {
		c.String(http.StatusInternalServerError, "delete task failed: %w", err)
		return
	}
}
