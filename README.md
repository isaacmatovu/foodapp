# Restaurant Food Ordering App 🍽️

A React Native mobile application built with Expo that streamlines the food ordering process in restaurants and hotels. The app provides separate interfaces for customers and administrators, enabling seamless order management and enhanced dining experiences.

## 📱 Features

### Customer Features

- **User Registration & Authentication**: Secure account creation and login
- **Menu Browsing**: View available dishes with descriptions and prices
- **Order Placement**: Easy-to-use ordering interface
- **Order Tracking**: Real-time order status updates
- **Order History**: View past orders and reorder favorites

### Admin Features

- **Order Management**: Receive and manage incoming orders
- **Menu Management**: Add, edit, and remove menu items
- **Customer Management**: View customer information and order history
  <!-- - **Real-time Notifications**: Instant alerts for new orders -->
  <!-- - **Order Status Updates**: Update order progress (preparing, ready, served) -->

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Language**: TypeScript
- **Backend**: Appwrite (Database, Authentication, Real-time)
- **State Management**: Zustand
- **Navigation**: Expo Router (file-based routing)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Appwrite account and project setup

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/isaacmatovu/foodapp
   cd restaurant-food-ordering-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Appwrite**
   - Create an Appwrite project
   - Set up your database collections
   - Configure authentication
   - Update your environment variables with Appwrite credentials

4. **Start the development server**

   ```bash
   npx expo start
   ```

5. **Run the app**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## 📁 Project Structure

```
├── app/                    # Main app directory (file-based routing)
│   ├── (admin)/           # Admin-only screens
│   ├── (customer)/        # Customer-only screens
│   ├── (auth)/            # Authentication screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
│   ├── appwrite.ts        # Appwrite configuration
│   └── store.ts           # Zustand state management
├── types/                 # TypeScript type definitions
└── assets/                # Images, fonts, and other static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and add your Appwrite credentials:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
```

### Appwrite Setup

1. Create collections for:
   - Users (customers and admins)
   - Menu Items
   - Orders
   - Categories

2. Set up authentication with email/password

3. Configure real-time subscriptions for order updates

## 📱 App Flow

### Customer Flow

1. Register/Login
2. Browse menu by categories
3. Add items to cart
4. Place order with delivery details
5. Track order status
6. Receive notifications

### Admin Flow

1. Admin login
2. View incoming orders dashboard
3. Update order status
4. Manage menu items
<!-- 5. View analytics and reports -->

## 🎨 Key Components

- **Authentication System**: Secure login/register with Appwrite Auth
- **Role-based Navigation**: Separate screens for customers and admins
- **Real-time Updates**: Live order status using Appwrite Realtime
- **State Management**: Zustand for efficient state handling
- **Type Safety**: Full TypeScript implementation

## 🔄 State Management

The app uses Zustand for state management with separate stores for:

- Authentication state
- Cart management
- Order tracking
- Menu items
- Admin dashboard data

## 📦 Dependencies

Key dependencies include:

- `expo` - Expo framework
- `react-native` - React Native framework
- `appwrite` - Backend services
- `zustand` - State management
- `expo-router` - File-based navigation
- `typescript` - Type safety

## 🚀 Deployment

### Development Build

```bash
expo build:android
expo build:ios
```

### Production Build

```bash
expo build --clear-cache
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔮 Future Enhancements

- Push notifications
- Payment integration
- Table reservation system
- Loyalty program
- Multi-language support
- Dark mode theme
- Offline functionality

---

Built with ❤️ using React Native and Expo
