ALTER TABLE "assign_todo" ADD COLUMN "isCompleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "isCompleted" boolean DEFAULT false NOT NULL;