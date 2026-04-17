CREATE TABLE "group_projects" (
	"project_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"project_deadline" timestamp,
	"group_id" uuid NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assign_todo" ADD COLUMN "project_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "group_projects" ADD CONSTRAINT "group_projects_group_id_groups_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("group_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_projects" ADD CONSTRAINT "group_projects_created_by_users_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_group_project" ON "group_projects" USING btree ("group_id","project_name");--> statement-breakpoint
ALTER TABLE "assign_todo" ADD CONSTRAINT "assign_todo_project_id_group_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."group_projects"("project_id") ON DELETE cascade ON UPDATE no action;