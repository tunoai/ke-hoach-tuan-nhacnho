import * as ftp from "basic-ftp";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
        console.log("Connecting to FTP...");
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            secure: false
        });
        
        console.log("Connected successfully!");
        
        const ftpDir = process.env.FTP_DIR;
        const localDir = path.join(__dirname, "dist");
        
        console.log(`Ensuring target directory exists: ${ftpDir}`);
        await client.ensureDir(ftpDir);
        await client.clearWorkingDir();
        
        console.log(`Uploading files from ${localDir} to ${ftpDir}...`);
        await client.uploadFromDir(localDir);
        
        console.log("Upload completed successfully!");
    }
    catch(err) {
        console.error("Upload failed:", err);
    }
    finally {
        client.close();
    }
}

deploy();
