# AM Tycoons Car Dealership Website

A modern, mobile-first car dealership website built with Next.js, Firebase, and TailwindCSS.

## Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layouts
- **Admin Dashboard**: Secure admin panel for managing car listings
- **Firebase Integration**: Real-time database, authentication, and file storage
- **Advanced Search & Filtering**: Find cars by make, model, price, year, and more
- **Contact Integration**: WhatsApp and phone call buttons for easy customer contact
- **Review System**: Customer reviews and ratings for each vehicle
- **Image Management**: Multiple image upload and carousel display
- **SEO Optimized**: Server-side rendering and proper meta tags

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: TailwindCSS, Radix UI components
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Hosting**: Vercel
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- Firebase account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd car-dealership
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up Firebase:
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Enable Firebase Storage
   - Enable Firebase Authentication (Email/Password)
   - Get your Firebase configuration

4. Create environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Fill in your Firebase configuration in `.env.local`:
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

5. Set up Firebase Security Rules:

**Firestore Rules:**
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cars collection - read public, write admin only
    match /cars/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Reviews collection - read public, write authenticated
    match /reviews/{document} {
      allow read: if true;
      allow write: if true; // Allow anonymous reviews
    }
  }
}
\`\`\`

**Storage Rules:**
\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cars/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

6. Create an admin user:
   - Go to Firebase Console > Authentication
   - Add a new user with email/password
   - This will be your admin account

7. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
car-dealership/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── car/[id]/          # Individual car detail pages
│   ├── listings/          # Car listings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── hooks/                # Custom React hooks
\`\`\`

## Usage

### Admin Features

1. **Login**: Navigate to `/admin/login` and use your Firebase admin credentials
2. **Add Cars**: Use the admin dashboard to add new car listings
3. **Manage Listings**: Edit, delete, or approve/unapprove car listings
4. **View Reviews**: Monitor customer reviews and feedback

### Customer Features

1. **Browse Cars**: View all approved car listings
2. **Search & Filter**: Use advanced filters to find specific vehicles
3. **View Details**: See detailed information, images, and reviews
4. **Contact**: Use WhatsApp or phone buttons to contact the dealership
5. **Leave Reviews**: Rate and review vehicles

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all Firebase environment variables in your Vercel dashboard under Settings > Environment Variables.

## Customization

### Branding
- Replace the logo in the navbar component
- Update colors in `tailwind.config.js`
- Modify the hero section content

### Contact Information
- Update phone numbers and WhatsApp numbers in the car data
- Modify footer contact information

### Firebase Collections

The app uses two main Firestore collections:

**Cars Collection (`/cars`):**
\`\`\`javascript
{
  id: "auto-generated",
  title: "2021 Honda Civic LX",
  make: "Honda",
  model: "Civic", 
  year: 2021,
  mileage: 30000,
  price: 17000,
  description: "Well-maintained...",
  location: "Los Angeles, CA",
  images: ["url1", "url2"],
  contact: {
    phone: "+1-213-555-5555",
    whatsapp: "+1-213-555-5555"
  },
  rating: 4.8,
  reviews: [...],
  approved: true,
  listedAt: timestamp
}
\`\`\`

**Reviews Collection (`/reviews`):**
\`\`\`javascript
{
  id: "auto-generated",
  carId: "car-id",
  name: "John Doe",
  comment: "Great car!",
  stars: 5,
  createdAt: timestamp
}
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email your-email@example.com or create an issue in the GitHub repository.
