CREATE TABLE `checkins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fecha` timestamp NOT NULL,
	`estado_animo` int,
	`craving` int,
	`notas` text,
	`biometrics` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `checkins_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `relapse_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fecha` timestamp NOT NULL,
	`trigger_tags` text,
	`contexto` text,
	`impacto_economico` varchar(20),
	`reinicio_clean_streak` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `relapse_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `substance_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tipo_sustancia` enum('nicotina','metanfetamina') NOT NULL,
	`unidad` varchar(20) NOT NULL,
	`precio_unitario` varchar(20) NOT NULL,
	`moneda` varchar(3) NOT NULL,
	`fecha_inicio_abstinencia` varchar(10) NOT NULL,
	`ajustes_personalizados` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `substance_config_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fecha` varchar(10) NOT NULL,
	`ejercicios` text,
	`calorias_estimadas` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `workouts_id` PRIMARY KEY(`id`)
);
