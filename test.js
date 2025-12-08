const booking = {
  totalBooking: 15,
  totalBookingByStatus: [
    {
      _id: 'PENDING',
      count: 8,
    },
    {
      _id: 'FAILED',
      count: 2,
    },
    {
      _id: 'COMPLETED',
      count: 5,
    },
  ],
  bookingsPerTour: [],
  avgGuestCountPerBooking: null,
  bookingsLast7Days: 15,
  bookingsLast30Days: 15,
  totalBookingByUniqueUsers: [
    {
      _id: 'PENDING',
      count: 8,
    },
    {
      _id: 'FAILED',
      count: 2,
    },
    {
      _id: 'COMPLETED',
      count: 5,
    },
  ],
};

const payment = {
  totalPayment: 15,
  totalPaymentByStatus: [
    {
      _id: 'PAID',
      count: 6,
    },
    {
      _id: 'FAILED',
      count: 2,
    },
    {
      _id: 'UNPAID',
      count: 7,
    },
  ],
  totalRevenue: [
    {
      _id: null,
      totalRevenue: 1530,
    },
  ],
  avgPaymentAmount: [
    {
      _id: null,
      avgPaymentAMount: 226.66666666666666,
    },
  ],
  paymentGatewayData: [
    {
      _id: 'UNKNOWN',
      count: 15,
    },
  ],
};

const user = {
  totalUsers: 3,
  totalActiveUsers: 3,
  totalInActiveUsers: 0,
  totalBlockedUsers: 0,
  newUsersInLast7Days: 3,
  newUsersInLast30Days: 3,
  usersByRole: [
    {
      _id: 'ADMIN',
      count: 1,
    },
    {
      _id: 'GUIDE',
      count: 1,
    },
    {
      _id: 'TOURIST',
      count: 1,
    },
  ],
};

const tourListing = {
  totalTour: 7,
  totalTourByCategory: [
    {
      _id: 'FOOD',
      count: 1,
    },
    {
      _id: 'ADVENTURE',
      count: 6,
    },
  ],
  avgTourPrice: 85,
  totalTourByCountry: [
    {
      _id: 'Indonesia',
      count: 7,
    },
  ],
  totalTourByCity: [
    {
      _id: 'Ubud',
      count: 7,
    },
  ],
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
