import React, { useRef } from 'react';

interface FileUploadProps {
  accept: string;
  label: string;
  onFile: (content: string, fileName: string) => void;
}

const uploadAreaStyle: React.CSSProperties = {
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-xl)',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'var(--transition-fast)',
};

export function FileUpload({ accept, label, onFile }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) onFile(content, file.name);
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  return (
    <div
      style={uploadAreaStyle}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          const content = evt.target?.result as string;
          if (content) onFile(content, file.name);
        };
        reader.readAsText(file, 'UTF-8');
      }}
    >
      <span style={{ fontSize: '2rem' }}>📁</span>
      <p style={{ marginTop: 'var(--spacing-sm)', color: 'var(--color-text-secondary)' }}>{label}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
