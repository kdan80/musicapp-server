import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';


const router = express.Router();

router.get('/', (req: Request, res: Response) => {

});

export default router;

// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const {Video} = require("../models/video");

// const router = express.Router();

// router.get("/:v_id", async(req,res) => {
//     try { 
//         // Find video by v_id
//         const filter = { v_id: req.params.v_id};
//         const video = await Video.findOne(filter);

//         // If the video does not exist throw an error
//         if(!video) throw new Error("Video not found");
//         const videoPath = `${video.filePath}/${video.fileName}`;

//         const range = req.headers.range;
//         if (!range) {
//             res.status(400).send("Requires Range header");
//         }

//         // Get video metadata
//         const videoSize = fs.statSync(videoPath).size;

//         const CHUNK_SIZE = 10 ** 6; // 1MB
//         const start = Number(range.replace(/\D/g, ""));
//         const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//          // Create headers
//         const contentLength = end - start + 1;
//         const headers = {
//             "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//             "Accept-Ranges": "bytes",
//             "Content-Length": contentLength,
//             "Content-Type": "video/mp4",
//         };

//        // HTTP Status 206 for Partial Content
//         res.writeHead(206, headers);

//         // create video read stream for this particular chunk
//         const videoStream = fs.createReadStream(videoPath, { start, end });

//         // Stream the video chunk to the client
//         videoStream.pipe(res);

//     } catch(err){
//         res.status(404).send(err.message)
//     } 
// });

// module.exports = router;