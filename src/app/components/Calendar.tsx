"use client";

// ============================================================================
// CALENDAR COMPONENT
// ============================================================================
// This is the main calendar component that displays the FullCalendar with:
// - Time grid view showing hourly slots
// - Staff members as resources (columns)
// - Events/appointments
// - Current time indicator (red line)
// - Auto-scroll to current time when "Today" is clicked

import { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { EventClickArg, EventContentArg } from "@fullcalendar/core";

// ============================================================================
// DATA CONFIGURATION
// ============================================================================

// Get today's date in YYYY-MM-DD format for dynamic event creation
const today = new Date().toISOString().split('T')[0];

// Sample events data - mix of today's events and historical events
const events = [
  // TODAY'S EVENTS (dynamically created)
  {
    id: "today1",
    title: "Morning Meeting\nToday",
    start: `${today}T09:00:00`,
    end: `${today}T10:00:00`,
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "abril",
  },
  {
    id: "today2",
    title: "Afternoon Session\nToday",
    start: `${today}T14:00:00`,
    end: `${today}T15:00:00`,
    backgroundColor: "#a78bfa",
    borderColor: "#a78bfa",
    resourceId: "allan",
  },
  {
    id: "today3",
    title: "Evening Check\nToday",
    start: `${today}T18:00:00`,
    end: `${today}T19:00:00`,
    backgroundColor: "#fbbf24",
    borderColor: "#fbbf24",
    resourceId: "bianca",
  },
  
  // HISTORICAL EVENTS (for demonstration)
  {
    id: "1",
    title: "Robert Foo\nMedical staff",
    start: "2025-10-21T08:00:00",
    end: "2025-10-21T08:30:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "abril",
  },
  {
    id: "2",
    title: "Cody Fisher\nMedical sta...",
    start: "2025-10-21T09:00:00",
    end: "2025-10-21T09:30:00",
    backgroundColor: "#a78bfa",
    borderColor: "#a78bfa",
    resourceId: "abril",
  },
  {
    id: "3",
    title: "Annette Black\nChecked in",
    start: "2025-10-21T09:30:00",
    end: "2025-10-21T10:30:00",
    backgroundColor: "#a78bfa",
    borderColor: "#a78bfa",
    resourceId: "abril",
  },
  {
    id: "4",
    title: "Kathryn Murphy\nChecked in",
    start: "2025-10-21T10:00:00",
    end: "2025-10-21T10:30:00",
    backgroundColor: "#a78bfa",
    borderColor: "#a78bfa",
    resourceId: "abril",
  },
  {
    id: "5",
    title: "Brooklyn Simmons\nChecked in",
    start: "2025-10-21T10:30:00",
    end: "2025-10-21T11:30:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "abril",
  },
  {
    id: "6",
    title: "Arlene McCoy\nMedical staff",
    start: "2025-10-21T11:00:00",
    end: "2025-10-21T12:00:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "abril",
  },
  {
    id: "7",
    title: "Seminar",
    start: "2025-10-21T12:00:00",
    end: "2025-10-21T13:00:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "abril",
  },
  {
    id: "8",
    title: "Cameron Williamson\nConfirmed",
    start: "2025-10-21T14:00:00",
    end: "2025-10-21T15:00:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "abril",
  },
  {
    id: "9",
    title: "Jacob Jones\nMedical sta...",
    start: "2025-10-21T09:00:00",
    end: "2025-10-21T10:00:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "allan",
  },
  {
    id: "10",
    title: "Esther Howard\nConfirmed",
    start: "2025-10-21T10:00:00",
    end: "2025-10-21T11:30:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "allan",
  },
  {
    id: "11",
    title: "Chloe McKinney\nConfirmed",
    start: "2025-10-21T12:00:00",
    end: "2025-10-21T13:00:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "allan",
  },
  {
    id: "12",
    title: "Ronald Richards\nConfirmed",
    start: "2025-10-21T12:00:00",
    end: "2025-10-21T13:00:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "bianca",
  },
  {
    id: "13",
    title: "Darrell Steward\nChecked in",
    start: "2025-10-21T12:30:00",
    end: "2025-10-21T14:00:00",
    backgroundColor: "#fbbf24",
    borderColor: "#fbbf24",
    resourceId: "bianca",
  },
  {
    id: "14",
    title: "Evening Meeting",
    start: "2025-10-21T18:00:00",
    end: "2025-10-21T19:30:00",
    backgroundColor: "#fbbf24",
    borderColor: "#fbbf24",
    resourceId: "abril",
  },
  {
    id: "15",
    title: "Late Night Session",
    start: "2025-10-21T22:00:00",
    end: "2025-10-21T23:30:00",
    backgroundColor: "#a78bfa",
    borderColor: "#a78bfa",
    resourceId: "allan",
  },
  {
    id: "16",
    title: "Early Morning\nCheck-in",
    start: "2025-10-21T06:00:00",
    end: "2025-10-21T07:00:00",
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
    resourceId: "bianca",
  },
  {
    id: "17",
    title: "Night Shift\nCoverage",
    start: "2025-10-21T20:00:00",
    end: "2025-10-21T06:00:00",
    backgroundColor: "#a78bfa",
    borderColor: "#a78bfa",
    resourceId: "allan",
  },
];

// ============================================================================
// INTERFACES
// ============================================================================

interface MyCalendarProps {
  filteredResources?: string[]; // Which staff members to show
  selectedDate?: Date;          // Which date to display
}

// ============================================================================
// MAIN CALENDAR COMPONENT
// ============================================================================

export default function MyCalendar({ 
  filteredResources = ["abril", "allan", "bianca"], 
  selectedDate = new Date() 
}: MyCalendarProps) {
  
  // Reference to the FullCalendar instance for API access
  const calendarRef = useRef<FullCalendar>(null);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  /**
   * Handle event clicks - show event details
   * @param clickInfo - FullCalendar event click information
   */
  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

  // ============================================================================
  // AUTO-SCROLL TO CURRENT TIME
  // ============================================================================
  
  /**
   * Auto-scroll to current time when date changes to today
   * This is triggered when the "Today" button is clicked
   */
  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();
      const today = new Date();
      
      // Only auto-scroll if we're viewing today's date
      if (selectedDate.toDateString() === today.toDateString()) {
        
        // Wait for calendar to render completely
        setTimeout(() => {
          const now = new Date();
          const timeStr = now.toTimeString().split(' ')[0]; // Get HH:MM:SS format
          
          // Step 1: Use FullCalendar's built-in scrollToTime method
          calendar.scrollToTime(timeStr, true); // true = smooth scrolling
          
          // Step 2: Fine-tune the scroll position to center the current time
          setTimeout(() => {
            const scrollContainer = calendar.el.querySelector('.fc-scroller');
            if (scrollContainer) {
              const containerHeight = scrollContainer.clientHeight;
              const currentHour = now.getHours();
              const currentMinute = now.getMinutes();
              
              // Calculate exact position of current time slot
              // Each hour slot = 80px (5em), each minute = 80/60 = 1.33px
              const currentTimePosition = (currentHour * 80) + (currentMinute / 60) * 80;
              
              // Center the current time slot in the viewport
              const centerOffset = containerHeight / 2;
              const scrollPosition = Math.max(0, currentTimePosition - centerOffset);
              
              // Debug logging for development
              console.log('Centering current time slot:');
              console.log('- Current hour:', currentHour);
              console.log('- Current minute:', currentMinute);
              console.log('- Current time position:', currentTimePosition, 'px');
              console.log('- Container height:', containerHeight, 'px');
              console.log('- Center offset:', centerOffset, 'px');
              console.log('- Scroll position:', scrollPosition, 'px');
              
              // Smooth scroll to center the current time slot
              scrollContainer.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
              });
            }
          }, 400); // Wait 400ms for scrollToTime to complete
        }, 600); // Wait 600ms for calendar to render
      }
    }
  }, [selectedDate]); // Re-run when selectedDate changes

  // ============================================================================
  // EVENT RENDERING
  // ============================================================================
  
  /**
   * Custom event content renderer
   * Shows event title and subtitle (if available)
   * @param eventInfo - FullCalendar event content information
   */
  const renderEventContent = (eventInfo: EventContentArg) => {
    const lines = eventInfo.event.title.split("\n");
    return (
      <div className="p-2 overflow-hidden">
        <div className="font-semibold text-xs truncate">{lines[0]}</div>
        {lines[1] && (
          <div className="text-[10px] opacity-80 truncate">{lines[1]}</div>
        )}
      </div>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 h-[calc(100vh-240px)]">
      <FullCalendar
        ref={calendarRef}
        
        // ====================================================================
        // PLUGINS & VIEW CONFIGURATION
        // ====================================================================
        plugins={[timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        initialView="resourceTimeGridDay"
        initialDate={selectedDate}
        key={selectedDate.toISOString()} // Force re-render when date changes
        
        // ====================================================================
        // RESOURCES (STAFF MEMBERS)
        // ====================================================================
        resources={[
          { id: "abril", title: "Abril Lewis" },
          { id: "allan", title: "Allan Hicks" },
          { id: "bianca", title: "Bianca West" },
        ].filter(resource => filteredResources.includes(resource.id))}
        
        // ====================================================================
        // CALENDAR CONFIGURATION
        // ====================================================================
        headerToolbar={false} // We use our custom header
        slotMinTime="00:00:00" // Start at midnight
        slotMaxTime="24:00:00" // End at midnight (24-hour view)
        slotDuration="01:00:00" // 1-hour time slots
        allDaySlot={false} // Hide all-day slot
        nowIndicator={true} // Show current time indicator (red line)
        nowIndicatorClassNames="now-indicator-line"
        
        // Current time indicator content (shows time badge)
        nowIndicatorContent={() => {
          const now = new Date();
          return now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          });
        }}
        
        // ====================================================================
        // INTERACTION SETTINGS
        // ====================================================================
        editable={true} // Allow event editing
        selectable={true} // Allow time slot selection
        selectMirror={true} // Show selection preview
        dayMaxEvents={false} // No limit on events per day
        
        // ====================================================================
        // DISPLAY SETTINGS
        // ====================================================================
        height="100%" // Full height of container
        expandRows={true} // Expand rows to fill available space
        events={events} // Event data
        eventClick={handleEventClick} // Event click handler
        eventContent={renderEventContent} // Custom event renderer
        
        // ====================================================================
        // TIME FORMATTING
        // ====================================================================
        slotLabelFormat={{
          hour: "numeric",
          hour12: true, // Show AM/PM
        }}
        slotLabelInterval="01:00:00" // Show labels every hour
        
        // ====================================================================
        // RESOURCE AREA SETTINGS
        // ====================================================================
        resourceAreaWidth="200px" // Width of staff member column
        resourceLabelText="Staff" // Header text for resources
        resourceColumns={[
          {
            field: 'title',
            headerText: 'Staff Member'
          }
        ]}
        
        // ====================================================================
        // DATE FORMATTING
        // ====================================================================
        dayHeaderFormat={{
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }}
        
        // ====================================================================
        // EVENT DISPLAY SETTINGS
        // ====================================================================
        eventDisplay="block" // Show events as blocks
        eventOverlap={false} // Don't allow event overlap
        eventConstraint={{
          start: '00:00',
          end: '24:00'
        }}
        slotMinWidth={120} // Minimum width for time slots
        
        // ====================================================================
        // SCROLL SETTINGS
        // ====================================================================
        scrollTime={new Date().toTimeString().split(' ')[0]} // Initial scroll position
        scrollTimeReset={false} // Don't reset scroll on date change
        aspectRatio={1.8} // Calendar aspect ratio
      />  
    </div>
  );
}