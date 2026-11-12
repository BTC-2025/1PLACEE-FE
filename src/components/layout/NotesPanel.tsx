"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  Pin,
  Trash2,
  FileText,
  Edit2,
  Check,
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  color?: string; // background color hex / class
  badge?: string; // e.g., "BNX MAIL" | "BIT TOOL" | "CLIKS"
  badgeType?: "bnx-mail" | "bit-tool" | "cliks" | "default";
  updatedAt?: string;
}

const INITIAL_NOTES: NoteItem[] = [
  {
    id: "note-1",
    title: "welcome",
    content: "hi guest",
    pinned: true,
    color: "#ffffff",
    badge: "BNX MAIL",
    badgeType: "bnx-mail",
  },
  {
    id: "note-2",
    title: "welcome",
    content: "hi",
    pinned: false,
    color: "#fef08a", // soft sunny yellow as in screenshot
    badge: "BIT TOOL",
    badgeType: "bit-tool",
  },
  {
    id: "note-3",
    title: "click",
    content: "hi",
    pinned: false,
    color: "#ffffff",
    badge: "CLIKS",
    badgeType: "cliks",
  },
];

// Color palette options as shown in screenshot 2
const COLOR_OPTIONS = [
  { label: "White", value: "#ffffff", border: "border-gray-200" },
  { label: "Coral / Red", value: "#f87171", border: "border-red-400" },
  { label: "Orange / Amber", value: "#f59e0b", border: "border-amber-400" },
  { label: "Yellow", value: "#fef08a", border: "border-yellow-300" },
  { label: "Lime", value: "#bef264", border: "border-lime-400" },
  { label: "Teal / Mint", value: "#99f6e4", border: "border-teal-300" },
  { label: "Sky", value: "#bae6fd", border: "border-sky-300" },
  { label: "Periwinkle", value: "#bfdbfe", border: "border-blue-300" },
  { label: "Lavender", value: "#e9d5ff", border: "border-purple-300" },
  { label: "Pink", value: "#fbcfe8", border: "border-pink-300" },
  { label: "Sand", value: "#fed7aa", border: "border-orange-200" },
  { label: "Gray", value: "#e2e8f0", border: "border-slate-300" },
];

export const NotesPanel: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);

  // Add / Edit Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formPinned, setFormPinned] = useState(false);
  const [formColor, setFormColor] = useState("#ffffff");

  if (activePanel !== "notes") return null;

  const handleOpenAddModal = () => {
    setEditingNote(null);
    setFormTitle("");
    setFormContent("");
    setFormPinned(false);
    setFormColor("#ffffff");
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (note: NoteItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingNote(note);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormPinned(note.pinned);
    setFormColor(note.color || "#ffffff");
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingNote(null);
  };

  const handleTogglePin = (noteId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const handleDeleteNote = (noteId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    if (editingNote?.id === noteId) {
      handleCloseModal();
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() && !formContent.trim()) return;

    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id
            ? {
              ...n,
              title: formTitle.trim() || "Untitled",
              content: formContent.trim(),
              pinned: formPinned,
              color: formColor,
            }
            : n
        )
      );
    } else {
      const newNote: NoteItem = {
        id: "note-" + Date.now(),
        title: formTitle.trim() || "Untitled",
        content: formContent.trim(),
        pinned: formPinned,
        color: formColor,
        badge: "CLIKS",
        badgeType: "cliks",
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    handleCloseModal();
  };

  const pinnedNotes = notes.filter((n) => n.pinned);
  const otherNotes = notes.filter((n) => !n.pinned);

  const getBadgeStyle = (type?: string) => {
    switch (type) {
      case "bnx-mail":
        return "bg-[#dbeafe] text-[#2563eb] border border-[#bfdbfe]";
      case "bit-tool":
        return "bg-[#fed7aa]/60 text-[#c2410c] border border-[#fdba74]";
      case "cliks":
        return "bg-[#dcfce7] text-[#059669] border border-[#a7f3d0]";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <aside
      aria-label="Notes Panel"
      className="fixed right-[60px] sm:right-[62px] top-[60px] bottom-0 w-[350px] sm:w-[360px] bg-white border-l border-[#d0e5fb] shadow-[-6px_0_20px_rgba(0,0,0,0.06)] z-[60] flex flex-col select-none overflow-hidden animate-in slide-in-from-right duration-200"
    >
      {/* 1. Header Bar: Notes title with Close Button */}
      <div className="h-[44px] px-5 flex items-center justify-between border-b border-gray-100/90 shrink-0 bg-white">
        <h2 className="text-[17px] font-black text-[#111827] tracking-tight">
          Notes
        </h2>
        <button
          type="button"
          onClick={closePanel}
          title="Close Notes"
          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
        {/* Global Notes Header with Amber Document icon & rounded Plus Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 flex items-center justify-center text-[#d97706]">
              {/* Document/Note icon styled matching screenshot */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[#f59e0b]"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-[18px] font-extrabold text-[#111827] tracking-tight">
              Global Notes
            </h3>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            title="Add Note"
            className="w-8 h-8 rounded-full bg-[#fef9c3] hover:bg-[#fef08a] border border-[#fef08a] flex items-center justify-center text-[#b45309] shadow-xs hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.8]" />
          </button>
        </div>

        {/* PINNED SECTION */}
        {pinnedNotes.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
              PINNED
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {pinnedNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleOpenEditModal(note)}
                  style={{ backgroundColor: note.color || "#ffffff" }}
                  className="rounded-2xl p-3 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md transition cursor-pointer relative group flex flex-col justify-between min-h-[96px]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h4 className="text-[13.5px] font-bold text-gray-900 leading-snug truncate">
                        {note.title}
                      </h4>
                      {note.badge && (
                        <span
                          className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ${getBadgeStyle(
                            note.badgeType
                          )}`}
                        >
                          {note.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-600 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>

                  {/* Actions overlay / bottom icons */}
                  <div className="flex items-center justify-end gap-1.5 pt-2 mt-auto">
                    <button
                      type="button"
                      onClick={(e) => handleTogglePin(note.id, e)}
                      title="Unpin Note"
                      className="p-1 rounded-full text-[#2563eb] hover:bg-black/5 transition"
                    >
                      <Pin className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleOpenEditModal(note, e)}
                      title="Edit Note"
                      className="p-1 rounded-full text-gray-500 hover:text-gray-800 hover:bg-black/5 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      title="Delete Note"
                      className="p-1 rounded-full text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHERS SECTION */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            OTHERS
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {otherNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleOpenEditModal(note)}
                style={{ backgroundColor: note.color || "#ffffff" }}
                className="rounded-2xl p-3 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md transition cursor-pointer relative group flex flex-col justify-between min-h-[96px]"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h4 className="text-[13.5px] font-bold text-gray-900 leading-snug truncate">
                      {note.title}
                    </h4>
                    {note.badge && (
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ${getBadgeStyle(
                          note.badgeType
                        )}`}
                      >
                        {note.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-gray-600 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>

                {/* Bottom Actions Row: Pin, Edit pencil, and Red Trash */}
                <div className="flex items-center justify-end gap-1.5 pt-2 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => handleTogglePin(note.id, e)}
                    title="Pin Note"
                    className="p-1 rounded-full text-gray-500 hover:text-[#2563eb] hover:bg-black/5 transition"
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleOpenEditModal(note, e)}
                    title="Edit Note"
                    className="p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-black/5 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteNote(note.id, e)}
                    title="Delete Note"
                    className="p-1 rounded-full text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {notes.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-xs">
              No notes yet. Click the + button above to create one.
            </div>
          )}
        </div>
      </div>

      {/* 2. Add / Edit Note Bottom Sheet Modal (Image 2 style) */}
      {isAddModalOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-center">
          {/* Subtle backdrop */}
          <div
            onClick={handleCloseModal}
            className="absolute inset-0 bg-black/30 backdrop-blur-[1px] animate-in fade-in duration-150"
          />

          <form
            onSubmit={handleSaveNote}
            className="relative bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-5 z-10 flex flex-col gap-4 animate-in slide-in-from-bottom duration-200 border-t border-gray-100"
          >
            {/* Header: + Add Note with Pin & Close Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600 stroke-[3]" />
                <h3 className="text-[16px] font-black text-[#111827]">
                  {editingNote ? "Edit Note" : "Add Note"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormPinned(!formPinned)}
                  title={formPinned ? "Pinned" : "Pin Note"}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition ${formPinned
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <Pin
                    className={`w-4 h-4 ${formPinned ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  title="Close"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                >
                  <X className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* Inputs: Title and Content */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full text-[15px] font-bold text-gray-800 placeholder-gray-400 focus:outline-none border-b border-transparent focus:border-gray-200 pb-1"
                autoFocus
              />
              <textarea
                placeholder="Take a note..."
                rows={3}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                className="w-full text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
              />
            </div>

            {/* Color circles row (from Screenshot 2) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {COLOR_OPTIONS.map((c) => {
                const isSelected = formColor === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setFormColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    className={`w-6 h-6 rounded-full border transition-all cursor-pointer flex items-center justify-center ${c.border
                      } ${isSelected
                        ? "ring-2 ring-blue-600 scale-110 shadow-xs"
                        : "hover:scale-105"
                      }`}
                  >
                    {isSelected && (
                      <Check className="w-3 h-3 text-gray-700 stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Save Note Button: Dark Pill button matching Screenshot 2 */}
            <button
              type="submit"
              className="w-full h-11 bg-[#262626] hover:bg-[#171717] text-white font-bold text-[14px] rounded-xl shadow-sm transition active:scale-[0.99] cursor-pointer mt-1"
            >
              {editingNote ? "Save Changes" : "Save Note"}
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};

