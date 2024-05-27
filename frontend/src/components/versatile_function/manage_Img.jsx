import { useRef, useState } from "react";
import { API_URL } from "../../config";
import { useAppContext } from "../../contexts/UseAppContext";



export const Manage_Img = () => {

    const { setHiddenConnection, promiseIdentifiedUser, addErrorMessage } = useAppContext()

    const hiddenFileInput = useRef(null);

    const [img, setImg] = useState([]);
    const [imgUpload, setImgUpload] = useState([]);
    const [items, setItems] = useState([]);

    const handleDownload = async (e) => {
        // Hide any UI elements related to the download process
        //setIsVisible(false);

        if (!promiseIdentifiedUser) {
            return setHiddenConnection(true)
        }

        try {
            // Download the image data from the URL
            const response = await fetch(e);
            const imageBlob = await response.blob();

            // Create a URL for the blob
            const imageUrl = window.URL.createObjectURL(imageBlob);

            // Extract filename from the URL
            const filename1 = e.split(`${API_URL}`)[1];
            const filename2 = filename1.split('/')[0];
            const filename = e.split(`/${filename2}/`)[1];

            // Create a link element for downloading the image
            const link = document.createElement('a');
            link.href = imageUrl; // Set the URL to the blob
            link.download = filename; // Set the filename for the downloaded file
            document.body.appendChild(link); // Append the link to the document body
            link.click(); // Simulate a click on the link to initiate download
            document.body.removeChild(link); // Remove the link from the document body after download
            addErrorMessage(`L'image à bien été téléchagé.`, 5000, '#396afc')
        } catch (error) {
            // Handle any errors that occur during the download process
            console.error('Error while downloading the image:', error);
        }
    };

    // Using a custom button to choose an image
    const handleClick = async () => {
        hiddenFileInput.current.click();
    };


    // Upload images, and create blobs
    const handleLoad = (event) => {
        const fileUploaded = event.target.files;
        const filesWithNames = Array.from(fileUploaded).map((imgFile, index) => ({
            name: fileUploaded[index]?.name,
            file: URL.createObjectURL(imgFile),
        }));
        setImg((img) => Array.from(new Set([...img, ...filesWithNames])).splice(0, 200 - items?.length));
        setImgUpload(Array.from(new Set([...imgUpload, ...fileUploaded])).splice(0, 200 - items?.length));
    };

    // Delete the displayed and saved image 1 by 1
    const handleRemoveImgUpload = (name, val) => {
        const filteredPromise = img?.filter((array) => array != name);
        setImg(filteredPromise);
        imgUpload.splice(val, 1);
    }

    // Delete the displayed and saved image
    const removeImage = async () => {
        setImg(Array.from(new Set([])));
        setImgUpload(Array.from(new Set([])));
    };


    return {
        hiddenFileInput,

        img,
        imgUpload,
        items,
        setItems,

        handleDownload,
        handleClick,
        handleLoad,
        handleRemoveImgUpload,
        removeImage

    }
}