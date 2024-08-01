import React, { forwardRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface MyEditorProps {
  forwardedRef: React.Ref<Editor>;
  [key: string]: any;
}

const MyEditor = forwardRef<Editor, MyEditorProps>((props, ref) => {
  const { forwardedRef, ...rest } = props;

  return (
    <Editor
      {...rest}
      ref={forwardedRef}
    />
  );
});

MyEditor.displayName = 'MyEditor';

export default MyEditor;