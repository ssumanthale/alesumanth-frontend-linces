# Linces'CKF - Premium Silk Garments E-Commerce Platform

A production-quality, bilingual (English/Spanish) React frontend for a premium silk garment brand featuring direct-to-consumer shopping, B2B manufacturing services, and admin product management.

## Features

### User Features
- **Bilingual Support**: Full English/Spanish translation with persistent language selection
- **Product Catalog**: Browse and search premium silk products
- **Shopping Cart**: Add, update, and remove items from cart
- **User Authentication**: Secure login and registration
- **Order Checkout**: Complete purchase flow (demo mode)
- **B2B Services**: Quote request system for manufacturing services
- **Responsive Design**: Mobile-first, fully responsive across all devices

### Admin Features
- **Product Management**: Full CRUD operations for products
- **Protected Routes**: Role-based access control
- **Admin Dashboard**: Dedicated admin interface

## Tech Stack

- **React 18**: Modern functional components with hooks
- **React Router DOM**: Client-side routing
- **Context API**: Global state management (Auth, Cart, Language)
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Vite**: Build tool and dev server

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   ├── ProtectedRoute.jsx
│   └── AdminLayout.jsx
├── contexts/            # Context providers
│   ├── LanguageContext.jsx
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Services.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── admin/
│       ├── AdminProducts.jsx
│       ├── AddProduct.jsx
│       └── EditProduct.jsx
├── services/            # API integration
│   └── api.js
├── translations/        # Language files
│   ├── en.json
│   └── es.json
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## Installation

```bash
npm install
```

## Configuration

### Backend API Setup

Update the `.env` file with your backend API URL:

```env
VITE_API_BASE_URL=https://your-backend-api.com
```

### Expected API Endpoints

The application expects the following REST API endpoints:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

#### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /products/featured` - Get featured products
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

#### Quotes
- `POST /quotes` - Submit B2B quote request

#### Contact
- `POST /contact` - Send contact form message

#### Orders
- `POST /orders` - Create order

### API Response Format

Expected response format for authentication:
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "customer" // or "admin"
  }
}
```

Expected product format:
```json
{
  "id": "product-id",
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://image-url.com/image.jpg",
  "category": "Category Name",
  "stock": 50
}
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## User Roles

### Customer
- Browse and view products
- Add products to cart
- Complete checkout process
- Submit contact forms
- Request B2B quotes

### Admin
- All customer features
- Create, update, and delete products
- Access admin dashboard

## Authentication Flow

1. Users register or login via `/login` or `/register`
2. Backend returns JWT token and user data
3. Token stored in localStorage
4. Token included in Authorization header for protected endpoints
5. Protected routes redirect to login if not authenticated
6. Admin routes require `role: "admin"`

## Language System

- Language toggle in navigation
- Preference stored in localStorage
- All UI text comes from translation files
- No hardcoded strings in components
- Easy to add new languages by creating new JSON file

## State Management

### AuthContext
- User authentication state
- Login, register, logout functions
- Role-based access control

### CartContext
- Shopping cart items
- Add, update, remove items
- Calculate totals
- Checkout functionality

### LanguageContext
- Current language state
- Language toggle function
- Translation helper function

## Styling

- Clean, elegant design suitable for premium brand
- Responsive breakpoints for mobile, tablet, desktop
- Consistent color scheme (neutral grays)
- Premium imagery from Pexels
- Hover effects and smooth transitions
- Loading states and error handling

## Security Features

- Protected routes with authentication
- Role-based access control
- Token-based authentication
- Automatic logout on token expiration
- Secure API calls with Authorization headers

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary - All rights reserved

## Support

For support, contact: info@lincesckf.com
