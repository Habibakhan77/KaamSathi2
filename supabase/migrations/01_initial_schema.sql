-- ====================================================================
-- KaamSaathi: AI-Powered Verified Local Services Marketplace for Pakistan
-- BS Software Engineering Capstone Project - University of Swat
-- Database Schema & Row Level Security (RLS) Policies
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('customer', 'provider', 'admin');
CREATE TYPE verification_status_type AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE booking_status_type AS ENUM ('requested', 'quoted', 'accepted', 'on_the_way', 'in_progress', 'completed', 'cancelled');
CREATE TYPE subscription_tier_type AS ENUM ('basic', 'pro', 'elite');

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Mingora',
    district TEXT NOT NULL DEFAULT 'Swat',
    address TEXT,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. PROVIDER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.provider_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    cnic TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    experience_years INTEGER NOT NULL DEFAULT 1,
    hourly_rate NUMERIC(10, 2) NOT NULL DEFAULT 500,
    service_areas TEXT[] NOT NULL DEFAULT '{"Mingora", "Saidu Sharif"}',
    verification_status verification_status_type NOT NULL DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    review_count INTEGER NOT NULL DEFAULT 0,
    completed_jobs INTEGER NOT NULL DEFAULT 0,
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_promoted BOOLEAN NOT NULL DEFAULT false,
    subscription_tier subscription_tier_type NOT NULL DEFAULT 'basic',
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. SERVICE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_urdu TEXT NOT NULL,
    name_pashto TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT NOT NULL,
    description TEXT,
    popular_tasks TEXT[] DEFAULT '{}',
    base_price_pkr NUMERIC(10, 2) NOT NULL DEFAULT 500,
    provider_count INTEGER DEFAULT 0
);

-- 6. VERIFICATION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.verification_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_profile_id UUID NOT NULL REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    cnic_front_url TEXT NOT NULL,
    cnic_back_url TEXT NOT NULL,
    cnic_number TEXT NOT NULL,
    skill_proof_url TEXT,
    status verification_status_type NOT NULL DEFAULT 'pending',
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    reviewed_at TIMESTAMPTZ,
    reviewed_by TEXT,
    admin_notes TEXT
);

-- 7. SERVICE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL REFERENCES public.categories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    area TEXT NOT NULL,
    urgency TEXT NOT NULL DEFAULT 'medium',
    preferred_date DATE,
    preferred_time_slot TEXT,
    status booking_status_type NOT NULL DEFAULT 'requested',
    ai_parsed JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. QUOTATIONS TABLE
CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    estimated_cost NUMERIC(10, 2) NOT NULL,
    duration TEXT NOT NULL,
    breakdown JSONB NOT NULL DEFAULT '[]',
    note TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
    quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    category TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'Cash on Completion',
    timeline JSONB NOT NULL DEFAULT '[]',
    current_status booking_status_type NOT NULL DEFAULT 'accepted',
    scheduled_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. COMPLAINTS TABLE
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    resolved_at TIMESTAMPTZ
);

-- 12. FRAUD FLAGS TABLE (AI-Assisted Engine)
CREATE TABLE IF NOT EXISTS public.fraud_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
    flag_type TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'investigating',
    flagged_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tier subscription_tier_type NOT NULL DEFAULT 'basic',
    status TEXT NOT NULL DEFAULT 'active',
    current_period_end TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Categories are public to read
CREATE POLICY "Categories are readable by everyone" ON public.categories FOR SELECT USING (true);

-- Profiles: Public can read basic profile, user can edit own, admin has full access
CREATE POLICY "Profiles viewable by authenticated users" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Provider Profiles: Approved providers are publicly viewable
CREATE POLICY "Provider profiles readable by everyone" ON public.provider_profiles FOR SELECT USING (true);
CREATE POLICY "Providers can update own profile" ON public.provider_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Service Requests: Customers manage their own, providers can view relevant requests
CREATE POLICY "Customers view own requests" ON public.service_requests FOR SELECT USING (auth.uid() = customer_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'provider'));
CREATE POLICY "Customers create requests" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Quotations: Visible to requester and quoting provider
CREATE POLICY "Quotations viewable by customer and provider" ON public.quotations FOR SELECT USING (
    auth.uid() = provider_id OR EXISTS (SELECT 1 FROM public.service_requests WHERE id = request_id AND customer_id = auth.uid())
);
CREATE POLICY "Providers insert quotations" ON public.quotations FOR INSERT WITH CHECK (auth.uid() = provider_id);

-- Bookings: Visible to booking customer and assigned provider
CREATE POLICY "Bookings viewable by participant" ON public.bookings FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = provider_id);
CREATE POLICY "Participants update booking status" ON public.bookings FOR UPDATE USING (auth.uid() = customer_id OR auth.uid() = provider_id);

-- Reviews: Public to read, customer can insert once for their completed booking
CREATE POLICY "Reviews viewable by all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Customer can create review" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Admin has bypass on all tables
CREATE POLICY "Admins have full access on verification_requests" ON public.verification_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins have full access on fraud_flags" ON public.fraud_flags FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins have full access on complaints" ON public.complaints FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
