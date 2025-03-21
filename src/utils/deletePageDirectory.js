import fs from 'fs';
import path from 'path';

const deletePageDirectory = async (dirPath) => {
    try {
        // Check if the directory exists before attempting to delete
        if (fs.existsSync(dirPath)) {
            await fs.promises.rm(dirPath, { recursive: true, force: true });
            console.log(`Directory deleted successfully: ${dirPath}`);
        } else {
            console.log(`Directory does not exist: ${dirPath}`);
        }
    } catch (err) {
        throw new Error(`Failed to delete directory: ${err.message}`);
    }
};

export default deletePageDirectory;
