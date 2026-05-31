import multer from "multer"

export const storage  = multer.diskStorage({
    destination: "public/uploads",
    filename(req, file, callback) {

        const parts = file.originalname.split("."); // [students, router, ts]
        const ext = file.originalname.split(".")[parts.length - 1];
        const fileName = `${file.originalname}-${Date.now()}.${ext}`;

        if (file.originalname === "Test.txt") {
            callback(new Error("File already exists"), "");
        } else {
            callback(null, fileName);
        }
    }
})