import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { IUser, TourCategory, UserRole } from '@/lib/types';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { Check, Mail, MapPin, Shield, UserRound } from 'lucide-react';
import Link from 'next/link';

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

const ProfileHeader = ({ user }: { user: IUser }) => {
  const roleInfo = roleCopy[user.role];
  return (
    <Card>
      <CardHeader className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary'>
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
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
          <Button asChild>
            <Link href={getDefaultDashboardRoute(user.role)}>
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <Mail className='h-4 w-4' />
          <span>{user.email}</span>
        </div>
        {user.bio && (
          <p className='text-sm text-muted-foreground'>{user.bio}</p>
        )}
        <div className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
          <Badge variant='outline'>Joined {formatDate(user.createdAt)}</Badge>
          <Badge variant='outline'>
            Last updated {formatDate(user.updatedAt)}
          </Badge>
        </div>
        {roleInfo?.description && (
          <p className='text-sm text-muted-foreground'>
            {roleInfo.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className='flex items-center justify-between rounded-lg border px-3 py-2 text-sm'>
    <span className='text-muted-foreground'>{label}</span>
    <span className='font-medium'>{value}</span>
  </div>
);

const GuidePanel = ({ user }: { user: IUser }) => (
  <Card>
    <CardHeader>
      <CardTitle>Guide Overview</CardTitle>
      <CardDescription>
        Quick snapshot of your guiding performance.
      </CardDescription>
    </CardHeader>
    <CardContent className='space-y-4'>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        <InfoRow
          label='Daily rate'
          value={user.dailyRate ? `$${user.dailyRate}` : 'N/A'}
        />
        <InfoRow
          label='Tours completed'
          value={user.totalToursGiven ?? 'N/A'}
        />
        <InfoRow
          label='Avg. rating'
          value={
            user.averageRating ? `${user.averageRating.toFixed(1)} / 5` : 'N/A'
          }
        />
        <InfoRow
          label='Languages'
          value={(user.languagesSpoken || []).join(', ') || 'N/A'}
        />
        <InfoRow label='Verified' value={user.verified ? 'Yes' : 'Pending'} />
      </div>
      {user.expertise && user.expertise.length > 0 && (
        <div className='space-y-2'>
          <p className='text-sm font-medium'>Expertise</p>
          <div className='flex flex-wrap gap-2'>
            {user.expertise.map((item: TourCategory) => (
              <Badge key={item} variant='secondary'>
                {item}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

const TouristPanel = ({ user }: { user: IUser }) => (
  <Card>
    <CardHeader>
      <CardTitle>Traveler Overview</CardTitle>
      <CardDescription>
        Your profile helps guides tailor better experiences.
      </CardDescription>
    </CardHeader>
    <CardContent className='space-y-3'>
      <InfoRow
        label='Preferred languages'
        value={(user.languagesSpoken || []).join(', ') || 'N/A'}
      />
      <InfoRow label='Member since' value={formatDate(user.createdAt)} />
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <MapPin className='h-4 w-4' />
        <span>Tell guides where you usually travel to get better matches.</span>
      </div>
    </CardContent>
  </Card>
);

const AdminPanel = () => (
  <Card>
    <CardHeader>
      <CardTitle>Admin tools</CardTitle>
      <CardDescription>
        Use the sidebar to manage users, bookings, and listings.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className='text-sm text-muted-foreground'>
        You have elevated privileges across the platform. Please act
        responsibly.
      </p>
    </CardContent>
  </Card>
);

const MyProfilePage = async () => {
  const user = (await getUserInfo()) as IUser | null;

  if (!user) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center text-muted-foreground'>
        Unable to load profile.
      </div>
    );
  }

  return (
    <main className='space-y-6 p-4 md:p-6'>
      <ProfileHeader user={user} />

      <div className='grid gap-6 lg:grid-cols-3'>
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>
              Basic information about your account.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid gap-3 sm:grid-cols-2'>
              <InfoRow label='Name' value={user.name || 'N/A'} />
              <InfoRow label='Email' value={user.email || 'N/A'} />
              <InfoRow
                label='Role'
                value={roleCopy[user.role]?.label || user.role}
              />
              <InfoRow
                label='Languages'
                value={(user.languagesSpoken || []).join(', ') || 'N/A'}
              />
              <InfoRow label='Profile ID' value={user._id || 'N/A'} />
              <InfoRow
                label='Last updated'
                value={formatDate(user.updatedAt)}
              />
            </div>
            {user.bio && (
              <>
                <Separator />
                <div>
                  <p className='text-sm font-medium mb-1'>Bio</p>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {user.bio}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className='space-y-6'>
          {user.role === UserRole.GUIDE && <GuidePanel user={user} />}
          {user.role === UserRole.TOURIST && <TouristPanel user={user} />}
          {user.role === UserRole.ADMIN && <AdminPanel />}
        </div>
      </div>
    </main>
  );
};

export default MyProfilePage;
