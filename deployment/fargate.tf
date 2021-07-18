resource "aws_ecs_task_definition" "backend_task" {
  family = "backend_${var.appname}_family"

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"

  memory = "512"
  cpu    = "256"

  execution_role_arn = aws_iam_role.ecs_role.arn
  task_role_arn = aws_iam_role.ecs_role.arn

  container_definitions = jsonencode([
    {
      name : "${var.appname}_container",
      image : var.ecr_image_uri,
      memory : 512,
      essential : true,
      portMappings : [
        {
          containerPort : 4000,
          hostPort : 4000
        }
      ],
      logConfiguration : {
        logDriver : "awslogs",
        options:{
          "awslogs-region": var.aws_region
          "awslogs-group" : "ecs_api"
          "awslogs-stream-prefix": var.appname
        }
      },
      secrets: [
        {
          name: "secrets",
          valueFrom: "${aws_secretsmanager_secret.lastSeenCredentials.arn}"
        }
      ]
    }
  ])
}

resource "aws_cloudwatch_log_group" "ecs_api" {
  name = "ecs_api"
}

resource "aws_ecs_cluster" "backend_cluster" {
  name = "backend_cluster_${var.appname}"
}

resource "aws_ecs_service" "backend_service" {
  name = "backend_service"

  cluster         = aws_ecs_cluster.backend_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn

  launch_type   = "FARGATE"
  desired_count = 1

  network_configuration {
    subnets          = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]
    security_groups  = ["${aws_security_group.security_group_lastseen.id}"]
    assign_public_ip = true
  }
}