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

    // For each file in the zip, convert it to a blob URL
    const files = [];
    await Promise.all(
        // retrieves filenames from zip and map to array promises
        // where each promise represents the extraction of a file.
        Object.keys(zip.files).map(async (filename) => {
            const fileData = await zip.files[filename].async('blob');
            const fileType = getFileExt(filename);
            const imageUrl = URL.createObjectURL(
                new Blob([fileData], { type: `image/${fileType}` })
            );
            files.push({ filename, data: imageUrl});
        })
    );

    return files;
};

const getFileExt = (filename) => {
    let file_ext = filename.split('.').pop();
    if (file_ext === 'jpg') {
        return file_ext = 'jpeg';
    }
    return file_ext;
}
