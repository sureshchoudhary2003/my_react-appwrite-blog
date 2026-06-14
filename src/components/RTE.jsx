import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name,control,label,defaultValue = ""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>
        {label}</label>}
        <Controller
            name={name}
            control={control}
            render={({field: {onChange}}) => (
                <Editor
                    apiKey='5ymrpj2mq6cx176lxmlfgu0epd40loayf2am5qd1q9q7fmxd'

                    // onInit={ (_evt, editor) => editorRef.current = editor }

                    initialValue={defaultValue}
                    init={{
                        branding:false,
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={onChange}
                />
            )}
        />
        
    </div>
  )
}

export default RTE