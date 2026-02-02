import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoAddCircleOutline, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddCarImagesPMutation } from '../services/dealerAPI';

function UploadImagesp() {  
  const navigate = useNavigate();
  const { carId } = useParams();
  const [activeTab, setActiveTab] = useState('coverimage');
  const [userId, setUserId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [addCarImagesP] = useAddCarImagesPMutation();

  useEffect(() => {
    // Get user ID from token
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
        toast.error('Authentication error');
      }
    }
  }, []);

  const [data, setData] = useState([
    {
      label: "Cover Image",
      value: "coverimage",
      images: [],
      showAddSection: true,
    },
    {
      label: "Additional Images",
      value: "images",
      images: [],
      showAddSection: true,
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (data[0].images.length === 0) {
      toast.error("Please upload a cover image");
      return;
    }
    
    toast.success("Images uploaded successfully!");
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  const handleAddImage = async (event, categoryValue) => {
    if (!userId || !carId) {
      toast.error("Missing required parameters");
      return;
    }

    // Convert parameters to integers
    const premiumCarIdInt = parseInt(carId, 10);
    const userIdInt = parseInt(userId, 10);
    
    if (isNaN(premiumCarIdInt) || isNaN(userIdInt)) {
      toast.error("Invalid ID format");
      return;
    }

    console.log("Sending premiumCarId:", premiumCarIdInt, "Type:", typeof premiumCarIdInt);
    console.log("Sending userId:", userIdInt, "Type:", typeof userIdInt);

    const files = Array.from(event.target.files);
    const documentType = categoryValue === 'coverimage' ? 'coverImage' : 'image';

    if (categoryValue === 'coverimage' && files.length > 1) {
      toast.error("Only one cover image can be added");
      return;
    }

    // Create preview images
    const previewImages = files.map(file => ({
      documentLink: URL.createObjectURL(file),
      documentId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file: file,
      status: 'pending'
    }));

    // Update UI with previews
    setData(prevData =>
      prevData.map(category => {
        if (category.value === categoryValue) {
          const updatedImages =
            categoryValue === 'coverimage'
              ? previewImages
              : [...category.images, ...previewImages];
          return {
            ...category,
            images: updatedImages,
            showAddSection: categoryValue === 'coverimage' ? false : category.showAddSection,
          };
        }
        return category;
      })
    );

    // Upload files one by one
    setIsUploading(true);
    for (const item of previewImages) {
      try {
        // Update status to uploading
        updateImageStatus(categoryValue, item.documentId, 'uploading');
        
        // Use the mutation hook
        await addCarImagesP({
          file: item.file,
          document: documentType,
          premiumCarId: premiumCarIdInt,
          userId: userIdInt
        }).unwrap();
        
        // Update status to success
        updateImageStatus(categoryValue, item.documentId, 'success');
        toast.success(`${item.file.name} uploaded successfully!`);
        
      } catch (error) {
        console.error('Upload error:', error);
        updateImageStatus(categoryValue, item.documentId, 'error');
        
        if (error.data && error.data.detail) {
          toast.error(`Upload failed: ${error.data.detail}`);
        } else if (error.message) {
          toast.error(`Upload failed: ${error.message}`);
        } else {
          toast.error(`Failed to upload ${item.file.name}`);
        }
      }
    }
    setIsUploading(false);
  };

  const updateImageStatus = (categoryValue, documentId, status) => {
    setData(prevData =>
      prevData.map(category => {
        if (category.value === categoryValue) {
          return {
            ...category,
            images: category.images.map(img => 
              img.documentId === documentId ? { ...img, status } : img
            )
          };
        }
        return category;
      })
    );
  };

  const removeImage = (categoryValue, documentId) => {
    setData(prevData =>
      prevData.map(category => {
        if (category.value === categoryValue) {
          const filteredImages = category.images.filter(img => img.documentId !== documentId);
          return {
            ...category,
            images: filteredImages,
            showAddSection: categoryValue === 'coverimage' ? filteredImages.length === 0 : true
          };
        }
        return category;
      })
    );
  };

  return (
    <div className="flex justify-center mt-10 p-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add Premium Car Images</h2>
        <p className="text-gray-600 mb-6">Car ID: {carId}</p>
        
        <Tabs value={activeTab} onChange={setActiveTab}>
          <TabsHeader className="bg-blue-50 p-1 rounded-lg">
            {data.map(({ label, value }) => (
              <Tab 
                key={value} 
                value={value}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === value 
                    ? 'bg-white text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          
          <TabsBody className="mt-6">
            {data.map(({ value, images, showAddSection }) => (
              <TabPanel key={value} value={value}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {value === 'coverimage' ? 'Cover Image' : 'Additional Images'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {value === 'coverimage' 
                      ? 'Upload one cover image for your premium car' 
                      : 'Upload multiple images showing different angles of your car'
                    }
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map(({ documentLink, documentId, status }) => (
                    <div key={documentId} className="relative group">
                      <img
                        src={documentLink}
                        alt="Car preview"
                        className="carliobject-cover w-full h-48 rounded-lg border border-gray-200"
                      />
                      
                      {/* Status indicator */}
                      {status && (
                        <div className={`absolute top-2 right-2 rounded-full p-1 ${
                          status === 'success' ? 'bg-green-500' : 
                          status === 'uploading' ? 'bg-blue-500' : 
                          'bg-red-500'
                        }`}>
                          {status === 'success' && <IoCheckmarkCircle className="h-5 w-5 text-white" />}
                          {status === 'uploading' && <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                          {status === 'error' && <IoCloseCircle className="h-5 w-5 text-white" />}
                        </div>
                      )}
                      
                      {/* Remove button */}
                      <button
                        onClick={() => removeImage(value, documentId)}
                        className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <IoCloseCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  
                  {showAddSection && (
                    <label className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors p-4">
                      <IoAddCircleOutline className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 text-center">
                        {value === 'coverimage' ? 'Add Cover Image' : 'Add Images'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple={value !== 'coverimage'}
                        className="hidden"
                        onChange={(e) => handleAddImage(e, value)}
                        disabled={isUploading}
                      />
                    </label>
                  )}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
        
        <div className="mt-8 flex justify-between border-t pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            onClick={handleBack}
          >
            Back
          </button>
          
          <button
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            onClick={handleSubmit}
            disabled={isUploading || data[0].images.length === 0}
          >
            {isUploading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              'Submit Images'
            )}
          </button>
        </div>
        
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}

export default UploadImagesp;