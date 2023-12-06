import { Editor } from "@tinymce/tinymce-react";
import PropTypes from 'prop-types'
import { useEffect, useRef } from "react";

function TextArea({field, error}) {
  const editorRef = useRef(null)
  useEffect(() => {
   
    if (editorRef.current) {
      editorRef.current.setContent('');
    }
  }, []);
  const containerStyle = {
    border: error ? "1px solid red" : "1px solid #ccc",
    borderRadius: "4px",
  };

  return ( 
     <div style={containerStyle}>
        <Editor
        error={error}
        value={field?.value}
        onEditorChange={(newText) => field.onChange(newText)}
        apiKey='jfrjgu6zjtuyfx7bn7hf4nfq4u7yis668ofqzdgswj3x2bw9'
        onInit={(evt, editor) => editorRef.current = editor}
        // initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 300,
          // selector: 'textarea#open-source-plugins',
          plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
          editimage_cors_hosts: ['picsum.photos'],
          menubar: 'file edit view insert format tools table help',
          // toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
          autosave_ask_before_unload: true,
          // autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          // autosave_retention: '2m',
          image_advtab: true,
          link_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
          ],
          importcss_append: true,
          file_picker_callback: (callback, value, meta) => {
            /* Provide file and text for the link dialog */
            if (meta.filetype === 'file') {
              callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            }
  
            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
              callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
            }
          },
          image_caption: true,
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image table',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
        }}
      />
     </div>
    );
}

TextArea.propTypes = ({
  field: PropTypes.object,
  error: PropTypes.bool
})

export default TextArea;