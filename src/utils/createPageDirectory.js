import fs from 'fs';
import path from 'path';

const createOrUpdatePage = async (dirPath, htmlContent = null, cssContent = null) => {
    try {
        // Ensure the directory exists
        const uniqueKey = Date.now(); // Unique key to avoid conflicts

        await fs.promises.mkdir(dirPath, { recursive: true });

        const indexPath = path.join(dirPath, 'index.html');
        const stylePath = path.join(dirPath, 'style.css');

        // Default HTML template
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Page</title>
    <link rel="stylesheet" href="style.css?v=${uniqueKey}">
</head>
<body>
    ${htmlContent || ''}
</body>
</html>`;

        const css = cssContent || '';

        // Write/Update files
        await fs.promises.writeFile(indexPath, html, 'utf8');
        await fs.promises.writeFile(stylePath, css, 'utf8');

        console.log('Page created/updated successfully:', dirPath);
    } catch (err) {
        throw new Error(`Failed to create/update page: ${err.message}`);
    }
};

export default createOrUpdatePage;
