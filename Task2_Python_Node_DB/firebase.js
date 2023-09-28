const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { format } = require('date-fns');
/**********************************************/
// Initialize Firebase
const serviceAccount = require('E:/Client_Server_Firebase/Task2_Python_Node_DB/proj1-443a3-firebase-adminsdk-niwik-8bfde77aa3.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'proj1-443a3.appspot.com'
  });
const db = admin.firestore();

/**********************************************/

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // 10mb files maximum

app.post('/Frame', (req, res) => {
    const {image_data} = req.body;
    const decodedImage = Buffer.from(image_data, 'base64');

    const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');// get timestamp in yyyy-MM-dd-HH-mm-ss Format
    const ImageName = `Frame_${timestamp}.jpg`;
    fs.writeFileSync(ImageName, decodedImage); // download the recieved file 
    uploadImageToStorage(decodedImage, ImageName); // upload the recieved frame to firebase Storage
    res.status(200).json({ message: 'Image uploaded successfully' });
});


async function uploadImageToStorage(imageData, imageName) {// Upload the image to Firebase Storage
    const bucket = admin.storage().bucket();

    const file = bucket.file(imageName);

    await file.save(Buffer.from(imageData, 'base64'), {
        contentType: 'image/jpeg',
    });

    console.log(`Image${imageName} uploaded to Firebase Storage.`);
}

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
/**********************************************/
