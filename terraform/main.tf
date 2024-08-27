provider "aws" {
  region = "us-east-1"
}

resource "aws_db_instance" "app_db" {
    allocated_storage = 10
    engine = "postgres"
    engine_version = "13.3"
    instance_class = "db.t2.micro"
    username = var.db_name
    password = var.db_password
    parameter_group_name = "default.postgres13"
    skip_final_snapshot  = true

    backup_retention_period = 0 
    storage_type            = "gp2"

    tags = {
        Name = "FreeTierPostgresDB"
    }
}