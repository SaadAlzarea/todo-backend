// import { Worker } from "bullmq";
// import { eq } from "drizzle-orm";
// import { AssignTodoAttachment, db } from "../../db";
// import { EAssignTodoAttachment } from "../../definition/enums/assignTodo.enum";
// import { ClamAVService } from "../scanner/clamav.service";
// import { redisConnection } from "./redis";
// import type { ScanAttachmentJob } from "./types";

// export const scanWorker = new Worker(
//     "scan-attachments",
//     async (job: ScanAttachmentJob) => {
//         const { attachment_id, file_key } = job.data;

//         console.log(` status : ${EAssignTodoAttachment.SCANNING}. `, file_key);

//         /**
//          * !=========================!
//          * TODO : add ur scan here.
//          * !=========================!
//          */

//         const scanner = new ClamAVService();

//         const result = await scanner.scanFile(file_key);

//         if (!result.isSafe) {
//             console.log("Infected file:", result.viruses);
//             await db
//                 .update(AssignTodoAttachment)
//                 .set({ status: EAssignTodoAttachment.REJECTED })
//                 .where(eq(AssignTodoAttachment.attachment_id, attachment_id));
//         } else {
//             await db
//                 .update(AssignTodoAttachment)
//                 .set({ status: EAssignTodoAttachment.READY })
//                 .where(eq(AssignTodoAttachment.attachment_id, attachment_id));
//         }

//         console.log(` status : ${EAssignTodoAttachment.READY} and done scan is ${result.isSafe}.`);
//     },
//     {
//         connection: redisConnection,
//         concurrency: 5,
//     },
// );
import { Worker } from "bullmq";
import { eq } from "drizzle-orm";
import { AssignTodoAttachment, db } from "../../db";
import { EAssignTodoAttachment } from "../../definition/enums/assignTodo.enum";
import { ClamAVService } from "../scanner/clamav.service";
import { redisConnection } from "./redis";
import type { ScanAttachmentJob } from "./types";

const scanner = new ClamAVService();

export const scanWorker = new Worker(
    "scan-attachments",
    async (job) => {
        console.log("🔥 SCAN WORKER IS RUNNING");
        const { attachment_id, file_key } = job.data;

        console.log("job received:", file_key);

        // * SCANNING
        await db
            .update(AssignTodoAttachment)
            .set({ status: EAssignTodoAttachment.SCANNING })
            .where(eq(AssignTodoAttachment.attachment_id, attachment_id));

        // * SCAN
        // const scanner = new ClamAVService();
        // const result = await scanner.scanFile(file_key);

        // just for stop error
        const stopErorIsSafe = true;
        // * RESULT

        // if (!result.isSafe) {
        if (stopErorIsSafe) {
            await db
                .update(AssignTodoAttachment)
                .set({ status: EAssignTodoAttachment.REJECTED })
                .where(eq(AssignTodoAttachment.attachment_id, attachment_id));

            return;
        }

        await db
            .update(AssignTodoAttachment)
            .set({ status: EAssignTodoAttachment.READY })
            .where(eq(AssignTodoAttachment.attachment_id, attachment_id));

        console.log("scan done");
    },
    {
        connection: redisConnection,
        concurrency: 5,
    },
);
