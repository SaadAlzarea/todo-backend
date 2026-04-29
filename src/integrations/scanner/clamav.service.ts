// import { getScanner } from "./scanner.init";

// export class ClamAVService {
//     /**
//      * Scan file from local path
//      */
//     async scanFile(filePath: string): Promise<{
//         isSafe: boolean;
//         viruses: string[] | null;
//     }> {
//         const scanner = getScanner();

//         try {
//             const result = await scanner.scanFile(filePath);

//             const isInfected = result.isInfected;

//             if (isInfected) {
//                 return {
//                     isSafe: false,
//                     viruses: result.viruses || [],
//                 };
//             }

//             return {
//                 isSafe: true,
//                 viruses: null,
//             };
//         } catch (error) {
//             console.error("Scan failed:", error);

//             // treat as unsafe for safety
//             return {
//                 isSafe: false,
//                 viruses: ["scan_error"],
//             };
//         }
//     }

//     /**
//      * Scan buffer (optional helper)
//      */
//     async scanBuffer(buffer: Buffer): Promise<boolean> {
//         const scanner = getScanner();

//         const result = await scanner.scanBuffer(buffer);

//         return !result.isInfected;
//     }
// }
