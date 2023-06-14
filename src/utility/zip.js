import JSZip from 'jszip';


export default function zipFiles(files, formData) {
    const zip = new JSZip();

    for (const file of files) {
        zip.file(file.name, file);
    }

    return zip;
}