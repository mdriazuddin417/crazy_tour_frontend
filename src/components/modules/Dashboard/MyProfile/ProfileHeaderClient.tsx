// components/ProfileHeaderClient.tsx
'use client';

import { ProfileEditModal } from '@/components/modules/Dashboard/MyProfile/ProfileEditModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { IUser, UserRole } from '@/lib/types';
import { Check, Edit, Mail, Shield, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formatDate = (value?: Date | string) => {
  if (!value) return 'N/A';
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString();
};

const roleCopy: Record<UserRole, { label: string; description: string }> = {
  [UserRole.GUIDE]: {
    label: 'Guide',
    description: 'You help travelers explore destinations.',
  },
  [UserRole.TOURIST]: {
    label: 'Traveler',
    description: 'You book tours and discover experiences.',
  },
  [UserRole.ADMIN]: {
    label: 'Admin',
    description: 'You manage users, listings, and bookings.',
  },
};

export function ProfileHeaderClient({ user }: { user: IUser }) {
  const router = useRouter();
  const roleInfo = roleCopy[user.role];

  // Called by the client modal when update is successful
  const onProfileUpdate = () => {
    // Refresh the current route to get fresh server component data
    // (this makes the server page re-run getUserInfo on the server)
    router.refresh();
  };

  return (
    <Card>
      <CardHeader className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-4'>
          <div className='relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary overflow-hidden'>
            {user.profilePic ? (
              // If profilePic is a URL
              // You may swap for next/image if desired
              <img src={user.profilePic} alt='Profile' className='h-full w-full object-cover' />
            ) : (
              (user.name?.charAt(0)?.toUpperCase() || 'U')
            )}
          </div>
          <div>
            <CardTitle className='text-2xl'>
              {user.name || 'Unnamed user'}
            </CardTitle>
            <CardDescription className='flex items-center gap-2'>
              <UserRound className='h-4 w-4' />
              <span className='capitalize text-sm'>
                {roleInfo?.label || user.role.toLowerCase()}
              </span>
              {user.role === UserRole.ADMIN && (
                <Badge variant='outline' className='gap-1'>
                  <Shield className='h-3 w-3' />
                  Admin
                </Badge>
              )}
              {user.role === UserRole.GUIDE && user.verified && (
                <Badge variant='secondary' className='gap-1'>
                  <Check className='h-3 w-3' />
                  Verified
                </Badge>
              )}
            </CardDescription>
          </div>
        </div>

        <div className='flex gap-2'>
          <ProfileEditModal user={user} onUpdateSuccess={onProfileUpdate}>
            <Button variant='outline'>
              <Edit className='mr-2 h-4 w-4' />
              Edit Profile
            </Button>
          </ProfileEditModal>

          <Button asChild>
            <Link href={getDefaultDashboardRoute(user.role)}>Back to Dashboard</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className='space-y-3'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <Mail className='h-4 w-4' />
          <span>{user.email}</span>
        </div>

        {user.bio && <p className='text-sm text-muted-foreground'>{user.bio}</p>}

        <div className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
          <Badge variant='outline'>Joined {formatDate(user.createdAt)}</Badge>
          <Badge variant='outline'>Last updated {formatDate(user.updatedAt)}</Badge>
        </div>

        {roleInfo?.description && (
          <p className='text-sm text-muted-foreground'>{roleInfo.description}</p>
        )}
      </CardContent>
    </Card>
  );
}
