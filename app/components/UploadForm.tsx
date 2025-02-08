'use client';

import { useState } from 'react';
import { uploadFile } from '../actions/uploadFile';

export default function UploadForm() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setUploading(true);
      setError(null);
      setSuccess(false);

      const result = await uploadFile(formData);

      if (result.success) {
        setSuccess(true);
        // Reset the form
        const form = document.getElementById('uploadForm') as HTMLFormElement;
        if (form) form.reset();
      } else {
        setError(result.error || 'Failed to upload file');
      }
    } catch (err) {
      setError('An error occurred while uploading the file');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      id="uploadForm"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        handleSubmit(formData);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Patient History File (PDF)
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".pdf"
          required
          disabled={uploading}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className={`w-full p-2 rounded text-white transition-colors ${
          uploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>

      {error && (
        <p className="mt-4 text-center text-red-600">{error}</p>
      )}

      {success && (
        <p className="mt-4 text-center text-green-600">
          File uploaded successfully!
        </p>
      )}
    </form>
  );
}
