"use client";

import React, { useState, useRef } from "react";
import {
  X,
  User,
  Plus,
  Search,
  Mail,
  Phone,
  Briefcase,
  Pencil,
  Trash2,
  Camera,
  Link as LinkIcon,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { useQuickSidebarStore } from "@/stores/quickSidebarStore";

export interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  avatar?: string;
  badge?: string;
  badgeType?: "bit-tool" | "bnx-mail";
}

export const ContactsPanel: React.FC = () => {
  const { activePanel, closePanel } = useQuickSidebarStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactItem | null>(null);

  // File input refs for local file upload
  const addFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Image source modes: "url" or "local"
  const [addImageMode, setAddImageMode] = useState<"url" | "local">("local");
  const [editImageMode, setEditImageMode] = useState<"url" | "local">("local");

  // Initial contacts matching user screenshot exactly
  const [contacts, setContacts] = useState<ContactItem[]>([
    {
      id: "1",
      name: "john",
      email: "john@rvjr.com",
      phone: "9876543210",
      role: "partner",
      badge: "BIT TOOL",
      badgeType: "bit-tool",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "2",
      name: "hi",
      email: "rgg@bnxmail.com",
      phone: "822038999",
      badge: "BNX MAIL",
      badgeType: "bnx-mail",
    },
  ]);

  // Form states for adding contact
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  // Form states for editing contact
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  if (activePanel !== "users") return null;

  const handleOpenAddModal = () => {
    setFullName("");
    setEmailAddress("");
    setPhone("");
    setRole("");
    setAvatar("");
    setAddImageMode("local");
    setEditingContact(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (contact: ContactItem) => {
    setEditingContact(contact);
    setEditName(contact.name);
    setEditEmail(contact.email);
    setEditPhone(contact.phone || "");
    setEditRole(contact.role || "");
    setEditAvatar(contact.avatar || "");
    setEditImageMode(contact.avatar?.startsWith("data:") ? "local" : "url");
    setIsAddModalOpen(false);
  };

  const handleDeleteContact = (contactId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
    if (editingContact?.id === contactId) {
      setEditingContact(null);
    }
  };

  // Local file upload handler for Add Modal
  const handleLocalImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setter(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailAddress.trim()) return;

    const newContact: ContactItem = {
      id: Date.now().toString(),
      name: fullName.trim(),
      email: emailAddress.trim(),
      phone: phone.trim() || undefined,
      role: role.trim() || undefined,
      avatar: avatar.trim() || undefined,
      badge: emailAddress.includes("bnxmail") ? "BNX MAIL" : "BIT TOOL",
      badgeType: emailAddress.includes("bnxmail") ? "bnx-mail" : "bit-tool",
    };

    setContacts((prev) => [newContact, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleSaveEditedContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContact || !editName.trim() || !editEmail.trim()) return;

    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === editingContact.id) {
          return {
            ...c,
            name: editName.trim(),
            email: editEmail.trim(),
            phone: editPhone.trim() || undefined,
            role: editRole.trim() || undefined,
            avatar: editAvatar.trim() || undefined,
            badge: editEmail.includes("bnxmail") ? "BNX MAIL" : "BIT TOOL",
            badgeType: editEmail.includes("bnxmail") ? "bnx-mail" : "bit-tool",
          };
        }
        return c;
      })
    );
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.includes(q)) ||
      (c.role && c.role.toLowerCase().includes(q))
    );
  });

  return (
    <aside
      aria-label="Connections & Contacts Panel"
      className="fixed right-[60px] sm:right-[62px] top-[60px] bottom-0 w-[350px] sm:w-[360px] bg-white border-l border-[#d0e5fb] shadow-[-6px_0_20px_rgba(0,0,0,0.06)] z-[60] flex flex-col select-none overflow-y-auto no-scrollbar animate-in slide-in-from-right duration-200"
    >
      {/* Top Header Row: Contact Icon + Contacts Title + Add Contact Button + Close Button */}
      <div className="h-[44px] px-4 flex items-center justify-between border-b border-[#e6edf6] bg-white shrink-0">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#2563eb] stroke-[2.2]" />
          <h2 className="text-[16px] font-black text-[#0f172a] tracking-tight">
            Contacts
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Add Contact Button */}
          <button
            type="button"
            onClick={handleOpenAddModal}
            title="Add Contact"
            className="w-8 h-8 rounded-full bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe] flex items-center justify-center transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Close Panel Button */}
          <button
            type="button"
            onClick={closePanel}
            title="Close Panel"
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-4 flex-1">

        {/* Search Input Bar - Fixed overlapping placeholder with flex container */}
        <div className="w-full flex items-center gap-2.5 bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 focus-within:border-[#2563eb] focus-within:ring-1 focus-within:ring-[#2563eb] transition shadow-2xs">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search global contacts..."
            className="flex-1 bg-transparent text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none p-0 m-0"
          />
        </div>

        {/* Contacts List Cards with Avatar / Image Support */}
        <div className="flex flex-col gap-3 pt-1">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white border border-[#e2e8f0] rounded-2xl p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition flex flex-col gap-2 relative group"
            >
              {/* Card Header: Avatar + Name + Badge + Edit Pencil + Delete Trash Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Contact Avatar (if uploaded/provided, otherwise styled letter avatar) */}
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                    {contact.avatar ? (
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-black uppercase text-[#2563eb]">
                        {contact.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-[15px] font-bold truncate ${
                      contact.id === "2" ? "text-[#2563eb]" : "text-[#0f172a]"
                    }`}
                  >
                    {contact.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Badge */}
                  {contact.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        contact.badgeType === "bit-tool"
                          ? "bg-[#fef3c7] text-[#b45309]"
                          : "bg-[#dbeafe] text-[#1d4ed8]"
                      }`}
                    >
                      {contact.badge}
                    </span>
                  )}

                  {/* Edit Pencil Icon (Opens Second Image Edit Modal) */}
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(contact)}
                    title="Edit contact"
                    className="p-1 text-gray-400 hover:text-[#2563eb] transition cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Trash Icon */}
                  <button
                    type="button"
                    onClick={(e) => handleDeleteContact(contact.id, e)}
                    title="Delete contact"
                    className="p-1 text-gray-400 hover:text-red-500 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Email Row */}
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium pl-1">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="truncate">{contact.email}</span>
              </div>

              {/* Phone Row */}
              {contact.phone && (
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium pl-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{contact.phone}</span>
                </div>
              )}

              {/* Role Row */}
              {contact.role && (
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium pl-1">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{contact.role}</span>
                </div>
              )}
            </div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-400">
              No contacts found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: ADD CONTACT (Bottom Sheet with URL / Local File Image) */}
      {/* ============================================================== */}
      {isAddModalOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity"
          />

          <div className="relative bg-white rounded-t-3xl p-5 shadow-2xl border-t border-gray-100 flex flex-col gap-3.5 animate-in slide-in-from-bottom duration-200 z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#2563eb] stroke-[2.5]" />
                <h4 className="text-[16px] font-bold text-[#0f172a]">
                  Add Contact
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            <form onSubmit={handleSaveNewContact} className="flex flex-col gap-3">
              {/* IMAGE UPLOAD SECTION (Local File & URL Tabs) */}
              <div className="bg-[#f8fbff] border border-[#dce7f5] rounded-2xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>Contact Photo (Optional)</span>
                  </label>

                  {/* Mode switcher: Local File | Image URL */}
                  <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-gray-200 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setAddImageMode("local")}
                      className={`px-2 py-0.5 rounded-md transition ${
                        addImageMode === "local"
                          ? "bg-[#2563eb] text-white"
                          : "text-gray-600 hover:text-[#0f172a]"
                      }`}
                    >
                      File
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddImageMode("url")}
                      className={`px-2 py-0.5 rounded-md transition ${
                        addImageMode === "url"
                          ? "bg-[#2563eb] text-white"
                          : "text-gray-600 hover:text-[#0f172a]"
                      }`}
                    >
                      URL
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-0.5">
                  {/* Photo Preview Thumbnail */}
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-dashed border-[#2563eb]/40 overflow-hidden shrink-0 flex items-center justify-center relative group">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {addImageMode === "local" ? (
                      <div>
                        {/* Hidden input for file selection */}
                        <input
                          ref={addFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLocalImageUpload(e, setAvatar)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => addFileInputRef.current?.click()}
                          className="w-full px-3 py-1.5 rounded-xl border border-[#cde2f8] bg-white hover:bg-blue-50/50 text-[#2563eb] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose Local Photo</span>
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          value={avatar}
                          onChange={(e) => setAvatar(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="w-full bg-white border border-[#e2e8f0] rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb]"
                        />
                      </div>
                    )}
                  </div>

                  {avatar && (
                    <button
                      type="button"
                      onClick={() => setAvatar("")}
                      title="Clear image"
                      className="text-gray-400 hover:text-red-500 transition text-xs p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Full Name * */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#0f172a]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition"
                />
              </div>

              {/* Email Address * */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#0f172a]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition"
                />
              </div>

              {/* Phone + Role Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#0f172a]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 890"
                    className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#0f172a]">
                    Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Supplier"
                    className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow transition cursor-pointer"
              >
                Save Contact
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: EDIT CONTACT (With Local File & URL Photo Options)     */}
      {/* ============================================================== */}
      {editingContact && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div
            onClick={() => setEditingContact(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity"
          />

          <div className="relative bg-white rounded-t-3xl p-5 shadow-2xl border-t border-gray-100 flex flex-col gap-3.5 animate-in slide-in-from-bottom duration-200 z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-[#2563eb] stroke-[2.2]" />
                <h4 className="text-[16px] font-bold text-[#0f172a]">
                  Edit Contact
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setEditingContact(null)}
                className="text-gray-400 hover:text-gray-700 transition cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedContact} className="flex flex-col gap-3">
              {/* EDIT PHOTO SECTION (Local File & URL Tabs) */}
              <div className="bg-[#f8fbff] border border-[#dce7f5] rounded-2xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>Change Photo</span>
                  </label>

                  <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-gray-200 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setEditImageMode("local")}
                      className={`px-2 py-0.5 rounded-md transition ${
                        editImageMode === "local"
                          ? "bg-[#2563eb] text-white"
                          : "text-gray-600 hover:text-[#0f172a]"
                      }`}
                    >
                      File
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditImageMode("url")}
                      className={`px-2 py-0.5 rounded-md transition ${
                        editImageMode === "url"
                          ? "bg-[#2563eb] text-white"
                          : "text-gray-600 hover:text-[#0f172a]"
                      }`}
                    >
                      URL
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-0.5">
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-dashed border-[#2563eb]/40 overflow-hidden shrink-0 flex items-center justify-center relative">
                    {editAvatar ? (
                      <img
                        src={editAvatar}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-black uppercase text-[#2563eb]">
                        {editName ? editName.charAt(0) : "U"}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {editImageMode === "local" ? (
                      <div>
                        <input
                          ref={editFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLocalImageUpload(e, setEditAvatar)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => editFileInputRef.current?.click()}
                          className="w-full px-3 py-1.5 rounded-xl border border-[#cde2f8] bg-white hover:bg-blue-50/50 text-[#2563eb] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose Local Photo</span>
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          value={editAvatar}
                          onChange={(e) => setEditAvatar(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="w-full bg-white border border-[#e2e8f0] rounded-xl pl-8 pr-2.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb]"
                        />
                      </div>
                    )}
                  </div>

                  {editAvatar && (
                    <button
                      type="button"
                      onClick={() => setEditAvatar("")}
                      title="Remove image"
                      className="text-gray-400 hover:text-red-500 transition text-xs p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Full Name * */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#0f172a]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="john"
                  className="w-full bg-[#f8fbff] border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition"
                />
              </div>

              {/* Email Address * */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#0f172a]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="john@rvjr.com"
                  className="w-full bg-[#f8fbff] border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition"
                />
              </div>

              {/* Phone + Role Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#0f172a]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-[#f8fbff] border border-[#e2e8f0] rounded-xl px-3 py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#0f172a]">
                    Role
                  </label>
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    placeholder="partner"
                    className="w-full bg-[#f8fbff] border border-[#e2e8f0] rounded-xl px-3 py-2 text-xs sm:text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow transition cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
