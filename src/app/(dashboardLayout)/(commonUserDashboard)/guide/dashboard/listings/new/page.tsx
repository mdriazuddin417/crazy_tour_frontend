'use client';

import type React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LANGUAGES, POPULAR_CITIES, TOUR_CATEGORIES } from '@/lib/constants';
import { IUser, TourCategory } from '@/lib/types';
import { createListingService } from '@/services/listing/listing.service';
import { getUserInfo } from '@/services/user/user.service';
import { CreateListingInput } from '@/types/zod/listing.validation';
import { toast } from 'sonner';

export default function CreateListingPage() {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: TourCategory.CULTURE as TourCategory,
    city: POPULAR_CITIES[0].name,
    country: POPULAR_CITIES[0].country,
    price: '',
    duration: '',
    maxGroupSize: '',
    meetingPoint: '',
    itinerary: [''],
    languages: ['English'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('user', user);
    e.preventDefault();
    if (!user?._id) {
      return toast.error('Please login to create a listing');
    }

    setLoading(true);

    try {
      const body = {
        guideId: user?._id,
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        maxGroupSize: Number(formData.maxGroupSize),
        itinerary: formData.itinerary.filter((i) => i.trim()),
        isActive: true,
      } as CreateListingInput;
      const newFormData = new FormData();
      newFormData.append('data', JSON.stringify(body));

      // Append all selected files
      selectedFiles.forEach((file) => {
        newFormData.append(`files`, file);
      });

      const data = await createListingService(newFormData);
      console.log('data', data);

      if (data.success) {
        router.push('/guide/dashboard/listings');
      } else {
        toast.error('Try again');
      }
    } catch (error) {
      // console.error('Failed to create listing:', error);
      // alert('Error creating listing');
      toast.error('Please reduce image size max 500KB');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0) {
      const newFiles = [...selectedFiles, ...files];
      setSelectedFiles(newFiles);

      // Create previews for new files
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    // Revoke object URL to prevent memory leak
    URL.revokeObjectURL(imagePreviews[index]);

    // Remove file and preview
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  useEffect(() => {
    getUserInfo().then((userInfo) => {
      setUser(userInfo.data);
    });
  }, []);

  return (
    <main className=' p-5'>
      <div className=''>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Create New Tour
        </h1>
        <p className='text-gray-600 mb-8'>
          Share your unique tour experience with travelers
        </p>

        <Card>
          <CardContent className=''>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Basic Info */}
              <div>
                <h2 className='text-lg font-bold text-gray-900 mb-4'>
                  Tour Information
                </h2>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      Tour Title
                    </label>
                    <Input
                      type='text'
                      placeholder='e.g., Hidden Gems of Paris'
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      Description
                    </label>
                    <textarea
                      placeholder='Describe your tour in detail...'
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      rows={4}
                      required
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value as TourCategory,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        {Object.entries(TOUR_CATEGORIES).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>
                        Price per Person
                      </label>
                      <div className='relative'>
                        <span className='absolute left-3 top-2.5 text-gray-600'>
                          $
                        </span>
                        <Input
                          type='number'
                          placeholder='0'
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          className='pl-8'
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multiple Image Upload */}
                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      Tour Images
                    </label>
                    <div className='space-y-4'>
                      {/* Image Previews */}
                      {imagePreviews.length > 0 && (
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                          {imagePreviews.map((preview, index) => (
                            <div
                              key={index}
                              className='relative group border border-gray-300 rounded-lg overflow-hidden'
                            >
                              <div className='aspect-square relative'>
                                <Image
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  fill
                                  className='object-cover'
                                  sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                                />
                              </div>
                              <button
                                type='button'
                                onClick={() => removeImage(index)}
                                className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'
                                aria-label='Remove image'
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* File Input */}
                      <div>
                        <Input
                          ref={fileInputRef}
                          id='images'
                          name='images'
                          type='file'
                          accept='image/*'
                          multiple
                          onChange={handleFileChange}
                          className='cursor-pointer'
                        />
                        <p className='text-xs text-gray-500 mt-1'>
                          Upload multiple images for your tour (JPG, PNG, etc.)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Duration */}
              <div>
                <h2 className='text-lg font-bold text-gray-900 mb-4'>
                  Location & Duration
                </h2>
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>
                        City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => {
                          const city = POPULAR_CITIES.find(
                            (c) => c.name === e.target.value
                          );
                          setFormData({
                            ...formData,
                            city: city?.name || '',
                            country: city?.country || '',
                          });
                        }}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        {POPULAR_CITIES.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}, {city.country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>
                        Duration (hours)
                      </label>
                      <Input
                        type='number'
                        placeholder='4'
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      Meeting Point
                    </label>
                    <Input
                      type='text'
                      placeholder='e.g., Eiffel Tower Main Gate'
                      value={formData.meetingPoint}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          meetingPoint: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      Max Group Size
                    </label>
                    <Input
                      type='number'
                      placeholder='8'
                      value={formData.maxGroupSize}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxGroupSize: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className='text-lg font-bold text-gray-900 mb-4'>
                  Itinerary
                </h2>
                <div className='space-y-2'>
                  {formData.itinerary.map((item, idx) => (
                    <div key={idx} className='flex gap-2'>
                      <span className='text-gray-600 font-bold py-2'>
                        {idx + 1}.
                      </span>
                      <input
                        type='text'
                        placeholder={`Step ${idx + 1}`}
                        value={item}
                        onChange={(e) => {
                          const newItinerary = [...formData.itinerary];
                          newItinerary[idx] = e.target.value;
                          setFormData({ ...formData, itinerary: newItinerary });
                        }}
                        className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      {formData.itinerary.length > 1 && (
                        <button
                          type='button'
                          onClick={() => {
                            const newItinerary = formData.itinerary.filter(
                              (_, i) => i !== idx
                            );
                            setFormData({
                              ...formData,
                              itinerary: newItinerary,
                            });
                          }}
                          className='px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg'
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() =>
                      setFormData({
                        ...formData,
                        itinerary: [...formData.itinerary, ''],
                      })
                    }
                    className='text-blue-600 hover:underline text-sm font-medium'
                  >
                    + Add step
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h2 className='text-lg font-bold text-gray-900 mb-4'>
                  Languages
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      type='button'
                      onClick={() => {
                        if (formData.languages.includes(lang)) {
                          setFormData({
                            ...formData,
                            languages: formData.languages.filter(
                              (l) => l !== lang
                            ),
                          });
                        } else {
                          setFormData({
                            ...formData,
                            languages: [...formData.languages, lang],
                          });
                        }
                      }}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                        formData.languages.includes(lang)
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className='flex gap-3 pt-6 border-t'>
                <Button
                  type='submit'
                  disabled={loading}
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  {loading ? 'Creating...' : 'Create Tour'}
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
