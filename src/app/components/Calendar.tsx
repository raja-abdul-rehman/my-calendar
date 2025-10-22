"use client";
import { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { EventClickArg, EventContentArg } from "@fullcalendar/core";

const events = [
  { id: "1", title: "Robert Foo\nMedical staff", start: "2025-10-21T08:00:00", end: "2025-10-21T08:30:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "abril" },
  { id: "2", title: "Cody Fisher\nMedical sta...", start: "2025-10-21T09:00:00", end: "2025-10-21T09:30:00", backgroundColor: "#a78bfa", borderColor: "#a78bfa", resourceId: "abril" },
  { id: "3", title: "Annette Black\nChecked in", start: "2025-10-21T09:30:00", end: "2025-10-21T10:30:00", backgroundColor: "#a78bfa", borderColor: "#a78bfa", resourceId: "abril" },
  { id: "4", title: "Kathryn Murphy\nChecked in", start: "2025-10-21T10:00:00", end: "2025-10-21T10:30:00", backgroundColor: "#a78bfa", borderColor: "#a78bfa", resourceId: "abril" },
  { id: "5", title: "Brooklyn Simmons\nChecked in", start: "2025-10-21T10:30:00", end: "2025-10-21T11:30:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "abril" },
  { id: "6", title: "Arlene McCoy\nMedical staff", start: "2025-10-21T11:00:00", end: "2025-10-21T12:00:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "abril" },
  { id: "7", title: "Seminar", start: "2025-10-21T12:00:00", end: "2025-10-21T13:00:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "abril" },
  { id: "8", title: "Cameron Williamson\nConfirmed", start: "2025-10-21T14:00:00", end: "2025-10-21T15:00:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "abril" },
  { id: "9", title: "Jacob Jones\nMedical sta...", start: "2025-10-21T09:00:00", end: "2025-10-21T10:00:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "allan" },
  { id: "10", title: "Esther Howard\nConfirmed", start: "2025-10-21T10:00:00", end: "2025-10-21T11:30:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "allan" },
  { id: "11", title: "Chloe McKinney\nConfirmed", start: "2025-10-21T12:00:00", end: "2025-10-21T13:00:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "allan" },
  { id: "12", title: "Ronald Richards\nConfirmed", start: "2025-10-21T12:00:00", end: "2025-10-21T13:00:00", backgroundColor: "#22d3ee", borderColor: "#22d3ee", resourceId: "bianca" },
  { id: "13", title: "Darrell Steward\nChecked in", start: "2025-10-21T12:30:00", end: "2025-10-21T14:00:00", backgroundColor: "#fbbf24", borderColor: "#fbbf24", resourceId: "bianca" },
];

export default function MyCalendar() {
  const calendarRef = useRef<FullCalendar>(null);

  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const lines = eventInfo.event.title.split('\n');
    return (
      <div className="p-2 overflow-hidden">
        <div className="font-semibold text-xs truncate">{lines[0]}</div>
        {lines[1] && <div className="text-[10px] opacity-80 truncate">{lines[1]}</div>}
      </div>
    );
  };

  return (
    <div className="bg-violet-100 rounded-lg shadow-lg overflow-hidden p-4 h-[90vh]">
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        initialView="resourceTimeGridDay"
        initialDate="2025-10-21"
        resources={[
          { id: "abril", title: "Abril Lewis" },
          { id: "allan", title: "Allan Hicks" },
          { id: "bianca", title: "Bianca West" },
        ]}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today",
        }}
        slotMinTime="08:00:00"
        slotMaxTime="15:00:00"
        slotDuration="00:30:00"
        allDaySlot={false}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        height="100%"
        expandRows={true}
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
      />
    </div>
  );
}
