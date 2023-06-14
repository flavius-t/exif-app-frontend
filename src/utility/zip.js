import JSZip from 'jszip';


export const zipFiles = (files) => {
    const zip = new JSZip();

    for (const file of files) {
        zip.file(file.name, file);
    }

    return zip;
}

export const convertZipToBlob = (zip) => {
    return new Promise(
        (resolve, reject) => {
            zip.generateAsync({ type: 'blob' })
            .then(blob => {
                resolve(blob);
        })
        .catch(error => {
            reject(error);
        });
    });
}
