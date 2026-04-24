CREATE TYPE "public"."attachment_type" AS ENUM('image', 'file', 'zip');--> statement-breakpoint
CREATE TABLE "assign_todo_attachments" (
	"attachment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assign_todo_id" uuid NOT NULL,
	"file_url" varchar NOT NULL,
	"public_id" varchar NOT NULL,
	"attachment_type" "attachment_type" DEFAULT 'zip' NOT NULL,
	"file_name" varchar NOT NULL,
	"file_size" varchar,
	"uploaded_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "assign_todo_attachments" ADD CONSTRAINT "assign_todo_attachments_assign_todo_id_assign_todo_assign_todo_id_fk" FOREIGN KEY ("assign_todo_id") REFERENCES "public"."assign_todo"("assign_todo_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assign_todo_attachments" ADD CONSTRAINT "assign_todo_attachments_uploaded_by_users_user_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;