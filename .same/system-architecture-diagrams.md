# EduConnect Africa - System Architecture Diagrams

## 1. Overall System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Web Browser] --> B[React/Next.js App]
        C[Mobile Browser] --> B
        D[Tablet Browser] --> B
    end

    subgraph "Application Layer"
        B --> E[Authentication System]
        B --> F[Profile Management]
        B --> G[University Search]
        B --> H[Questionnaire System]
        B --> I[Application Tracker]
        B --> J[Counseling Platform]
    end

    subgraph "Business Logic Layer"
        E --> K[User Service]
        F --> K
        G --> L[University Service]
        H --> M[Recommendation Engine]
        I --> N[Application Service]
        J --> O[Counseling Service]

        M --> P[AI Matching Algorithm]
        L --> P
        K --> P
    end

    subgraph "Data Layer"
        K --> Q[(User Database)]
        L --> R[(University Database)]
        N --> S[(Application Database)]
        O --> T[(Session Database)]
        P --> U[Cache Layer]
    end

    subgraph "External Services"
        L --> V[University APIs]
        N --> W[Email Service]
        O --> X[Payment Gateway]
    end

    style A fill:#ff6b35
    style B fill:#ff6b35
    style P fill:#f9c74f
    style Q fill:#90e0ef
    style R fill:#90e0ef
    style S fill:#90e0ef
    style T fill:#90e0ef
```

## 2. Frontend Architecture

```mermaid
graph TD
    subgraph "Next.js Application Structure"
        A[App Router] --> B[Layout Components]
        A --> C[Page Components]
        A --> D[API Routes]

        B --> E[Header/Navigation]
        B --> F[Footer]
        B --> G[Sidebar]

        C --> H[Home Page]
        C --> I[Authentication Pages]
        C --> J[Profile Pages]
        C --> K[University Pages]
        C --> L[Questionnaire Pages]
        C --> M[Settings Pages]

        subgraph "Component Architecture"
            N[UI Components] --> O[Button]
            N --> P[Card]
            N --> Q[Form]
            N --> R[Modal]
            N --> S[Table]

            T[Feature Components] --> U[UniversityCard]
            T --> V[ProfileStats]
            T --> W[QuestionnaireStep]
            T --> X[ApplicationTracker]
        end

        subgraph "State Management"
            Y[React Context] --> Z[AuthContext]
            Y --> AA[UserContext]
            Y --> BB[ThemeContext]

            CC[Custom Hooks] --> DD[useAuth]
            CC --> EE[useProfile]
            CC --> FF[useUniversities]
        end

        subgraph "Styling System"
            GG[Tailwind CSS] --> HH[Base Styles]
            GG --> II[Component Styles]
            GG --> JJ[Responsive Design]

            KK[Shadcn/UI] --> LL[Pre-built Components]
            KK --> MM[Theme Configuration]
        end
    end

    H --> N
    I --> N
    J --> T
    K --> T
    L --> T
    M --> T

    I --> Y
    J --> Y
    K --> Y

    T --> CC
    N --> GG
    T --> KK

    style A fill:#ff6b35
    style Y fill:#f9c74f
    style GG fill:#90e0ef
    style KK fill:#90e0ef
```

## 3. Database Schema Architecture

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email UK
        string password_hash
        string first_name
        string last_name
        string phone_number
        date date_of_birth
        string gender
        string nationality
        string state
        string city
        boolean verified
        enum role
        timestamp created_at
        timestamp updated_at
    }

    PROFILES {
        uuid id PK
        uuid user_id FK
        text bio
        string profile_picture_url
        json study_preferences
        integer completion_percentage
        timestamp updated_at
    }

    QUALIFICATIONS {
        uuid id PK
        uuid user_id FK
        string type
        string institution
        integer year_completed
        json subjects_grades
        string certificate_url
        timestamp created_at
    }

    UNIVERSITIES {
        uuid id PK
        string name
        string country
        string city
        string logo_url
        text description
        string website
        integer founded_year
        enum type
        string ranking
        integer students_count
        integer nigerian_students_count
        decimal acceptance_rate
        decimal average_tuition
        json tuition_range
        json contact_info
        timestamp created_at
        timestamp updated_at
    }

    PROGRAMS {
        uuid id PK
        uuid university_id FK
        string name
        enum degree_type
        integer duration_years
        decimal annual_tuition
        string language
        boolean has_scholarship
        text entry_requirements
        text description
        timestamp created_at
    }

    APPLICATIONS {
        uuid id PK
        uuid user_id FK
        uuid university_id FK
        uuid program_id FK
        enum status
        date application_date
        date last_updated
        text notes
        json documents
        json timeline
        timestamp created_at
        timestamp updated_at
    }

    SCHOLARSHIPS {
        uuid id PK
        uuid university_id FK
        string name
        text description
        enum coverage
        string coverage_details
        text eligibility_criteria
        date application_deadline
        string link
        timestamp created_at
    }

    COUNSELING_SESSIONS {
        uuid id PK
        uuid user_id FK
        uuid counselor_id FK
        datetime session_date
        integer duration
        enum type
        enum status
        text notes
        integer rating
        text feedback
        timestamp created_at
    }

    USERS ||--o{ PROFILES : has
    USERS ||--o{ QUALIFICATIONS : has
    USERS ||--o{ APPLICATIONS : submits
    USERS ||--o{ COUNSELING_SESSIONS : books
    UNIVERSITIES ||--o{ PROGRAMS : offers
    UNIVERSITIES ||--o{ SCHOLARSHIPS : provides
    UNIVERSITIES ||--o{ APPLICATIONS : receives
    PROGRAMS ||--o{ APPLICATIONS : for
```

## 4. User Journey Flow

```mermaid
flowchart TD
    A[User Visits Website] --> B{Returning User?}
    B -->|No| C[View Homepage]
    B -->|Yes| D[Sign In]

    C --> E[Sign Up]
    E --> F[Email Verification]
    F --> G[Complete Profile]

    D --> H{Profile Complete?}
    G --> I[Take Questionnaire]
    H -->|No| I
    H -->|Yes| J[View Dashboard]

    I --> K[Personal Info Step]
    K --> L[Academic Background Step]
    L --> M[Study Preferences Step]
    M --> N[Budget Step]
    N --> O[Location Preferences Step]
    O --> P[Review & Submit]

    P --> Q[Generate Recommendations]
    Q --> R[View University Matches]

    R --> S[Browse Universities]
    S --> T[View University Details]
    T --> U{Interested?}

    U -->|Yes| V[Save University]
    U -->|No| S
    V --> W[Start Application]

    W --> X[Upload Documents]
    X --> Y[Submit Application]
    Y --> Z[Track Application Status]

    J --> AA[Access Profile]
    AA --> BB[Update Preferences]
    AA --> CC[View Applications]
    AA --> DD[Book Counseling]
    AA --> EE[Browse Scholarships]

    BB --> Q

    style A fill:#ff6b35
    style I fill:#f9c74f
    style Q fill:#f9c74f
    style R fill:#90e0ef
    style Z fill:#90e0ef
```

## 5. Recommendation Engine Architecture

```mermaid
graph TB
    subgraph "Input Data"
        A[User Profile Data]
        B[Academic Qualifications]
        C[Study Preferences]
        D[Budget Constraints]
        E[Location Preferences]
    end

    subgraph "Preprocessing"
        F[Data Validation]
        G[Normalization]
        H[Feature Extraction]
    end

    subgraph "Matching Algorithm"
        I[Academic Match Scoring]
        J[Financial Match Scoring]
        K[Location Match Scoring]
        L[Community Match Scoring]
        M[Weighted Score Calculation]
    end

    subgraph "University Database"
        N[University Profiles]
        O[Program Information]
        P[Admission Requirements]
        Q[Cost Information]
        R[Student Demographics]
    end

    subgraph "Output Generation"
        S[Ranked University List]
        T[Match Percentages]
        U[Strength Indicators]
        V[Recommendation Explanations]
    end

    A --> F
    B --> F
    C --> F
    D --> F
    E --> F

    F --> G
    G --> H

    H --> I
    H --> J
    H --> K
    H --> L

    N --> I
    O --> I
    P --> J
    Q --> J
    R --> L

    I --> M
    J --> M
    K --> M
    L --> M

    M --> S
    M --> T
    M --> U
    M --> V

    style M fill:#ff6b35
    style S fill:#f9c74f
    style T fill:#90e0ef
```

## 6. Security Architecture

```mermaid
graph TB
    subgraph "Frontend Security"
        A[Content Security Policy]
        B[XSS Protection]
        C[CSRF Protection]
        D[Input Validation]
    end

    subgraph "Authentication Layer"
        E[Login System]
        F[JWT Tokens]
        G[Session Management]
        H[Password Hashing]
        I[Two-Factor Auth]
    end

    subgraph "Authorization Layer"
        J[Role-Based Access]
        K[Route Protection]
        L[API Permissions]
        M[Resource Access Control]
    end

    subgraph "Data Protection"
        N[Data Encryption at Rest]
        O[Data Encryption in Transit]
        P[Database Security]
        Q[File Storage Security]
    end

    subgraph "Infrastructure Security"
        R[HTTPS/TLS]
        S[Rate Limiting]
        T[Firewall Protection]
        U[Security Monitoring]
        V[Audit Logging]
    end

    A --> E
    B --> E
    C --> F
    D --> F

    E --> J
    F --> K
    G --> L
    H --> M
    I --> M

    J --> N
    K --> O
    L --> P
    M --> Q

    N --> R
    O --> S
    P --> T
    Q --> U

    R --> V
    S --> V
    T --> V
    U --> V

    style E fill:#ff6b35
    style J fill:#f9c74f
    style N fill:#90e0ef
    style R fill:#90e0ef
```

## 7. Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        A[Local Development]
        B[Git Repository]
        C[Feature Branches]
    end

    subgraph "CI/CD Pipeline"
        D[GitHub Actions]
        E[Build Process]
        F[Testing Suite]
        G[Code Quality Checks]
        H[Security Scans]
    end

    subgraph "Staging Environment"
        I[Staging Server]
        J[Integration Testing]
        K[Performance Testing]
        L[User Acceptance Testing]
    end

    subgraph "Production Environment"
        M[Load Balancer]
        N[Web Servers]
        O[Application Servers]
        P[Database Cluster]
        Q[File Storage]
        R[CDN]
    end

    subgraph "Monitoring & Logging"
        S[Application Monitoring]
        T[Performance Metrics]
        U[Error Tracking]
        V[User Analytics]
        W[Security Monitoring]
    end

    A --> B
    B --> C
    C --> D

    D --> E
    E --> F
    F --> G
    G --> H

    H --> I
    I --> J
    J --> K
    K --> L

    L --> M
    M --> N
    N --> O
    O --> P
    P --> Q
    Q --> R

    N --> S
    O --> T
    P --> U
    R --> V
    M --> W

    style D fill:#ff6b35
    style M fill:#f9c74f
    style P fill:#90e0ef
    style S fill:#90e0ef
```

## Color Legend
- 🟠 **Orange (#ff6b35)**: Core System Components
- 🟡 **Yellow (#f9c74f)**: Processing/Logic Components
- 🔵 **Blue (#90e0ef)**: Data Storage/Output Components
- ⚪ **White**: Standard Components
