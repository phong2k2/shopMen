import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { ImageList, ImageListItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { TextField } from '@mui/material';

function UploadMultipleImages({validate, name, onImagesSelected, handleRemoveImg, listAvatar}) {
    const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
        onImagesSelected(acceptedFiles);
    },
    multiple: true,
    });
    
    return (
        <>
            <div {...getRootProps()} style={dropzoneStyle}>
                <input
                    {...getInputProps()} 
                    {...validate}
                />
                <p>Thả hoặc chọn nhiều ảnh từ máy tính của bạn</p>
            </div>
                <ImageList sx={{ width: '100%', margin: 0 }} cols={4} gap={8} rowHeight={40}>
                    {listAvatar?.map((file, index) => (
                        <ImageListItem key={index} sx={{width: '100%', height: '100% !important'}}>
                            <IconButton
                                aria-label="close"
                                onClick={()=>handleRemoveImg(file.name)}
                                sx={{
                                    position: 'absolute',
                                    right: 2,
                                    top: 2,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                                >
                                <CloseIcon sx={{
                                    color: 'red',
                                    'fontSize': 20
                                }} />
                                </IconButton>
                            <img
                                srcSet={`${file.preview}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={file.preview}
                                alt={file.path} 
                                loading="lazy"
                              />    
                        </ImageListItem>
                    ))}
                </ImageList>
        </>
    );
}
const dropzoneStyle = {
    border: '2px dashed #0087F9',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

UploadMultipleImages.propTypes = {
    onImagesSelected: PropTypes.func,
    listAvatar: PropTypes.array,
    handleRemoveImg: PropTypes.func,
    validate: PropTypes.object,
    errors: PropTypes.any,
    name: PropTypes.string,
}

export default UploadMultipleImages;