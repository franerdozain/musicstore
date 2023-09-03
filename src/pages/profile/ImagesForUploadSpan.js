const ImagesForUploadSpan = ({ productDetail }) => {
    return (
        <div className="mx-auto">
            Selected Files:
            <ul>
                {productDetail.Images.fileNames.map((fileName, index) => (
                    <li key={index}>{fileName}</li>
                ))}
            </ul>
        </div>
    )
}
export default ImagesForUploadSpan;