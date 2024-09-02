provider "aws" {
  region = "us-east-1"
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name = "ticket-credentials"
}

resource "aws_secretsmanager_secret_version" "db_credentials_version" {
  secret_id     = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username = "postgres",
    password = "S3cur3Pssw0rd2024" 
  })
}

data "aws_secretsmanager_secret" "db_credentials" {
  name = aws_secretsmanager_secret.db_credentials.name
  depends_on = [aws_secretsmanager_secret_version.db_credentials_version]
}

data "aws_secretsmanager_secret_version" "db_credentials_version" {
  secret_id = data.aws_secretsmanager_secret.db_credentials.id
}

resource "aws_rds_cluster" "app_db_cluster" {
  cluster_identifier         = "my-db-cluster"
  engine                     = "aurora-postgresql" 
  engine_version             = "16.3"             
  master_username            = jsondecode(data.aws_secretsmanager_secret_version.db_credentials_version.secret_string)["username"]
  master_password            = jsondecode(data.aws_secretsmanager_secret_version.db_credentials_version.secret_string)["password"]
  backup_retention_period    = 1                  
  skip_final_snapshot        = true
  storage_encrypted          = true
  deletion_protection        = false

  tags = {
    Name = "MinimalCostCluster"
  }

  depends_on = [
    aws_secretsmanager_secret.db_credentials,
    aws_secretsmanager_secret_version.db_credentials_version
  ]
}

resource "aws_rds_cluster_instance" "app_db_instance" {
  count                      = 1                
  identifier                 = "my-db-cluster-instance-${count.index}"
  cluster_identifier         = aws_rds_cluster.app_db_cluster.id
  instance_class             = "db.r5.large"       
  engine                     = "aurora-postgresql"
  engine_version             = aws_rds_cluster.app_db_cluster.engine_version
  publicly_accessible        = false
  auto_minor_version_upgrade = true

  tags = {
    Name = "MinimalCostClusterInstance"
  }
}
