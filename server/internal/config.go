package internal

import "fmt"

type Config struct {
  DB DB
}

type DB struct {
  Addr     string
  User     string
  Password string
  DB       string
}

func (d DB) DSN() string {
  return fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", d.User, d.Password, d.Addr, d.DB)
}
