import React from "react";

const TesseractFileReaderForm = () => {
    const handleInputFileChange = (e) => {
        console.log(e)
        var file = e.files[0];

        Tesseract.recognize(
            file,
            'cat',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            const re = new RegExp(/(0?[1-9]|[12][0-9]|3[01])[.\/\-](0?[1-9]|1[012])[.\/\-](\d{4}|\d{2})/);
            const datesFound = text.match(re);
            if (datesFound) {
                console.log('Date: ' + datesFound[0]);
            }
            console.log(text);
        });
    }

    return (
        <form name="tesseractForm" action="JavaScript:handleTesseractSubmitFile()">
            <input type="file" name="filename" accept="image/*" onChange={handleInputFileChange} />
            <input type="submit" />
        </form>
    );
}

export default TesseractFileReaderForm;
