"use client";

// ============================================================================
// MAIN CALENDAR APPLICATION PAGE
// ============================================================================
// This is the main page component that orchestrates the entire calendar app.
// It manages the global state and coordinates between different components.

import MyCalendar from "@/app/components/Calendar";
import Header from "./components/header";
import UserProfile from "./components/UserProfile";
import { useState } from "react";

export default function Home() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // Track which staff members are currently selected/filtered
  // Default: Show all staff members (abril, allan, bianca)
  const [filteredResources, setFilteredResources] = useState<string[]>([
    "abril", "allan", "bianca"
  ]);
  
  // Track the currently selected date for the calendar
  // Default: Today's date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  /**
   * Handle filter changes from the header component
   * @param selectedResources - Array of staff member IDs that are selected
   */
  const handleFilterChange = (selectedResources: string[]) => {
    setFilteredResources(selectedResources);
  };

  /**
   * Handle date changes from the header component
   * @param date - The new date selected by the user
   */
  const handleDateChange = (date: Date) => {
    console.log('Date changed to:', date);
    setSelectedDate(date);
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 
        HEADER COMPONENT
        - Contains navigation controls (Today, Previous/Next date)
        - Contains filter controls (Team members, Filters)
        - Contains action buttons (Settings, Refresh, Add)
      */}
      <Header 
        onFilterChange={handleFilterChange} 
        onDateChange={handleDateChange} 
      />

      {/* 
        USER PROFILE COMPONENT
        - Shows user's profile picture and name
        - Simple display component
      */}
      <UserProfile />

      {/* 
        CALENDAR COMPONENT
        - Main calendar view with time slots and events
        - Receives filtered resources and selected date as props
        - Handles all calendar interactions and display
      */}
      <div className="p-6 pt-4">
        <MyCalendar 
          filteredResources={filteredResources} 
          selectedDate={selectedDate} 
        />
      </div>
    </main>
  );
}