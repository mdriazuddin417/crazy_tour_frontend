/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, TrendingUp, Users, Wallet } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Admin stats data
const booking = {
  totalBooking: 15,
  totalBookingByStatus: [
    { _id: 'PENDING', count: 8 },
    { _id: 'FAILED', count: 2 },
    { _id: 'COMPLETED', count: 5 },
  ],
  bookingsPerTour: [],
  avgGuestCountPerBooking: null,
  bookingsLast7Days: 15,
  bookingsLast30Days: 15,
};

const payment = {
  totalPayment: 15,
  totalPaymentByStatus: [
    { _id: 'PAID', count: 6 },
    { _id: 'FAILED', count: 2 },
    { _id: 'UNPAID', count: 7 },
  ],
  totalRevenue: [{ _id: null, totalRevenue: 1530 }],
  avgPaymentAmount: [{ _id: null, avgPaymentAMount: 226.67 }],
  paymentGatewayData: [{ _id: 'UNKNOWN', count: 15 }],
};

const user = {
  totalUsers: 3,
  totalActiveUsers: 3,
  totalInActiveUsers: 0,
  totalBlockedUsers: 0,
  newUsersInLast7Days: 3,
  newUsersInLast30Days: 3,
  usersByRole: [
    { _id: 'ADMIN', count: 1 },
    { _id: 'GUIDE', count: 1 },
    { _id: 'TOURIST', count: 1 },
  ],
};

const tourListing = {
  totalTour: 7,
  totalTourByCategory: [
    { _id: 'FOOD', count: 1 },
    { _id: 'ADVENTURE', count: 6 },
  ],
  avgTourPrice: 85,
  totalTourByCountry: [{ _id: 'Indonesia', count: 7 }],
  totalTourByCity: [{ _id: 'Ubud', count: 7 }],
  totalHighestBookedTour: [
    {
      _id: '69348920e839975c55a9882e',
      bookingCount: 11,
      tour: {
        title: 'Sunrise Volcano Hike & Photography Workshop3',
        city: 'Ubud',
        price: 85,
      },
    },
  ],
};

// Status color mapping
const statusColors = {
  PENDING: '#f59e0b',
  COMPLETED: '#10b981',
  FAILED: '#ef4444',
  PAID: '#10b981',
  UNPAID: '#f59e0b',
  ADMIN: '#3b82f6',
  GUIDE: '#8b5cf6',
  TOURIST: '#ec4899',
  FOOD: '#f59e0b',
  ADVENTURE: '#10b981',
};

export default function AdminDashboard() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>
            Admin Dashboard
          </h1>
          <p className='text-slate-400'>
            Tour Booking Platform Analytics & Insights
          </p>
        </div>

        {/* KPI Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card className='bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-slate-400'>
                Total Bookings
              </CardTitle>
              <TrendingUp className='h-5 w-5 text-emerald-500' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-white'>
                {booking.totalBooking}
              </div>
              <p className='text-xs text-slate-500 mt-1'>
                {booking.bookingsLast7Days} in last 7 days
              </p>
            </CardContent>
          </Card>

          <Card className='bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-slate-400'>
                Total Revenue
              </CardTitle>
              <Wallet className='h-5 w-5 text-blue-500' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-white'>
                ${payment.totalRevenue[0].totalRevenue}
              </div>
              <p className='text-xs text-slate-500 mt-1'>
                Avg: ${payment.avgPaymentAmount[0].avgPaymentAMount.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className='bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-slate-400'>
                Total Users
              </CardTitle>
              <Users className='h-5 w-5 text-purple-500' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-white'>
                {user.totalUsers}
              </div>
              <p className='text-xs text-slate-500 mt-1'>
                {user.totalActiveUsers} active users
              </p>
            </CardContent>
          </Card>

          <Card className='bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-slate-400'>
                Total Tours
              </CardTitle>
              <MapPin className='h-5 w-5 text-pink-500' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-white'>
                {tourListing.totalTour}
              </div>
              <p className='text-xs text-slate-500 mt-1'>
                Avg price: ${tourListing.avgTourPrice}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          {/* Booking Status Chart */}
          <Card className='bg-slate-800 border-slate-700'>
            <CardHeader>
              <CardTitle className='text-white'>
                Booking Status Distribution
              </CardTitle>
              <CardDescription className='text-slate-400'>
                Current booking statuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={booking.totalBookingByStatus}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
                  <XAxis dataKey='_id' stroke='#94a3b8' />
                  <YAxis stroke='#94a3b8' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Bar dataKey='count' fill='#3b82f6' radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Status Pie Chart */}
          <Card className='bg-slate-800 border-slate-700'>
            <CardHeader>
              <CardTitle className='text-white'>
                Payment Status Overview
              </CardTitle>
              <CardDescription className='text-slate-400'>
                Distribution of payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={payment.totalPaymentByStatus}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ _id, count }: any) => `${_id}: ${count}`}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='count'
                  >
                    {payment.totalPaymentByStatus.map((entry) => (
                      <Cell
                        key={`cell-${entry._id}`}
                        fill={
                          statusColors[
                            entry._id as keyof typeof statusColors
                          ] || '#6b7280'
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Roles Distribution */}
          <Card className='bg-slate-800 border-slate-700'>
            <CardHeader>
              <CardTitle className='text-white'>
                User Roles Distribution
              </CardTitle>
              <CardDescription className='text-slate-400'>
                Users by role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={user.usersByRole}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ _id, count }: any) => `${_id}: ${count}`}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='count'
                  >
                    {user.usersByRole.map((entry) => (
                      <Cell
                        key={`cell-${entry._id}`}
                        // Fix TS error by only using keys that exist in statusColors or fallback
                        fill={
                          statusColors[
                            entry._id as keyof typeof statusColors
                          ] || '#6b7280'
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tour Category Distribution */}
          <Card className='bg-slate-800 border-slate-700'>
            <CardHeader>
              <CardTitle className='text-white'>Tour Categories</CardTitle>
              <CardDescription className='text-slate-400'>
                Tours by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart
                  data={tourListing.totalTourByCategory}
                  layout='vertical'
                >
                  <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
                  <XAxis type='number' stroke='#94a3b8' />
                  <YAxis
                    type='category'
                    dataKey='_id'
                    stroke='#94a3b8'
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Bar dataKey='count' fill='#8b5cf6' radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Booked Tour */}
        <div className='grid grid-cols-1 gap-6'>
          <Card className='bg-slate-800 border-slate-700'>
            <CardHeader>
              <CardTitle className='text-white'>Top Booked Tour</CardTitle>
              <CardDescription className='text-slate-400'>
                Most popular tour
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {tourListing.totalHighestBookedTour.map((tour) => (
                  <div
                    key={tour._id}
                    className='flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors p-2'
                  >
                    <div>
                      <h3 className='text-white font-semibold'>
                        {tour.tour.title}
                      </h3>
                      <div className='flex gap-4 mt-2 text-sm text-slate-400'>
                        <span>📍 {tour.tour.city}</span>
                        <span>💰 ${tour.tour.price}</span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-2xl font-bold text-emerald-400'>
                        {tour.bookingCount}
                      </div>
                      <p className='text-xs text-slate-500'>bookings</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid Summary */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          <Card className='bg-slate-800 border-slate-700'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-slate-400'>
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {booking.totalBookingByStatus.map((item) => (
                <div
                  key={item._id}
                  className='flex justify-between items-center'
                >
                  <span className='text-slate-300'>{item._id}</span>
                  <span className='font-semibold text-white'>{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className='bg-slate-800 border-slate-700'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-slate-400'>
                User Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-slate-300'>Active Users</span>
                <span className='font-semibold text-white'>
                  {user.totalActiveUsers}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-slate-300'>Inactive Users</span>
                <span className='font-semibold text-white'>
                  {user.totalInActiveUsers}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-slate-300'>New (7 days)</span>
                <span className='font-semibold text-white'>
                  {user.newUsersInLast7Days}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-slate-800 border-slate-700'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-slate-400'>
                Revenue Info
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-slate-300'>Total Revenue</span>
                <span className='font-semibold text-white'>
                  ${payment.totalRevenue[0].totalRevenue}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-slate-300'>Total Payments</span>
                <span className='font-semibold text-white'>
                  {payment.totalPayment}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-slate-300'>Avg Payment</span>
                <span className='font-semibold text-white'>
                  ${payment.avgPaymentAmount[0].avgPaymentAMount.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
