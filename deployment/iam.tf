# ecs
resource "aws_iam_role" "ecs_role" {
  name = "ecs_role_${var.appname}"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
}
POLICY
}

resource "aws_iam_role_policy_attachment" "ecs_policy_attachment" {
  role       = aws_iam_role.ecs_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy" "password_policy_secretsmanager" {
  name = "password-policy-secretsmanager"
  role = aws_iam_role.ecs_role.id

  policy = jsonencode({

    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "secretsmanager:GetSecretValue",
        "kms:Decrypt"
        ]
        Effect = "Allow"
        Resource = [
          aws_secretsmanager_secret.lastSeenCredentials.arn
        ]
      }
    ]
  })
}
