'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';

import { IUser } from '@/lib/types';
import { deleteUserService } from '@/services/user/user.service';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import UserFormDialog from './UserFormDialog';
import { usersColumns } from './usersColumns';
import UserViewDetailDialog from './UserViewDetailDialog';

interface UserTableProps {
  users: IUser[] | { data?: IUser[]; meta?: any };
}

const UserTable = ({ users }: UserTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle both array and object with data property
  const usersArray = Array.isArray(users) ? users : users?.data || [];

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: IUser) => {
    setViewingUser(user);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
  };

  const handleDelete = (user: IUser) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    // TODO: Implement delete functionality
    if (!deletingUser) return;
    setIsDeleting(true);
    const result = await deleteUserService(deletingUser._id);
    setIsDeleting(false);
    if (result.success) {
      toast.success('User deleted successfully');
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete user');
    }
  };

  return (
    <>
      <ManagementTable
        data={usersArray}
        columns={usersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(user) => user._id}
        emptyMessage='No users found'
      />

      {/* Edit User Form Dialog */}
      {editingUser && (
        <UserFormDialog
          open={!!editingUser}
          onClose={() => setEditingUser(null)}
          user={editingUser}
          onSuccess={() => {
            setEditingUser(null);
            handleRefresh();
          }}
        />
      )}

      {/* View User Detail Dialog */}
      {viewingUser && (
        <UserViewDetailDialog
          open={!!viewingUser}
          onClose={() => setViewingUser(null)}
          user={viewingUser}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title='Delete User'
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UserTable;
