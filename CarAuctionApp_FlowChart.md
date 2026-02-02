# Car Auction Application - Flow Chart

## Application Overview
This is a comprehensive car auction and bidding platform with multiple user roles (Admin, Dealer, Inspector, Sales Person, User) and real-time WebSocket functionality for live bidding.

## Main Application Flow

```mermaid
flowchart TD
    A[User Enters Application] --> B{User Authenticated?}
    B -->|No| C[Landing Page / Home]
    B -->|Yes| D[Role-Based Dashboard]
    
    C --> E[Browse Cars]
    C --> F[View Premium Cars]
    C --> G[Sign In/Register]
    
    G --> H[Authentication]
    H --> I{Authentication Success?}
    I -->|No| G
    I -->|Yes| J[Role Detection]
    
    J --> K{User Role}
    K -->|Admin| L[Admin Dashboard]
    K -->|Dealer| M[Dealer Dashboard]
    K -->|Inspector| N[Inspector Dashboard]
    K -->|Sales Person| O[Sales Dashboard]
    K -->|User| P[User Dashboard]
    
    E --> Q[Car Listing Page]
    F --> R[Premium Car Listing]
    
    Q --> S[Filter & Search Cars]
    R --> T[Premium Car Details]
    S --> U[Car Details Page]
    
    U --> V{User Authenticated?}
    V -->|No| W[Login Prompt]
    V -->|Yes| X[Car Actions]
    
    X --> Y[Add to Favorites]
    X --> Z[Contact Dealer]
    X --> AA[View Inspection Report]
    X --> BB[Place Bid - Premium Cars]
    
    BB --> CC[Live Bidding System]
    CC --> DD[WebSocket Connection]
    DD --> EE[Real-time Bid Updates]
    EE --> FF[Bid Confirmation]
```

## User Role Flows

### 1. Admin Flow
```mermaid
flowchart TD
    A[Admin Login] --> B[Admin Dashboard]
    B --> C[User Management]
    B --> D[Dealer Management]
    B --> E[Inspector Management]
    B --> F[Sales Person Management]
    B --> G[Car Model Management]
    B --> H[Color Management]
    B --> I[Transaction Management]
    B --> J[Bidding Management]
    
    C --> K[View User Requests]
    C --> L[Approve/Reject Users]
    
    D --> M[View Dealer Info]
    D --> N[Edit Dealer Details]
    D --> O[Manage Dealer Cars]
    
    E --> P[View Inspector Info]
    E --> Q[Edit Inspector Details]
    E --> R[Assign Inspections]
    
    F --> S[View Sales Info]
    F --> T[Edit Sales Details]
    
    G --> U[Add Car Models]
    G --> V[Edit Car Models]
    
    H --> W[Add Colors]
    H --> X[Edit Colors]
    
    I --> Y[View Transactions]
    I --> Z[Wallet Management]
    
    J --> AA[View Bidding Cars]
    J --> BB[Manage Bidding Process]
```

### 2. Dealer Flow
```mermaid
flowchart TD
    A[Dealer Login] --> B[Dealer Dashboard]
    B --> C[Add Cars for Sale]
    B --> D[Manage Existing Cars]
    B --> E[Premium Car Management]
    B --> F[B2B Transactions]
    B --> G[Pending Requests]
    B --> H[Live Bidding]
    B --> I[Winner Section]
    
    C --> J[Add Regular Car]
    C --> K[Add Premium Car]
    C --> L[Upload Car Images]
    
    D --> M[Edit Car Details]
    D --> N[Update Car Images]
    D --> O[View Car Status]
    
    E --> P[Add Premium Car]
    E --> Q[Edit Premium Car]
    
    F --> R[B2B Car List]
    F --> S[B2B Transactions]
    
    G --> T[View Pending Requests]
    G --> U[Approve/Reject Requests]
    
    H --> V[Live Bidding Interface]
    V --> W[Real-time Bid Updates]
    W --> X[Bid Management]
    
    I --> Y[View Winners]
    I --> Z[Contact Winners]
```

### 3. Inspector Flow
```mermaid
flowchart TD
    A[Inspector Login] --> B[Inspector Dashboard]
    B --> C[Car Verification]
    B --> D[Inspection Reports]
    B --> E[User Car Inspections]
    
    C --> F[Select Car to Inspect]
    F --> G[Engine Inspection]
    F --> H[Exterior Inspection]
    F --> I[Interior Inspection]
    F --> J[Electrical Inspection]
    F --> K[AC Inspection]
    F --> L[Steering Inspection]
    F --> M[Tyre Inspection]
    F --> N[Document Verification]
    
    G --> O[Engine Section Report]
    H --> P[Exterior Section Report]
    I --> Q[Interior Section Report]
    J --> R[Electrical Section Report]
    K --> S[AC Section Report]
    L --> T[Steering Section Report]
    M --> U[Tyre Section Report]
    N --> V[Document Section Report]
    
    O --> W[Final Inspection Report]
    P --> W
    Q --> W
    R --> W
    S --> W
    T --> W
    U --> W
    V --> W
    
    W --> X[Submit Report]
    X --> Y[Report Available to Users]
```

### 4. Sales Person Flow
```mermaid
flowchart TD
    A[Sales Person Login] --> B[Sales Dashboard]
    B --> C[User Sale Requests]
    B --> D[B2B Management]
    B --> E[Car Listing]
    B --> F[Inspection Reports]
    
    C --> G[View User Requests]
    C --> H[Edit User Requests]
    C --> I[Approve/Reject Requests]
    
    D --> J[B2B Seller Interface]
    D --> K[B2B Buyer Interface]
    
    E --> L[Manage Car Listings]
    
    F --> M[View Inspection Reports]
    F --> N[Generate Reports]
```

### 5. User Flow
```mermaid
flowchart TD
    A[User Login] --> B[User Dashboard]
    B --> C[Sell My Car]
    B --> D[My Favorites]
    B --> E[My Profile]
    B --> F[Transaction History]
    
    C --> G[Fill Sell Car Form]
    G --> H[Submit for Inspection]
    H --> I[Inspection Process]
    I --> J[Inspection Report]
    J --> K[Car Listed for Sale]
    
    D --> L[View Favorite Cars]
    D --> M[Remove from Favorites]
    
    E --> N[Update Profile]
    E --> O[Change Password]
    
    F --> P[View Transactions]
    F --> Q[Wallet Management]
```

## WebSocket Real-time Bidding Flow

```mermaid
flowchart TD
    A[User Joins Bidding] --> B[WebSocket Connection]
    B --> C[Subscribe to Topics]
    C --> D[/topic/bids]
    C --> E[/topic/topThreeBids]
    C --> F[/topic/liveCars]
    
    D --> G[Receive Bid Updates]
    E --> H[Receive Top Bids]
    F --> I[Receive Live Cars]
    
    G --> J[Update UI in Real-time]
    H --> K[Update Bid Rankings]
    I --> L[Update Car Listings]
    
    M[User Places Bid] --> N[Publish to /app/placeBid]
    N --> O[Server Processes Bid]
    O --> P[Broadcast to /topic/bids]
    P --> Q[All Users Receive Update]
    
    R[Request Top Bids] --> S[Publish to /app/topThreeBids]
    S --> T[Server Returns Top Bids]
    T --> U[Broadcast to /topic/topThreeBids]
    U --> V[Update Bid Rankings]
    
    W[Request Live Cars] --> X[Publish to /app/liveCars]
    X --> Y[Server Returns Live Cars]
    Y --> Z[Broadcast to /topic/liveCars]
    Z --> AA[Update Car Listings]
```

## Authentication & Authorization Flow

```mermaid
flowchart TD
    A[User Access] --> B{Token Exists?}
    B -->|No| C[Public Routes]
    B -->|Yes| D[Token Validation]
    
    D --> E{Token Valid?}
    E -->|No| F[Remove Token]
    F --> G[Redirect to Login]
    E -->|Yes| H[Decode Token]
    
    H --> I[Extract User Role]
    I --> J[Role-Based Access Control]
    
    J --> K{User Role}
    K -->|Admin| L[Admin Routes]
    K -->|Dealer| M[Dealer Routes]
    K -->|Inspector| N[Inspector Routes]
    K -->|Sales| O[Sales Routes]
    K -->|User| P[User Routes]
    
    C --> Q[Home Page]
    C --> R[Car Listings]
    C --> S[About Us]
    C --> T[Contact Us]
```

## Car Inspection Process Flow

```mermaid
flowchart TD
    A[Car Submitted for Sale] --> B[Assign Inspector]
    B --> C[Inspector Selects Car]
    C --> D[Start Inspection Process]
    
    D --> E[Engine Section]
    D --> F[Exterior Section]
    D --> G[Interior Section]
    D --> H[Electrical Section]
    D --> I[AC Section]
    D --> J[Steering Section]
    D --> K[Tyre Section]
    D --> L[Document Section]
    
    E --> M[Engine Report]
    F --> N[Exterior Report]
    G --> O[Interior Report]
    H --> P[Electrical Report]
    I --> Q[AC Report]
    J --> R[Steering Report]
    K --> S[Tyre Report]
    L --> T[Document Report]
    
    M --> U[Compile Final Report]
    N --> U
    O --> U
    P --> U
    Q --> U
    R --> U
    S --> U
    T --> U
    
    U --> V[Submit Final Report]
    V --> W[Report Available to Users]
    W --> X[Car Listed for Sale]
```

## Key Features Summary

### Real-time Features
- **Live Bidding**: WebSocket-based real-time bidding system
- **Top Bids Tracking**: Real-time updates of top 3 bids per car
- **Live Car Listings**: Real-time updates of available cars

### User Management
- **Multi-role System**: Admin, Dealer, Inspector, Sales Person, User
- **Role-based Access**: Middleware protection for different user types
- **Profile Management**: User profile updates and password changes

### Car Management
- **Car Listings**: Browse and filter cars
- **Premium Cars**: Special premium car category
- **Car Details**: Detailed car information with images
- **Inspection Reports**: Comprehensive car inspection system

### Bidding System
- **Live Bidding**: Real-time auction functionality
- **Bid History**: Track all bids for each car
- **Winner Management**: Handle winning bids and payments

### Transaction System
- **Wallet Management**: User wallet functionality
- **Transaction History**: Track all financial transactions
- **Payment Processing**: Handle payments for won bids

This flow chart represents a comprehensive car auction platform with real-time bidding capabilities, multi-role user management, and extensive car inspection and management features. 