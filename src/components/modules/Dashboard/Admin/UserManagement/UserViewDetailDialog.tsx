import InfoRow from '@/components/shared/InoRow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatDateTime, getInitials } from '@/lib/formatters';
import { IUser, UserRole } from '@/lib/types';

import {
  Award,
  Calendar,
  CheckCircle2,
  DollarSign,
  Languages,
  Mail,
  Star,
  User,
  XCircle,
} from 'lucide-react';

interface IUserViewDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
}

const UserViewDetailDialog = ({
  open,
  onClose,
  user,
}: IUserViewDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='min-w-5xl max-h-[90vh] flex flex-col p-0'>
        <DialogHeader className='px-6 pt-6 pb-4'>
          <DialogTitle>User Profile Details</DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto px-6 pb-6'>
          {/* User Profile Header */}
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-teal-50 to-indigo-50 dark:from-teal-950 dark:to-indigo-950 rounded-lg mb-6'>
            <Avatar className='h-24 w-24 border-4 border-white shadow-lg'>
              <AvatarImage src={user?.profilePic || ''} alt={user?.name} />
              <AvatarFallback className='text-2xl'>
                {getInitials(user?.name || '')}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 text-center sm:text-left'>
              <h2 className='text-3xl font-bold mb-1'>{user?.name}</h2>
              <p className='text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2'>
                <Mail className='h-4 w-4' />
                {user?.email}
              </p>
              <div className='flex flex-wrap gap-2 justify-center sm:justify-start'>
                <Badge
                  variant={
                    user?.role === UserRole.ADMIN
                      ? 'default'
                      : user?.role === UserRole.GUIDE
                      ? 'secondary'
                      : 'outline'
                  }
                  className='text-sm'
                >
                  {user?.role}
                </Badge>
                {user?.verified !== undefined && (
                  <Badge
                    variant={user?.verified ? 'default' : 'outline'}
                    className='text-sm'
                  >
                    {user?.verified ? (
                      <>
                        <CheckCircle2 className='h-3 w-3 mr-1' />
                        Verified
                      </>
                    ) : (
                      <>
                        <XCircle className='h-3 w-3 mr-1' />
                        Not Verified
                      </>
                    )}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className='space-y-6'>
            {/* Basic Information */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <User className='h-5 w-5 text-purple-600' />
                <h3 className='font-semibold text-lg'>Basic Information</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow label='User ID' value={user?._id || 'N/A'} />
                <InfoRow label='Email' value={user?.email || 'N/A'} />
                <InfoRow label='Name' value={user?.name || 'N/A'} />
                <InfoRow label='Role' value={user?.role || 'N/A'} />
                {user?.bio && (
                  <div className='md:col-span-2'>
                    <InfoRow label='Bio' value={user.bio} />
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Languages */}
            {user?.languagesSpoken && user.languagesSpoken.length > 0 && (
              <>
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <Languages className='h-5 w-5 text-teal-600' />
                    <h3 className='font-semibold text-lg'>Languages Spoken</h3>
                  </div>
                  <div className='flex flex-wrap gap-2 bg-muted/50 p-4 rounded-lg'>
                    {user.languagesSpoken.map((lang, idx) => (
                      <Badge key={idx} variant='outline'>
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Guide Specific Information */}
            {user?.role === UserRole.GUIDE && (
              <>
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <Award className='h-5 w-5 text-orange-600' />
                    <h3 className='font-semibold text-lg'>Guide Information</h3>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                    {user?.expertise && user.expertise.length > 0 && (
                      <div className='md:col-span-2'>
                        <p className='text-sm text-muted-foreground mb-2'>
                          Expertise
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {user.expertise.map((cat, idx) => (
                            <Badge key={idx} variant='outline'>
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {user?.dailyRate !== undefined && (
                      <div className='flex items-start gap-3'>
                        <DollarSign className='h-4 w-4 mt-1 text-muted-foreground' />
                        <InfoRow
                          label='Daily Rate'
                          value={`$${user.dailyRate.toFixed(2)}`}
                        />
                      </div>
                    )}
                    {user?.totalToursGiven !== undefined && (
                      <InfoRow
                        label='Total Tours Given'
                        value={user.totalToursGiven}
                      />
                    )}
                    {user?.averageRating !== undefined && (
                      <div className='flex items-start gap-3'>
                        <Star className='h-4 w-4 mt-1 text-muted-foreground' />
                        <InfoRow
                          label='Average Rating'
                          value={`${user.averageRating.toFixed(1)} ⭐`}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Account Information */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Calendar className='h-5 w-5 text-green-600' />
                <h3 className='font-semibold text-lg'>Account Information</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow
                  label='Created At'
                  value={formatDateTime(user?.createdAt || '')}
                />
                <InfoRow
                  label='Last Updated'
                  value={formatDateTime(user?.updatedAt || '')}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDetailDialog;
