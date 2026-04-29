// import NodeClam from "clamscan";

// let clamscan: any;

// /**
//  * Initialize ClamAV connection
//  */
// export const initScanner = async () => {
//     try {
//         clamscan = await new NodeClam().init({
//             clamdscan: {
//                 socket: false,
//                 host: "127.0.0.1",
//                 port: 3310,
//                 timeout: 60000,
//             },
//         });

//         console.log("ClamAV Scanner initialized");
//     } catch (error) {
//         console.error("Failed to initialize scanner", error);
//         throw error;
//     }
// };

// /**
//  * Getter for scanner instance
//  */
// export const getScanner = () => {
//     if (!clamscan) {
//         throw new Error("Scanner not initialized. Call initScanner first.");
//     }
//     return clamscan;
// };
