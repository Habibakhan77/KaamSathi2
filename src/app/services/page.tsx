"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
  Filter,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { ProviderProfile } from "@/lib/types";
import { useLocation } from "@/lib/location/LocationContext";
import { DEFAULT_REGION, SWAT_AREAS, isSameArea, isSwatArea } from "@/lib/location/swat-areas";

export default function ServicesPage() {
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  // Area filter is driven by the global navbar location ("Swat" = all areas).
  const { location, setLocation } = useLocation();
  const selectedArea = location === DEFAULT_REGION ? "all" : location;
  const setSelectedArea = (area: string) =>
    setLocation(isSwatArea(area) ? area : DEFAULT_REGION);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Read category from URL query if present
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("cat");
      if (cat) setSelectedCategory(cat);
    }

    async function loadProviders() {
      try {
        const res = await fetch("/api/providers");
        const data = await res.json();
        setProviders(data);
      } catch (err) {
        console.error("Failed to load providers:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProviders();
  }, []);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "electrician", name: "Electrician" },
    { id: "plumber", name: "Plumber" },
    { id: "ac-technician", name: "AC Technician" },
    { id: "carpenter", name: "Carpenter" },
    { id: "solar", name: "Solar & Inverter" },
    { id: "painter", name: "Painter" },
    { id: "cleaning", name: "Deep Cleaning" },
    { id: "appliance", name: "Appliance Repair" },
  ];

  const filtered = providers.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    if (
      selectedArea !== "all" &&
      !p.serviceAreas.some((a) => isSameArea(a, selectedArea))
    )
      return false;
    if (p.rating < minRating) return false;
    if (onlyVerified && p.verificationStatus !== "approved") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.businessName.toLowerCase().includes(q);
      const matchSkills = p.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchSkills) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumbs */}
      <div className="space-y-2 border-b border-[#D8E4DC] dark:border-[#24382E] pb-6">
        <span className="text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E] uppercase tracking-wider">
          Marketplace Directory • Swat Valley
        </span>
        <h1 className="text-3xl font-extrabold text-[#151515] dark:text-[#F2F7F4]">
          All Verified Local Services &amp; Technicians
        </h1>
        <p className="text-xs sm:text-sm text-[#3E4F47] dark:text-[#B8C9C0]">
          Filter by trade, area, rating, and verify government CNIC audit credentials before booking.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3E4F47] dark:text-[#B8C9C0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill (e.g. inverter, wiring, leaking pipe, polish)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#D8E4DC] dark:border-[#24382E] bg-[#F7FAF8] dark:bg-[#0B1410] text-[#151515] dark:text-[#F2F7F4] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-3xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-[#0A5C2E] text-white shadow-sm"
                    : "border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] text-[#3E4F47] dark:text-[#B8C9C0] hover:text-[#151515]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Area & Rating Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] text-xs font-semibold text-[#151515] dark:text-[#F2F7F4] focus:outline-none"
            >
              <option value="all">All Swat Areas</option>
              {SWAT_AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                onlyVerified
                  ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-[#0A5C2E] dark:text-[#1EB55E]"
                  : "border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CNIC Verified Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Provider Results Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
          <span>Showing {filtered.length} professionals found</span>
          <span className="italic">Swat Pilot Launch • Demo Profile Registry</span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-sm font-semibold text-[#3E4F47] dark:text-[#B8C9C0] animate-pulse">
            Loading verified professionals in Swat...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] text-center space-y-3">
            <p className="text-sm font-bold text-[#151515] dark:text-[#F2F7F4]">
              No service providers found matching your filter criteria.
            </p>
            <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
              Try selecting &quot;All Categories&quot; or clearing the search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedArea("all");
                setSearchQuery("");
                setOnlyVerified(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#0A5C2E] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card hover:shadow-cardHover transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heading font-bold text-base text-[#151515] dark:text-[#F2F7F4]">
                          {p.businessName}
                        </h3>
                        {p.verificationStatus === "approved" && (
                          <span title="NADRA CNIC Verified">
                            <BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          </span>
                        )}
                      </div>
                      <span className="inline-block mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-[#0A5C2E] dark:text-[#1EB55E] capitalize">
                        {p.category.replace("-", " ")}
                      </span>
                    </div>

                    {p.isPromoted && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F5A524] text-[#151515] text-[10px] font-black uppercase">
                        Promoted
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      {p.rating}
                    </span>
                    <span className="text-[#3E4F47] dark:text-[#B8C9C0]">
                      ({p.reviewCount} reviews)
                    </span>
                    <span>•</span>
                    <span className="text-[#3E4F47] dark:text-[#B8C9C0]">
                      {p.experienceYears} yrs experience
                    </span>
                  </div>

                  <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0] line-clamp-2 leading-relaxed">
                    {p.bio}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
                    <MapPin className="w-3.5 h-3.5 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0" />
                    <span>Serving: {p.serviceAreas.join(", ")}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {p.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F7FAF8] dark:bg-[#0B1410] border border-[#D8E4DC] dark:border-[#24382E] text-[#3E4F47] dark:text-[#B8C9C0]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D8E4DC] dark:border-[#24382E] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">Rate: </span>
                    <strong className="text-sm font-extrabold text-[#151515] dark:text-[#F2F7F4]">
                      PKR {p.hourlyRate}/hr
                    </strong>
                  </div>

                  <Link
                    href={`/providers/${p.id}`}
                    className="px-4 py-2 rounded-xl bg-[#0A5C2E] hover:bg-[#064A25] text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
