import React, {Fragment, useState, useContext} from 'react';
import Icon from './Icon';
import Text from './Text';
import Flex from './Flex';
import FlexItem from './FlexItem';
import {View, Image} from '../primitives';
import FileInput from './FileInput';
import FakeInput from './FakeInput';
import ThemeContext from '../ThemeContext';

/**
 * Photo upload component with preview and removal functionality.
 * Combines file selection with image preview and removal controls.
 * 
 * PhotoInput builds on FileInput to provide specialized photo upload functionality.
 * It displays selected images with a preview thumbnail and includes a removal
 * button. The component handles file state management and provides visual feedback
 * for photo selection and management.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onChangeFile - File state change callback
 * @param {Object} props.fileState - Current file state object
 * @param {string} [props.fileState.preview] - Data URL for image preview
 * @param {string} [props.fileState.filename] - Selected filename
 * @param {File} [props.fileState.file] - File object
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Basic photo upload with preview
 * function ProfilePhotoUpload() {
 *   const [photoState, setPhotoState] = useState({});
 * 
 *   const handlePhotoChange = (fileState) => {
 *     setPhotoState(fileState);
 *     if (fileState.file) {
 *       console.log('Photo selected:', fileState.filename);
 *     } else {
 *       console.log('Photo removed');
 *     }
 *   };
 * 
 *   return (
 *     <Section>
 *       <Chunk><Text type="sectionHead">Profile Photo</Text></Chunk>
 *       
 *       <Chunk>
 *         <PhotoInput
 *           fileState={photoState}
 *           onChangeFile={handlePhotoChange}
 *         />
 *       </Chunk>
 * 
 *       {photoState.file && (
 *         <Chunk>
 *           <Button onPress={() => uploadPhoto(photoState.file)}>
 *             Save Photo
 *           </Button>
 *         </Chunk>
 *       )}
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Form integration with validation
 * function ProductImageForm() {
 *   const [productImage, setProductImage] = useState({});
 *   const [imageError, setImageError] = useState(null);
 * 
 *   const validateImage = (fileState) => {
 *     if (!fileState.file) {
 *       setImageError('Product image is required');
 *       return false;
 *     }
 * 
 *     const maxSize = 5 * 1024 * 1024; // 5MB
 *     if (fileState.file.size > maxSize) {
 *       setImageError('Image must be smaller than 5MB');
 *       return false;
 *     }
 * 
 *     const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
 *     if (!validTypes.includes(fileState.file.type)) {
 *       setImageError('Please select a JPEG, PNG, or WebP image');
 *       return false;
 *     }
 * 
 *     setImageError(null);
 *     return true;
 *   };
 * 
 *   const handleImageChange = (fileState) => {
 *     setProductImage(fileState);
 *     if (fileState.file) {
 *       validateImage(fileState);
 *     } else {
 *       setImageError(null);
 *     }
 *   };
 * 
 *   return (
 *     <Section>
 *       <Chunk>
 *         <Label>Product Image</Label>
 *         <PhotoInput
 *           fileState={productImage}
 *           onChangeFile={handleImageChange}
 *         />
 *         <FieldError error={imageError} />
 *       </Chunk>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Multiple photo upload gallery
 * function PhotoGallery() {
 *   const [photos, setPhotos] = useState([]);
 * 
 *   const addPhoto = (fileState) => {
 *     if (fileState.file) {
 *       setPhotos(prev => [...prev, fileState]);
 *     }
 *   };
 * 
 *   const removePhoto = (index) => {
 *     setPhotos(prev => prev.filter((_, i) => i !== index));
 *   };
 * 
 *   return (
 *     <Section>
 *       <Chunk><Text type="sectionHead">Photo Gallery</Text></Chunk>
 *       
 *       <Chunk>
 *         <PhotoInput
 *           fileState={{}}
 *           onChangeFile={addPhoto}
 *         />
 *       </Chunk>
 * 
 *       {photos.map((photo, index) => (
 *         <Chunk key={index}>
 *           <Flex>
 *             <FlexItem grow>
 *               <Text>{photo.filename}</Text>
 *             </FlexItem>
 *             <FlexItem shrink>
 *               <Button 
 *                 type="secondary" 
 *                 onPress={() => removePhoto(index)}
 *               >
 *                 Remove
 *               </Button>
 *             </FlexItem>
 *           </Flex>
 *         </Chunk>
 *       ))}
 *     </Section>
 *   );
 * }
 */



const PhotoInput = (props) => {
	const { styles } = useContext(ThemeContext);

	const { onChangeFile, fileState, style } = props;
	const [inputKey, setInputKey] = useState(0); // new key resets/rerenders file input

	return(
		<View style={style}>
			<Flex>
				<FlexItem>
					<FileInput
						inputKey={inputKey}
						shape="Camera"
						id="photo"
						placeholder={ fileState.preview ? 'Select a new file' : 'Select a file'}
						onChangeFile={ fileState => {
							onChangeFile(fileState);
						}}
						/>
					{ fileState.preview &&
						<FakeInput
						label="Remove photo"
						shape="X"
						onPress={ ()=>{
							onChangeFile({});
							setInputKey((inputKey+1));
						}}
						/>
					}
				</FlexItem>
				{ fileState.preview &&
					<FlexItem shrink>
						<Image
						source={{uri: fileState.preview }}
						style={[{
							width: 120,
							flex: 1,
							resizeMode: 'cover',
							borderRadius: 4,
							boxSizing: 'content-box'
						}, styles.pseudoLineHeight]}
						/>
					</FlexItem>
				}
			</Flex> 
		</View>
	)
}

export default PhotoInput;