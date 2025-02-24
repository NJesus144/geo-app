'use client'

import { DeleteConfirmationDialog } from '@/components/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UpdateUserDialog } from '@/components/UpdateUserDialog'
import { useDeleteUserMutation } from '@/hooks/useDeleteUserMutation'
import { useLogout } from '@/hooks/useLogout'
import { useAuthStore } from '@/store/auth'
import { LogOut, Mail, MapPin, User, LocateFixed } from 'lucide-react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { user } = useAuthStore()
  const logout = useLogout()
  const deleteMutation = useDeleteUserMutation()
  const { t } = useTranslation('common')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex items-baseline relative mt-6 ml-4">
                <LocateFixed className="absolute -left-8 -top-6 text-green-500 h-14 w-14 z-0" />
                <h1 className="font-bold text-2xl z-10">GeoApp</h1>
              </div>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardContent>
                <div className="space-y-4 p-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{user?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>
                      {user?.address?.city}, {user?.address?.state}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <UpdateUserDialog />
                  <DeleteConfirmationDialog
                    title={t('deleteConfirmationUserDialog.title')}
                    description={t('deleteConfirmationUserDialog.description')}
                    cancelText={t('buttons.cancel')}
                    trigger={
                      <Button variant="destructive">
                        {t('deleteConfirmationUserDialog.deleteAccount')}
                      </Button>
                    }
                    isDeleting={deleteMutation.isPending}
                    onConfirm={() => deleteMutation.mutate()}
                    confirmText={t(
                      'deleteConfirmationUserDialog.confirmationButton',
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <div className="col-span-1 md:col-span-2">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
