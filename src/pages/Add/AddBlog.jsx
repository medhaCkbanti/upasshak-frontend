import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    image: null,
    content: '',
    user: 'current-user-id' // Replace with actual user management
  });

  // Handle editor content changes
  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Image upload handler for TinyMCE editor content images
  const handleEditorImageUpload = async (blobInfo) => {
    try {
      // Upload through your backend
      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());
      
      const response = await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data.imageUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
      return '';
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('slug', formData.slug);
      formPayload.append('content', formData.content);
      formPayload.append('user', formData.user);
      if (formData.image) {
        formPayload.append('image', formData.image);
      }

      const response = await axios.post('http://localhost:5000/api/blogs', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/blogs');
      alert('Blog post created successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-500 p-3 bg-red-100 rounded">{error}</div>}

        <div>
          <label className="block mb-2 font-medium">Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Slug*</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Featured Image*</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            accept="image/*"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Content*</label>
          <Editor
            apiKey="rdr6yqyjecv89z9zo3aklmsjre31nzxnqviacuf1a1ety86n"
            value={formData.content}
            onEditorChange={handleEditorChange}
            init={{
              height: 500,
              menubar: false,
              plugins: 'advlist autolink lists link image charmap preview anchor code',
              toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code',
              images_upload_handler: handleEditorImageUpload,
              images_file_types: 'jpg,jpeg,png,gif,webp',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;