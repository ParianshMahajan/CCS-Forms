const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const ImgurApiURL=process.env.ImgurApiURL;


module.exports.getImgurLink = async function getImgurLink(base64Data){
    const binaryData = Buffer.from(base64Data, 'base64');
    const apiUrl = ImgurApiURL;

    try {
        const response = await axios.post(apiUrl, binaryData, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });
        const link = response.data.data.link;
        return link;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
