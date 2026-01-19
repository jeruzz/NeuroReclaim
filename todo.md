# NeuroReclaim - Project TODO

## Phase 1: Branding & Setup
- [x] Generate custom app logo and icon
- [x] Update app.config.ts with branding (appName, logoUrl)
- [x] Configure color palette in theme.config.js
- [x] Set up icon mappings in icon-symbol.tsx

## Phase 2: Authentication & Onboarding
- [ ] US-001: Implement registration form with email/password validation
- [ ] Create welcome/splash screen
- [ ] Implement profile selection screen (Athlete vs Clinical User)
- [ ] Implement initial setup form (substance, date, cost, consumption)
- [ ] Set up authentication context and hooks
- [ ] Implement login screen
- [ ] Add session persistence with AsyncStorage

## Phase 3: Core Data Models & Database
- [x] Create database schema (users, substance_config, workouts, checkins, relapse_logs)
- [x] Set up Drizzle ORM models
- [x] Implement database migrations
- [x] Create API endpoints for CRUD operations
- [x] Set up error handling and validation

## Phase 4: Home Screen & Dashboard
- [x] US-002: Create home screen layout
- [x] Implement streak calculation and display
- [x] Implement savings calculation (money saved, quantity avoided, time recovered)
- [x] Create savings metrics card
- [x] Add quick action buttons (Workout, Check-in, Panic)
- [x] Implement scroll layout for home screen

## Phase 5: Workout Tracking
- [ ] US-002: Create workout entry screen
- [ ] Implement exercise list management (add/edit/delete)
- [ ] Implement 1RM calculation (1RM = weight * (1 + reps/30))
- [ ] Create workout history screen
- [ ] Add biometrics integration (if available)
- [ ] Implement offline sync for workouts
- [ ] Add gamification points for completed workouts (+20 points)

## Phase 6: Check-in System
- [ ] US-007: Create daily check-in screen
- [ ] Implement mood scale (1-10)
- [ ] Implement craving scale (1-10)
- [ ] Add biometrics fields (HR, steps, etc.)
- [ ] Implement notes field with encryption
- [ ] Create check-in history screen
- [ ] Add trend visualization (mood vs craving)
- [ ] Implement gamification points for check-ins (+10 points for healthy check-in)

## Phase 7: Savings & Metrics Visualization
- [ ] US-003: Create recovery metrics screen
- [ ] Implement savings chart (line graph - money over time)
- [ ] Implement quantity avoided chart (bar chart)
- [ ] Implement time recovered indicator (circular progress)
- [ ] Add period selector (7/30/90/365 days)
- [ ] Implement projection calculations
- [ ] Make charts responsive

## Phase 8: Gamification System
- [ ] Implement dopamine level system (5 levels)
- [ ] Create level progression logic
- [ ] Implement points system (+10, +20, +50 based on activities)
- [ ] Create streak multiplier (x1.5 if >7 days)
- [ ] Create badges/achievements system
- [ ] Implement profile screen with level display
- [ ] Create achievements screen with badge grid
- [ ] Add visual feedback for level ups

## Phase 9: Relapse & Crisis Management
- [ ] US-004: Implement panic button with emergency contacts
- [ ] US-005: Create relapse logging screen
- [ ] Implement trigger tag system
- [ ] Implement partial streak reset logic
- [ ] Add positive feedback messaging
- [ ] Create crisis resources screen
- [ ] Implement location sharing (if authorized)
- [ ] Add notification system for emergency contacts

## Phase 10: Clinical Features (User Clínico Profile)
- [ ] US-006: Implement informed consent screen (GDPR-compliant)
- [ ] US-007: Implement clinical check-in with mood/craving/biometrics
- [ ] US-008: Create therapist access screen with invitation codes
- [ ] US-010: Implement clinical parameters import
- [ ] Add data sharing flags and privacy controls
- [ ] Implement audit logs for data access

## Phase 11: Settings & Privacy
- [ ] Create settings screen
- [ ] Implement notification preferences
- [ ] Add theme toggle (light/dark mode)
- [ ] Implement privacy/consent management
- [ ] Add logout functionality
- [ ] Create substance configuration editor
- [ ] Implement data export functionality

## Phase 12: Notifications & Background Sync
- [ ] Set up Firebase Cloud Messaging (or alternative)
- [ ] Implement push notifications for check-in reminders
- [ ] Implement therapist notifications for high craving/mood alerts
- [ ] Set up background sync for offline data
- [ ] Implement delta sync strategy
- [ ] Add notification permissions handling

## Phase 13: Testing & Validation
- [ ] Write unit tests for savings calculations
- [ ] Write unit tests for 1RM calculation
- [ ] Write unit tests for gamification logic
- [ ] Test offline functionality
- [ ] Test data encryption/decryption
- [ ] Perform end-to-end testing of main flows
- [ ] Test on iOS and Android
- [ ] Test dark mode compatibility

## Phase 14: Performance & Optimization
- [ ] Optimize FlatList rendering
- [ ] Implement lazy loading for charts
- [ ] Optimize database queries
- [ ] Implement caching strategies
- [ ] Profile app performance
- [ ] Reduce bundle size

## Phase 15: Deployment & Documentation
- [ ] Create deployment checklist
- [ ] Generate app icon variants (iOS, Android)
- [ ] Create privacy policy
- [ ] Create terms of service
- [ ] Prepare app store listings
- [ ] Create user documentation
- [ ] Set up CI/CD pipeline
- [ ] Deploy to staging environment

## Known Issues & Bugs
- (None yet - will be updated as development progresses)

## Notes
- All calculations must be configurable by clinical teams
- Offline-first architecture is critical for accessibility
- E2EE encryption required for clinical notes
- GDPR compliance mandatory for data handling
- No hardcoded medical values - all parametrizable
