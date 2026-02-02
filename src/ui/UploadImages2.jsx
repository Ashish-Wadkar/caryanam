/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
 
import { useAddCarImagesMutation } from '../services/dealerAPI';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadImages2() {  
    const navigate = useNavigate();
  const { carId } = useParams();
  const [activeTab, setActiveTab] = useState('coverimage');
  const [addCarImages] = useAddCarImagesMutation();
  const [uploadStatus, setUploadStatus] = useState({});

  const token = Cookies.get('token');
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserID = jwtDecodes?.userId;

  const [data, setData] = useState([
    {
      label: "Cover Image",
      value: "coverimage",
      images: [],
      showAddSection: true,
    },
    {
      label: "Images",
      value: "images",
      images: [],
      showAddSection: true,
    }
  ]);

  const handleBack = () => {
    navigate(-2);
  };

  const handleAddImage = async (event, categoryValue) => {
    const files = Array.from(event.target.files);
    const documentType = categoryValue === 'coverimage' ? 'coverImage' : 'image';

    if (categoryValue === 'coverimage' && files.length > 1) {
      toast.error("Only one cover image can be added");
      return;
    }

    // Preview before uploading
    const previewImages = files.map(file => ({
      documentLink: URL.createObjectURL(file),
      documentId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }));

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
            showAddSection: categoryValue === 'coverimage' ? updatedImages.length === 0 : category.showAddSection,
          };
        }
        return category;
      })
    );

    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('document', documentType);

      try {
        const response = await addCarImages({
          formData,
          document: documentType,
          firstCarId: carId,
          UserID,
        }).unwrap();

        toast.success("Uploaded Successfully");

        setUploadStatus(prev => ({
          ...prev,
          [file.name]: 'success'
        }));

      } catch (error) {
        toast.error("Upload Failed");
        setUploadStatus(prev => ({
          ...prev,
          [file.name]: 'error'
        }));
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-8xl p-4">
        <h2 className="text-3xl font-semibold mb-4">Add Images</h2>
        <form>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <TabsHeader>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
              {data.map(({ value, images, showAddSection }) => (
                <TabPanel key={value} value={value} className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map(({ documentLink, documentId }, index) => (
                      <div key={documentId} className="relative">
                        <img
                          src={documentLink}
                          alt={`Image ${index + 1}`}
                          className="object-cover w-full h-auto"
                          style={{
                            height: '200px',
                            margin: '5px',
                          }}
                        />
                      </div>
                    ))}
                    {showAddSection && (
                      <div className="h-48 w-full flex items-center justify-center border-2 border-dashed border-gray-400 p-4">
                        <label className="cursor-pointer">
                          <IoAddCircleOutline className="h-16 w-16 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            multiple={value !== 'coverimage'}
                            className="hidden"
                            onChange={(e) => handleAddImage(e, value)}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
          <div className="mt-5 flex justify-between">
            <button
              type="button"
              className="p-3 bg-indigo-400 rounded-md w-28 text-white"
              onClick={handleBack}
            >
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UploadImages2;
