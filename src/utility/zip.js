import JSZip from 'jszip';


export const zipFiles = async (files) => {
    const zip = new JSZip();

    for (const file of files) {
        zip.file(file.name, file);
    }

    return await convertZipToBlob(zip);
}

const convertZipToBlob = (zip) => {
    return new Promise(
        (resolve, reject) => {
            zip.generateAsync({ type: 'blob' })
                .then(blob => { resolve(blob); })
                .catch(error => { reject(error); });
    });
}

export const unzipBlob = async (blob) => {
    const zipData = await new Response(blob).arrayBuffer();
    const zip = await JSZip.loadAsync(zipData);

    const files = [];
    await Promise.all(
        // retrieves filenames from zip and map to array promises
        // where each promise represents the extraction of a file.
        Object.keys(zip.files).map(async (filename) => {
            const fileData = await zip.files[filename].async('blob');
            const fileType = zip.files[filename].comment;
            files.push({ filename, data: fileData, type: fileType});
        })
    );

    return files;
};
