# EduConnect Africa
Initial Video Submission: https://drive.google.com/file/d/1r3o2EPdROME0-E7hGYW2L784SAqfV_nD/view?usp=sharing
A comprehensive platform connecting Nigerian students with African universities, featuring personalized recommendations, qualification equivalency tools, and education counseling services.

## 🚀 Features

### Core Functionality
- **University Discovery**: Browse and search universities across Africa
- **Personalized Matching**: AI-powered university recommendations based on student preferences
- **Grade Calculator**: Convert Nigerian qualifications to international equivalents
- **Counseling Services**: Book sessions with education counselors
- **Scholarship Information**: Comprehensive scholarship database and guidance
- **Application Tracking**: Monitor university application status

### User Management
- **Complete Profile System**: Academic information, preferences, and settings
- **Role-based Access**: Student, Admin, and Counselor roles
- **Authentication**: NextAuth.js with Google OAuth and credentials
- **Payment Integration**: Stripe payment processing for counseling sessions

### Admin Features
- **Dashboard**: Comprehensive analytics and system metrics
- **University Management**: Add and manage university information
- **User Management**: Student and counselor account administration
- **Application Review**: Process and track student applications

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: NextAuth.js
- **Database**: Prisma (configured but using mock data)
- **Payments**: Stripe integration
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Icons**: Lucide React
- **Deployment**: Netlify ready

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard and management
│   ├── api/               # API routes (auth, payments)
│   ├── auth/              # Authentication pages
│   ├── calculator/        # Grade calculator tools
│   ├── counseling/        # Counseling booking and sessions
│   ├── profile/           # User profile management
│   ├── questionnaire/     # Student preference questionnaire
│   ├── resources/         # Educational resources
│   ├── scholarships/      # Scholarship information
│   ├── tools/             # Additional tools
│   └── universities/      # University discovery
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── calculator/       # Calculator interface components
│   ├── common/           # Shared components (hero, features)
│   ├── counseling/       # Counseling-related components
│   ├── layout/           # Layout components (header, footer)
│   ├── payments/         # Payment processing components
│   ├── profile/          # Profile management components
│   ├── questionnaire/    # Questionnaire flow components
│   ├── ui/               # shadcn/ui components
│   └── university/       # University display components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
│   ├── constants/        # App constants
│   ├── context/          # React context providers
│   ├── data/             # Mock data and sample content
│   └── types/            # TypeScript type definitions
└── middleware.ts         # NextAuth middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd educonnect-africa
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using Bun (recommended)
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # NextAuth Configuration
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Stripe (for payments)
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   
   # Database (when implementing Prisma)
   DATABASE_URL=your-database-url
   ```

4. **Run the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using Bun
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

The platform supports multiple authentication methods:

### Test Accounts
- **Admin**: `admin@educonnect.com` / `admin123`
- **Student**: `student@test.com` / `student123`
- **Counselor**: `counselor@test.com` / `counselor123`

### Google OAuth
Configure Google OAuth in the Google Cloud Console and add credentials to `.env.local`

## 💳 Payment Integration

The platform includes Stripe payment processing for counseling sessions:

1. **Configure Stripe**: Add your Stripe keys to `.env.local`
2. **Test Payments**: Use Stripe test cards for development
3. **Webhook Handling**: Implement webhook endpoints for production

## 🎨 Customization

### Styling
- **Theme**: Customize colors in `src/lib/constants/colors.ts`
- **Components**: Modify shadcn/ui components in `src/components/ui/`
- **Layout**: Update layout components in `src/components/layout/`

### Data
- **Universities**: Add universities in `src/lib/data/universities.ts`
- **Types**: Modify TypeScript types in `src/lib/types/`
- **Mock Data**: Update sample data throughout the application

## 📊 Features Overview

### For Students
- ✅ University search and filtering
- ✅ Personalized recommendations
- ✅ Grade conversion calculator
- ✅ Scholarship information
- ✅ Counseling session booking
- ✅ Application tracking
- ✅ Complete profile management
- ✅ Study preferences configuration

### For Counselors
- ✅ Session management
- ✅ Student consultation booking
- ✅ Payment processing
- ✅ Session feedback system

### For Admins
- ✅ Comprehensive dashboard
- ✅ University management
- ✅ User administration
- ✅ Application processing
- ✅ System analytics

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### Vercel
1. Import project to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Recent Updates

### Merged Codebase (Latest)
- ✅ Added comprehensive profile management system
- ✅ Integrated payment processing with Stripe
- ✅ Enhanced calculator functionality
- ✅ Complete admin dashboard
- ✅ Improved user experience with better components
- ✅ Added missing UI components and pages

---

**EduConnect Africa** - Connecting Nigerian Students with African Universities 🌍
