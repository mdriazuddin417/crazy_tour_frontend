/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IUser, TourCategory, UserRole } from '@/lib/types';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { updateUserService } from '@/services/user/user.service';
import { Check, Edit, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

// --- Zod Schema ---
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  bio: z.string().max(300).optional(),
  languagesSpoken: z.string().optional(),
  profilePic: z.any().optional(),
  dailyRate: z.number().min(0).nullable().optional(),
  expertise: z.array(z.nativeEnum(TourCategory)).optional(),
});

interface ProfileEditModalProps {
  user: IUser;
  onUpdateSuccess: () => void;
  children: React.ReactNode;
}

const allTourCategories = [
  TourCategory.HISTORY,
  TourCategory.ADVENTURE,
  TourCategory.FOOD,
  TourCategory.CULTURE,
  TourCategory.PHOTOGRAPHY,
  TourCategory.SHOPPING,
  TourCategory.ART,
];

export const ProfileEditModal = ({ user, onUpdateSuccess, children }: ProfileEditModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Local State (instead of RHF) ---
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [languagesSpoken, setLanguagesSpoken] = useState(
    (user.languagesSpoken || []).join(', ')
  );
  const [dailyRate, setDailyRate] = useState<number | null>(user.dailyRate || null);
  const [expertise, setExpertise] = useState<string[]>(user.expertise || []);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  // Toggle badge
  const toggleExpertise = (category: TourCategory) => {
    setExpertise((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // Validate with Zod
    const parsed = formSchema.safeParse({
      name,
      bio,
      languagesSpoken,
      profilePic,
      dailyRate,
      expertise,
    });

    if (!parsed.success) {
      // setError(parsed.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    // Convert languages string → array
    const languagesArr = languagesSpoken
      ? languagesSpoken.split(',').map((x) => x.trim()).filter(Boolean)
      : [];

    const payload: Partial<IUser> = {
      name,
      bio,
      languagesSpoken: languagesArr,
      dailyRate: user.role === UserRole.GUIDE ? dailyRate ?? undefined : undefined,
      expertise: user.role === UserRole.GUIDE ? expertise?.map((cat) => TourCategory[cat as keyof typeof TourCategory]) : undefined,
    };

    // const formData = new FormData();
    // // formData.append('data', JSON.stringify(payload));

    // if (profilePic) {
    //   // if (!ACCEPTED_IMAGE_TYPES.includes(profilePic.type) || profilePic.size > MAX_FILE_SIZE) {
    //   //   setError('Invalid image file. Max 500KB, formats: JPEG, PNG, WEBP.');
    //   //   setIsLoading(false);
    //   //   return;
    //   // }
    //   // formData.append('file', profilePic);
    // }

    try {
      const res = await updateUserService(user._id, payload);

      if (!res.success) {
        const err = await res.json();
        throw new Error(err.message);
      }
      await getUserInfo();

      setIsOpen(false);
      onUpdateSuccess();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Your Profile
          </DialogTitle>
          <DialogDescription>Update your personal details.</DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 p-2 mb-2 rounded">
            {error}
          </p>
        )}

        {/* NAME + LANGUAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Languages (comma-separated)
            </label>
            <Input
              value={languagesSpoken}
              onChange={(e) => setLanguagesSpoken(e.target.value)}
            />
          </div>
        </div>

        {/* BIO */}
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="resize-none"
          />
        </div>

        {/* PROFILE PIC */}
        {/* <div>
          <label className="block text-sm font-medium">Profile Picture</label>
          <Input
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
          />
          <div className="text-xs flex items-center gap-1 mt-1">
            <ImageIcon className="h-4 w-4" />
            Max 500KB (JPG, PNG, WEBP)
          </div>
        </div> */}

        {/* GUIDE FIELDS */}
        {user.role === UserRole.GUIDE && (
          <>
            <h3 className="text-lg font-semibold pt-4 border-t">Guide Details</h3>

            <div>
              <label className="block text-sm font-medium">Daily Rate ($)</label>
              <Input
                type="number"
                value={dailyRate ?? ''}
                onChange={(e) => setDailyRate(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Expertise</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allTourCategories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={expertise.includes(cat) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleExpertise(cat)}
                  >
                    {cat}
                    {expertise.includes(cat) && (
                      <Check className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SUBMIT */}
        <Button className="w-full mt-4" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
