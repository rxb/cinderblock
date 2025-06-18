import React, {Fragment, useContext} from 'react';
import { View, Image } from 'react-native-web';
import Icon from './Icon';
import Text from './Text';
import ThemeContext from '../ThemeContext';

/**
 * File upload input component with preview and custom styling.
 * Provides file selection with filename display and upload state management.
 * 
 * FileInput wraps a native HTML file input with design system styling.
 * It handles file selection, provides filename display, and includes
 * FileReader integration for file preview functionality. The component
 * maintains focus states and provides callbacks for file changes.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.placeholder='Pick a file'] - Placeholder text
 * @param {string} [props.shape='ChevronDown'] - Icon shape for the input
 * @param {Function} [props.onChange] - File input change handler
 * @param {Function} [props.onChangeFile] - File object change handler
 * @param {string|number} [props.inputKey] - Key to force input re-render
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Basic file upload
 * function DocumentUpload() {
 *   const [document, setDocument] = useState(null);
 * 
 *   const handleFileChange = (fileState) => {
 *     setDocument(fileState);
 *     console.log('Selected file:', fileState.filename);
 *     console.log('File data URL:', fileState.preview);
 *   };
 * 
 *   return (
 *     <Chunk>
 *       <Label>Upload Document</Label>
 *       <FileInput
 *         placeholder="Choose a document..."
 *         onChangeFile={handleFileChange}
 *       />
 *       {document?.filename && (
 *         <Text color="success">Selected: {document.filename}</Text>
 *       )}
 *     </Chunk>
 *   );
 * }
 * 
 * @example
 * // Form integration with validation
 * function ResumeUpload() {
 *   const [file, setFile] = useState(null);
 *   const [uploading, setUploading] = useState(false);
 *   const [uploadKey, setUploadKey] = useState(0);
 * 
 *   const handleSubmit = async () => {
 *     if (!file?.file) return;
 * 
 *     setUploading(true);
 *     try {
 *       const formData = new FormData();
 *       formData.append('resume', file.file);
 *       await api.uploadResume(formData);
 *       
 *       // Reset the file input
 *       setFile(null);
 *       setUploadKey(prev => prev + 1);
 *     } catch (error) {
 *       console.error('Upload failed:', error);
 *     }
 *     setUploading(false);
 *   };
 * 
 *   return (
 *     <Section>
 *       <Chunk>
 *         <Label>Resume (PDF, DOC, DOCX)</Label>
 *         <FileInput
 *           inputKey={uploadKey}
 *           placeholder="Select your resume"
 *           onChangeFile={setFile}
 *         />
 *       </Chunk>
 * 
 *       <Chunk>
 *         <Button
 *           onPress={handleSubmit}
 *           loading={uploading}
 *           disabled={!file?.file}
 *         >
 *           Upload Resume
 *         </Button>
 *       </Chunk>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Multiple file types with custom icons
 * function MediaUpload() {
 *   const [selectedFile, setSelectedFile] = useState(null);
 * 
 *   const getIcon = (filename) => {
 *     if (!filename) return 'Upload';
 *     const ext = filename.split('.').pop().toLowerCase();
 *     if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'Image';
 *     if (['pdf'].includes(ext)) return 'FileText';
 *     if (['doc', 'docx'].includes(ext)) return 'File';
 *     return 'File';
 *   };
 * 
 *   return (
 *     <Chunk>
 *       <Label>Upload Media</Label>
 *       <FileInput
 *         placeholder="Select image or document"
 *         shape={getIcon(selectedFile?.filename)}
 *         onChangeFile={setSelectedFile}
 *       />
 *       {selectedFile?.preview && (
 *         <Text>Preview available: {selectedFile.filename}</Text>
 *       )}
 *     </Chunk>
 *   );
 * }
 */



class FileInput extends React.Component {
	static defaultProps = {
		placeholder: 'Pick a file',
		onChange: ()=>{},
		onChangeFile: ()=>{},
	}

	constructor(props){
		super(props);
		this.state ={}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidUpdate(prevProps){
		if(prevProps.inputKey != this.props.inputKey){
			this.setState({
				file: undefined,
				preview: undefined,
				filename: undefined
			});
		}
	}

	handleChange(e){
		const file = e.target.files[0];
		const reader = new FileReader()
		if(file){
			const self = this;
			reader.addEventListener("load", function () {
				const fileState = {
					file: file,
					preview: reader.result,
					filename: e.target.value.split(/(\\|\/)/g).pop(),
				};
				self.setState(fileState)
				self.props.onChangeFile(fileState);
			}, false);
			reader.readAsDataURL(file);
		}
		else{
			this.setState({
				file: undefined,
				preview: undefined,
				filename: undefined
			})
		}
		this.props.onChange(e);
	}

	render() {
		const {
			placeholder,
			shape = "ChevronDown",
			style,
			inputKey,
			...other
		} = this.props;

		return (
			<ThemeContext.Consumer>
			{ ({styles, SWATCHES}) => (

			<View style={[
					styles.input,
					(this.state.hasFocus) ? styles['input--focus'] : {},
					style,
				]}
				>
				{!this.state.filename &&
					<Fragment>
						<Text color="hint">{placeholder}</Text>
						<View style={styles['input-icon']}>
							<Icon shape={shape} color={SWATCHES.textHint} />
						</View>
					</Fragment>
				}
				{this.state.filename &&
					<Fragment>
						<Text color="primary">{this.state.filename}</Text>
						<View style={styles['input-icon']}>
							<Icon shape={shape} color={SWATCHES.textHint} />
						</View>
					</Fragment>
				}


				<input
					key={inputKey}
					type="file"
					onFocus={()=>{
						this.setState({hasFocus: true})
					}}
					onBlur={()=>{
						this.setState({hasFocus: false})
					}}
					onChange={this.handleChange}
					style={{
						position: 'absolute',
						opacity: 0,
						top: 0, left: 0,
						width: '100%',
						height: '100%'
					}}
					/>
			</View>
			)}

			</ThemeContext.Consumer>
		);
	}
}

export default FileInput;