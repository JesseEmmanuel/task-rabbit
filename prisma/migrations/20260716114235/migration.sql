/*
  Warnings:

  - Added the required column `assigned_by_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignee_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assigned_by_id" TEXT NOT NULL,
ADD COLUMN     "assignee_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigned_by_id_fkey" FOREIGN KEY ("assigned_by_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
