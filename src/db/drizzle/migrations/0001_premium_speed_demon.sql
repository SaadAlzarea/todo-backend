ALTER TABLE "group_members" ALTER COLUMN "group_member_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "group_members" ALTER COLUMN "group_member_role" DROP DEFAULT;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_group" ON "group_members" USING btree ("user_id","group_id");