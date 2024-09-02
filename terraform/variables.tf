variable "db_name" {
  type        = string
  description = "Postgres Database Name"
  default     = "ticket"
}

variable "db_username" {
  type        = string
  description = "The master username for the RDS PostgreSQL database."
  default     = "postgres"
}

variable "db_password" {
  type        = string
  description = "The master password for the RDS PostgreSQL database"
  sensitive   = true
  default     = "n#jpxw%fRzYl5]4N2H"
}
