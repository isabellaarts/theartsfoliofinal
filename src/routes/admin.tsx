import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSiteData } from "@/hooks/use-site-data";
import { GlassCard } from "@/components/site/ui-bits";
import { toast } from "sonner";
import {
  Lock,
  User,
  LogOut,
  Folder,
  Star,
  Users,
  Inbox,
  Trash2,
  Edit2,
  Plus,
  Eye,
  Check,
  AlertTriangle,
  Upload,
  Globe,
  Settings,
  ChevronDown,
  Clock,
  Image,
  Home,
  Key,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Artist, PortfolioItem, PortfolioCategory, UserAccount, InteractiveGalleryItem, SiteConfig } from "@/lib/site-data";
import { SERVICES, DEFAULT_SITE_CONFIG, DEFAULT_INTERACTIVE_GALLERY } from "@/lib/site-data";
import { Dialog, DialogContent } from "@/components/ui/dialog";


export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — The Arts Folio" },
      { name: "description", content: "Management portal for artists and administrators." }
    ]
  }),
  component: AdminRouteComponent,
});

function AdminRouteComponent() {
  const { user, login, logout } = useSiteData();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(usernameInput, passwordInput);
    if (success) {
      setUsernameInput("");
      setPasswordInput("");
    }
  };

  if (!user) {
    return (
      <div className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <GlassCard className="w-full max-w-md p-8 md:p-10 border-white/10 shadow-glow relative">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-brand shadow-glow flex items-center justify-center mb-6">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-center font-display text-3xl font-bold tracking-tight">CMS Portal</h2>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Log in to manage site content, reviews, and briefs.
          </p>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Username or Artist Slug
              </label>
              <input
                required
                type="text"
                placeholder="e.g. admin or emily"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
              />
            </div>

            <button className="w-full rounded-full bg-gradient-brand px-6 py-4 text-sm font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer mt-6">
              Sign In
            </button>
          </form>
        </GlassCard>
      </div>
    );
  }

  return <DashboardWorkspace />;
}

type TabType = "submissions" | "artists" | "portfolio" | "reviews" | "gallery" | "homepage" | "users" | "my-account";

function DashboardWorkspace() {
  const { user, logout } = useSiteData();
  const [activeTab, setActiveTab] = useState<TabType>(
    user?.role === "admin" ? "submissions" : "artists"
  );

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white">
              Studio Workspace
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Logged in as <span className="text-brand-pink font-semibold">{user?.username}</span> ({user?.role})
            </p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full glass hover:bg-white/10 border border-white/10 px-5 py-2.5 text-xs font-semibold text-white cursor-pointer w-fit"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
          {user?.role === "admin" && (
            <TabButton
              active={activeTab === "submissions"}
              onClick={() => setActiveTab("submissions")}
              icon={Inbox}
              label="Inquiry Briefs"
            />
          )}
          <TabButton
            active={activeTab === "artists"}
            onClick={() => setActiveTab("artists")}
            icon={Users}
            label={user?.role === "admin" ? "Artist Profiles" : "My Profile"}
          />
          <TabButton
            active={activeTab === "portfolio"}
            onClick={() => setActiveTab("portfolio")}
            icon={Folder}
            label={user?.role === "admin" ? "Portfolio Database" : "My Portfolio"}
          />
          <TabButton
            active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
            icon={Star}
            label={user?.role === "admin" ? "Global Reviews" : "Client Reviews"}
          />
          
          {user?.role === "admin" && (
            <>
              <TabButton
                active={activeTab === "gallery"}
                onClick={() => setActiveTab("gallery")}
                icon={Image}
                label="Interactive Gallery"
              />
              <TabButton
                active={activeTab === "homepage"}
                onClick={() => setActiveTab("homepage")}
                icon={Home}
                label="Home Sections"
              />
              <TabButton
                active={activeTab === "users"}
                onClick={() => setActiveTab("users")}
                icon={Settings}
                label="User Accounts"
              />
            </>
          )}
          
          <TabButton
            active={activeTab === "my-account"}
            onClick={() => setActiveTab("my-account")}
            icon={User}
            label="My Account"
          />
        </div>

        {/* Workspace Panels */}
        <div className="space-y-6">
          {activeTab === "submissions" && user?.role === "admin" && <SubmissionsPanel />}
          {activeTab === "artists" && <ArtistsPanel />}
          {activeTab === "portfolio" && <PortfolioPanel />}
          {activeTab === "reviews" && <ReviewsPanel />}
          {activeTab === "gallery" && user?.role === "admin" && <GalleryPanel />}
          {activeTab === "homepage" && user?.role === "admin" && <HomepagePanel />}
          {activeTab === "users" && user?.role === "admin" && <UsersPanel />}
          {activeTab === "my-account" && <MyAccountPanel />}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold transition-all cursor-pointer",
        active
          ? "bg-gradient-brand text-white shadow-glow"
          : "glass border border-white/5 hover:bg-white/10 text-muted-foreground hover:text-white"
      )}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

// ----------------------------------------------------
// PANELS IMPLEMENTATION
// ----------------------------------------------------

// 1. SUBMISSIONS PANEL
function SubmissionsPanel() {
  const { submissions, deleteSubmission } = useSiteData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filtered = submissions.filter((s) => {
    const dataStr = JSON.stringify(s.data).toLowerCase();
    const matchesSearch =
      s.formType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataStr.includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || s.formType === filterType;
    return matchesSearch && matchesFilter;
  });

  const categories = ["All", ...Array.from(new Set(submissions.map((s) => s.formType)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Inbound Submission Logs</h2>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search briefs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground w-full md:w-64"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-full bg-surface-2 border border-white/10 px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-violet/50 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="text-center py-16">
          <Inbox className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold">No submissions found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Logs are empty or filter parameters are too restrictive.
          </p>
        </GlassCard>
      ) : (
        <div className="grid gap-4">
          {filtered.map((s) => (
            <GlassCard key={s.id} className="p-6 border-white/10 hover:border-white/20 transition-all">
              <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-white/5">
                <div>
                  <span className="inline-block rounded-full bg-brand-violet/20 border border-brand-violet/40 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-brand-pink">
                    {s.formType}
                  </span>
                  <h3 className="font-display text-base font-bold mt-2">
                    {s.data.name || "Anonymous User"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(s.timestamp).toLocaleString()} · IP: {s.ip || "Unknown"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Delete this submission record permanently?")) {
                      deleteSubmission(s.id);
                    }
                  }}
                  className="grid h-8 w-8 place-items-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  {Object.entries(s.data).map(([key, value]) => {
                    if (key === "name" || key === "subject" || key === "form_type") return null;
                    return (
                      <p key={key}>
                        <span className="text-muted-foreground uppercase text-[10px] font-semibold tracking-wider block">
                          {key}
                        </span>
                        <span className="text-white font-medium">{String(value)}</span>
                      </p>
                    );
                  })}
                </div>
                {((s.fileUrls && s.fileUrls.length > 0) || s.fileUrl) && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/15 h-fit space-y-3">
                    <div>
                      <h4 className="text-xs uppercase font-semibold text-brand-pink tracking-wider">
                        Uploaded Attachment(s)
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        File validation check passed. Safe for download.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {s.fileUrls && s.fileUrls.length > 0 ? (
                        s.fileUrls.map((url, index) => {
                          const filename = url.split("/").pop() || `Attachment ${index + 1}`;
                          const cleanName = filename.includes("-") ? filename.substring(filename.indexOf("-") + 1) : filename;
                          return (
                            <a
                              key={url}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              title={cleanName}
                              className="inline-flex items-center gap-1.5 text-xs text-white font-semibold rounded-full bg-gradient-brand px-4 py-2 hover:scale-[1.02] transition-transform max-w-[240px] truncate"
                            >
                              <Upload className="h-3 w-3 shrink-0" /> <span className="truncate">{cleanName}</span>
                            </a>
                          );
                        })
                      ) : (
                        s.fileUrl && (
                          <a
                            href={s.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-white font-semibold rounded-full bg-gradient-brand px-4 py-2 hover:scale-[1.02] transition-transform"
                          >
                            <Upload className="h-3 w-3" /> Download Reference Brief
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

// 2. ARTISTS PANEL
function ArtistsPanel() {
  const { user, artists, addArtist, updateArtist, deleteArtist } = useSiteData();
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // If role is artist, they can only edit their own profile
  const managedArtists =
    user?.role === "admin" ? artists : artists.filter((a) => a.slug === user?.artistSlug);

  const [formData, setFormData] = useState<Partial<Artist>>({});
  const [skillsStr, setSkillsStr] = useState("");
  
  // FAQs list state
  const [faqsList, setFaqsList] = useState<{ q: string; a: string }[]>([]);

  // Pricing list state
  const [pricingList, setPricingList] = useState<{ title: string; description: string; price: string }[]>([]);

  const startEdit = (artist: Artist) => {
    setEditingArtist(artist);
    setFormData(artist);
    setSkillsStr(artist.skills ? artist.skills.join(", ") : "");
    setFaqsList(artist.faqs || []);
    setPricingList(artist.pricing || []);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingArtist(null);
    setFormData({
      slug: "",
      name: "",
      role: "",
      specialization: "",
      experience: "",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
      bio: "",
      process: "",
      socials: { instagram: "" },
      skills: [],
      portfolio: [],
      reviews: [],
      faqs: [],
      services: ["book-covers"],
      passcode: "1234"
    });
    setSkillsStr("");
    setFaqsList([]);
    setPricingList([]);
  };

  const [uploading, setUploading] = useState(false);

  const uploadMediaFile = async (file: File): Promise<string> => {
    setUploading(true);
    const toastId = toast.loading("Uploading file to server...");
    try {
      const uFormData = new FormData();
      uFormData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uFormData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to upload file");
      }

      const data = await res.json();
      toast.success("File uploaded successfully!", { id: toastId });
      return data.url;
    } catch (err: any) {
      toast.error(err.message || "Failed to upload file", { id: toastId });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {}
  };

  const addFaqRow = () => {
    setFaqsList((prev) => [...prev, { q: "", a: "" }]);
  };

  const updateFaqRow = (index: number, field: "q" | "a", val: string) => {
    setFaqsList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const removeFaqRow = (index: number) => {
    setFaqsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
      
    const finalArtistData: Artist = {
      slug: formData.slug || "",
      name: formData.name || "",
      role: formData.role || "",
      specialization: formData.specialization || "",
      experience: formData.experience || "",
      image: formData.image || "",
      bio: formData.bio || "",
      process: formData.process || "",
      socials: formData.socials || { instagram: "" },
      skills: skillsArray,
      portfolio: formData.portfolio || [],
      reviews: formData.reviews || [],
      faqs: faqsList.filter((f) => f.q && f.a),
      pricing: pricingList.filter((p) => p.title && p.price),
      services: formData.services || ["book-covers"],
      
      // New CMS-driven fields
      showcaseTitle: formData.showcaseTitle || "See the craftsmanship",
      showcaseDescription: formData.showcaseDescription || "",
      showcaseBeforeImg: formData.showcaseBeforeImg || "",
      showcaseAfterImg: formData.showcaseAfterImg || "",
      showcaseBeforeLabel: formData.showcaseBeforeLabel || "Rough Sketch",
      showcaseAfterLabel: formData.showcaseAfterLabel || "Finished Work",
      
      processVideoTitle: formData.processVideoTitle || "Process video",
      processVideoDescription: formData.processVideoDescription || "",
      processVideoUrl: formData.processVideoUrl || "",
      
      contactFormEyebrow: formData.contactFormEyebrow || "",
      contactFormTitle: formData.contactFormTitle || "",
      
      ctaTitle: formData.ctaTitle || "",
      ctaDescription: formData.ctaDescription || "",
      ctaButton1Label: formData.ctaButton1Label || "Hire This Artist",
      ctaButton2Label: formData.ctaButton2Label || "Book a Free Consultation",
      passcode: formData.passcode || "1234"
    };

    if (!finalArtistData.slug || !finalArtistData.name) {
      toast.error("Name and unique slug are required");
      return;
    }

    if (finalArtistData.passcode && !/^\d{4}$/.test(finalArtistData.passcode)) {
      toast.error("Profile passcode must be exactly a 4-digit number (e.g. 1234)");
      return;
    }

    if (isCreating) {
      const ok = await addArtist(finalArtistData);
      if (ok) setIsCreating(false);
    } else if (editingArtist) {
      const ok = await updateArtist(editingArtist.slug, finalArtistData);
      if (ok) setEditingArtist(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">
          {user?.role === "admin" ? "Artist Profiles CMS" : "Manage My Public Profile"}
        </h2>
        {user?.role === "admin" && !isCreating && !editingArtist && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2.5 text-xs font-semibold text-white cursor-pointer shadow-glow"
          >
            <Plus className="h-4 w-4" /> Add New Artist
          </button>
        )}
      </div>

      {/* Editor Frame */}
      {(isCreating || editingArtist) && (
        <GlassCard className="p-6 md:p-8 border-white/10 relative">
          <h3 className="font-display text-xl font-bold mb-6">
            {isCreating ? "Create Artist Profile" : `Edit Profile: ${formData.name}`}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Artist Name</label>
                <input
                  required
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Unique Slug (URL path)</label>
                <input
                  required
                  type="text"
                  disabled={!!editingArtist && user?.role !== "admin"} // Artists can't change their own URL slug
                  value={formData.slug || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Creative Role</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Lead Illustrator"
                  value={formData.role || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Specialization Tag</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Book Covers & Character Art"
                  value={formData.specialization || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, specialization: e.target.value }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Experience Level</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 7+ Years"
                  value={formData.experience || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <img src={formData.image} alt="Avatar Preview" className="h-full w-full object-cover" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-xs text-white font-semibold">
                  <Upload className="h-3.5 w-3.5" /> Upload Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <span className="text-[11px] text-muted-foreground">Select local file. Stored dynamically.</span>
              </div>
            </div>

            {/* Profile Passcode Field */}
            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Profile Lock Passcode (4-digit code)
              </label>
              <input
                required
                type="text"
                maxLength={4}
                placeholder="e.g. 1234"
                value={formData.passcode || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, passcode: e.target.value.replace(/\D/g, "") }))}
                className="w-full max-w-[200px] rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white font-mono tracking-[0.2em]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Clients must enter this 4-digit code to view your public profile. Default passcode is <code className="text-brand-pink font-semibold">1234</code>.
              </p>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Biography description</label>
              <textarea
                required
                rows={4}
                value={formData.bio || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Creative Process overview</label>
              <textarea
                required
                rows={3}
                value={formData.process || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, process: e.target.value }))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Skills (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Concept Art, Digital Painting, Adobe Photoshop"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Instagram Profile URL</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  value={formData.socials?.instagram || ""}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    socials: { ...prev.socials, instagram: e.target.value } as any
                  }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
            </div>

            {/* Dynamic FAQs Editor */}
            <div>
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/5">
                <label className="block text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Profile FAQs
                </label>
                <button
                  type="button"
                  onClick={addFaqRow}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-pink hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" /> Add FAQ Row
                </button>
              </div>

              {faqsList.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No FAQs configured for this artist.</p>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {faqsList.map((faq, i) => (
                    <div key={i} className="flex gap-2 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Question string"
                          value={faq.q}
                          onChange={(e) => updateFaqRow(i, "q", e.target.value)}
                          className="w-full rounded-lg bg-surface-2 border border-white/10 px-3 py-1.5 text-xs text-white"
                        />
                        <textarea
                          rows={2}
                          placeholder="Answer string"
                          value={faq.a}
                          onChange={(e) => updateFaqRow(i, "a", e.target.value)}
                          className="w-full rounded-lg bg-surface-2 border border-white/10 px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFaqRow(i)}
                        className="p-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Pricing Editor */}
            <div className="border-t border-white/5 pt-5">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/5">
                <label className="block text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Pricing & Services (Bust Up, Half Body, etc.)
                </label>
                <button
                  type="button"
                  onClick={() => setPricingList((prev) => [...prev, { title: "", description: "", price: "" }])}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-pink hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Service Row
                </button>
              </div>

              {pricingList.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No pricing services configured. Add some to display on the profile page.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {pricingList.map((service, i) => (
                    <div key={i} className="flex gap-2 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="flex-1 grid md:grid-cols-[1.5fr_2fr_1fr] gap-2">
                        <div>
                          <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-0.5">Service Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Full Body"
                            value={service.title}
                            onChange={(e) => {
                              setPricingList((prev) => {
                                const copy = [...prev];
                                copy[i] = { ...copy[i], title: e.target.value };
                                return copy;
                              });
                            }}
                            className="w-full rounded-lg bg-surface-2 border border-white/10 px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-0.5">Description</label>
                          <input
                            type="text"
                            placeholder="e.g. Detailed shading & coloring"
                            value={service.description}
                            onChange={(e) => {
                              setPricingList((prev) => {
                                const copy = [...prev];
                                copy[i] = { ...copy[i], description: e.target.value };
                                return copy;
                              });
                            }}
                            className="w-full rounded-lg bg-surface-2 border border-white/10 px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-0.5">Price</label>
                          <input
                            type="text"
                            placeholder="e.g. $299"
                            value={service.price}
                            onChange={(e) => {
                              setPricingList((prev) => {
                                const copy = [...prev];
                                copy[i] = { ...copy[i], price: e.target.value };
                                return copy;
                              });
                            }}
                            className="w-full rounded-lg bg-surface-2 border border-white/10 px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPricingList((prev) => prev.filter((_, idx) => idx !== i))}
                        className="p-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 cursor-pointer mt-5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Services Checkbox List */}
            <div className="border-t border-white/5 pt-5">
              <label className="block text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">
                Services Offered
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SERVICES.map((s) => {
                  const isChecked = formData.services?.includes(s.slug) || false;
                  return (
                    <label
                      key={s.slug}
                      className={cn(
                        "flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer text-xs",
                        isChecked
                          ? "bg-brand-violet/10 border-brand-violet/40 text-white"
                          : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData((prev) => {
                            const current = prev.services || [];
                            const next = checked
                              ? [...current, s.slug]
                              : current.filter((x) => x !== s.slug);
                            return { ...prev, services: next };
                          });
                        }}
                        className="mt-0.5 rounded border-white/10 text-brand-violet focus:ring-brand-violet bg-white/5"
                      />
                      <span>{s.title}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Showcase Slider */}
            <div className="border-t border-white/5 pt-5 space-y-4">
              <h4 className="text-sm font-semibold text-brand-pink uppercase tracking-wider">Showcase Banner (Before/After Slider)</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Showcase Title</label>
                  <input
                    type="text"
                    placeholder="e.g. See the craftsmanship"
                    value={formData.showcaseTitle || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, showcaseTitle: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Showcase Description</label>
                  <input
                    type="text"
                    placeholder="Brief summary of the work shown in the slider"
                    value={formData.showcaseDescription || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, showcaseDescription: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Before Image Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Rough Sketch"
                    value={formData.showcaseBeforeLabel || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, showcaseBeforeLabel: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">After Image Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Finished Work"
                    value={formData.showcaseAfterLabel || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, showcaseAfterLabel: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Showcase Before Image</label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                      {formData.showcaseBeforeImg ? (
                        <img src={formData.showcaseBeforeImg} alt="Before Preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-white/5 flex items-center justify-center text-[10px] text-muted-foreground">None</div>
                      )}
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-xs text-white font-semibold">
                      <Upload className="h-3.5 w-3.5" /> Upload Before Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const url = await uploadMediaFile(file);
                            setFormData((prev) => ({ ...prev, showcaseBeforeImg: url }));
                          } catch (err) {}
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Showcase After Image</label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                      {formData.showcaseAfterImg ? (
                        <img src={formData.showcaseAfterImg} alt="After Preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-white/5 flex items-center justify-center text-[10px] text-muted-foreground">None</div>
                      )}
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-xs text-white font-semibold">
                      <Upload className="h-3.5 w-3.5" /> Upload After Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const url = await uploadMediaFile(file);
                            setFormData((prev) => ({ ...prev, showcaseAfterImg: url }));
                          } catch (err) {}
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Video Section */}
            <div className="border-t border-white/5 pt-5 space-y-4">
              <h4 className="text-sm font-semibold text-brand-pink uppercase tracking-wider">Creative Process Video</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Video Section Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Process Video"
                    value={formData.processVideoTitle || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, processVideoTitle: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Video Section Description</label>
                  <input
                    type="text"
                    placeholder="Describe what is shown in the process video"
                    value={formData.processVideoDescription || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, processVideoDescription: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Process Video File / URL</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <input
                    type="text"
                    placeholder="Enter video URL or upload below (e.g., https://... or /uploads/...)"
                    value={formData.processVideoUrl || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, processVideoUrl: e.target.value }))}
                    className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white w-full"
                  />
                  <label className="flex items-center gap-2 cursor-pointer rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-xs text-white font-semibold whitespace-nowrap">
                    <Upload className="h-3.5 w-3.5" /> Upload Video
                    <input
                      type="file"
                      accept="video/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const url = await uploadMediaFile(file);
                          setFormData((prev) => ({ ...prev, processVideoUrl: url }));
                        } catch (err) {}
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 block">Supports MP4, WebM formats up to 100MB.</span>
              </div>
            </div>

            {/* Contact Form Details */}
            <div className="border-t border-white/5 pt-5 space-y-4">
              <h4 className="text-sm font-semibold text-brand-pink uppercase tracking-wider">Contact Form Header</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Form Eyebrow Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Hire Emily"
                    value={formData.contactFormEyebrow || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactFormEyebrow: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Form Title Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Send Emily a project brief"
                    value={formData.contactFormTitle || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactFormTitle: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
              </div>
            </div>

            {/* CTA Banner Details */}
            <div className="border-t border-white/5 pt-5 space-y-4 mb-5">
              <h4 className="text-sm font-semibold text-brand-pink uppercase tracking-wider">Call-to-Action Banner</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">CTA Banner Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Work with Emily Carter today"
                    value={formData.ctaTitle || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ctaTitle: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">CTA Banner Description</label>
                  <input
                    type="text"
                    placeholder="Summary text below CTA title"
                    value={formData.ctaDescription || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ctaDescription: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">CTA Button 1 Label (Primary)</label>
                  <input
                    type="text"
                    placeholder="e.g. Hire This Artist"
                    value={formData.ctaButton1Label || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ctaButton1Label: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">CTA Button 2 Label (Secondary)</label>
                  <input
                    type="text"
                    placeholder="e.g. Book a Free Consultation"
                    value={formData.ctaButton2Label || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ctaButton2Label: e.target.value }))}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => {
                  setEditingArtist(null);
                  setIsCreating(false);
                }}
                className="rounded-full glass border border-white/10 px-5 py-2.5 text-xs font-semibold hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-gradient-brand px-6 py-2.5 text-xs font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Save Profile Content
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Directory Grid */}
      {!isCreating && !editingArtist && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {managedArtists.map((a) => (
            <GlassCard key={a.slug} className="overflow-hidden p-0 flex flex-col hover:border-white/20 transition-all">
              <div className="relative aspect-[4/3] bg-surface-2">
                <img src={a.image} alt={a.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{a.name}</h3>
                    <p className="text-xs text-muted-foreground">{a.role}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex gap-2 justify-end mt-auto">
                <button
                  onClick={() => startEdit(a)}
                  className="inline-flex items-center gap-1 rounded-full glass border border-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 cursor-pointer"
                >
                  <Edit2 className="h-3 w-3" /> Edit content
                </button>
                {user?.role === "admin" && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete the entire artist profile for ${a.name}?`)) {
                        deleteArtist(a.slug);
                      }
                    }}
                    className="grid h-8 w-8 place-items-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

// 3. PORTFOLIO PANEL
function PortfolioPanel() {
  const { user, portfolio, addPortfolioItem, updatePortfolioItem, deletePortfolioItem, reorderPortfolio, artists } = useSiteData();
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({});
  
  // Drag and drop for thumbnail / video uploader
  const [dragActive, setDragActive] = useState(false);

  // Sorting
  const managedItems =
    user?.role === "admin"
      ? portfolio
      : portfolio.filter((p) => p.artistSlug === user?.artistSlug);

  const sortedItems = [...managedItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Native HTML5 Drag and Drop for Sorting list
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<PortfolioItem | null>(null);

  const startEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormData({
      id: `port_${Date.now()}`,
      title: "",
      category: "Book Covers",
      image: "",
      videoUrl: "",
      mediaType: "image",
      description: "",
      aspect: "square",
      tags: [],
      artistSlug: user?.role === "admin" ? "emily" : (user?.artistSlug || ""),
      status: "published",
      order: portfolio.length,
    });
  };

  const [uploading, setUploading] = useState(false);

  const uploadMediaFile = async (file: File): Promise<string> => {
    setUploading(true);
    const toastId = toast.loading("Uploading file to server...");
    try {
      const uFormData = new FormData();
      uFormData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uFormData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to upload file");
      }

      const data = await res.json();
      toast.success("File uploaded successfully!", { id: toastId });
      return data.url;
    } catch (err: any) {
      toast.error(err.message || "Failed to upload file", { id: toastId });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {}
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadMediaFile(file);
      setFormData((prev) => ({ ...prev, videoUrl: url }));
    } catch (err) {}
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDropUpload = async (e: React.DragEvent, field: "image" | "videoUrl") => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      try {
        const url = await uploadMediaFile(file);
        setFormData((prev) => ({ ...prev, [field]: url }));
      } catch (err) {}
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Thumbnail artwork image is required.");
      return;
    }
    const finalItem: PortfolioItem = {
      id: formData.id || `port_${Date.now()}`,
      title: formData.title || "Untitled Masterpiece",
      category: formData.category || "Book Covers",
      image: formData.image || "",
      videoUrl: formData.mediaType === "video" ? formData.videoUrl : undefined,
      mediaType: formData.mediaType || "image",
      description: formData.description || "",
      aspect: formData.aspect || "square",
      tags: formData.tags || [],
      artistSlug: user?.role === "admin" ? (formData.artistSlug || "emily") : (user?.artistSlug || "emily"),
      status: formData.status || "published",
      order: formData.order !== undefined ? formData.order : portfolio.length,
    };

    if (isCreating) {
      const ok = await addPortfolioItem(finalItem);
      if (ok) setIsCreating(false);
    } else if (editingItem) {
      const ok = await updatePortfolioItem(editingItem.id, finalItem);
      if (ok) setEditingItem(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain") || draggedItemId;
    if (!sourceId || sourceId === targetId) return;

    const sourceIndex = sortedItems.findIndex((item) => item.id === sourceId);
    const targetIndex = sortedItems.findIndex((item) => item.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const updated = [...sortedItems];
    const [movedItem] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    const orders = updated.map((item, idx) => ({ id: item.id, order: idx }));
    const ok = await reorderPortfolio(orders);
    if (ok) {
      toast.success("Portfolio item order updated successfully.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">
          {user?.role === "admin" ? "Portfolio Database CMS" : "My Portfolio Items"}
        </h2>
        {!isCreating && !editingItem && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2.5 text-xs font-semibold text-white cursor-pointer shadow-glow"
          >
            <Plus className="h-4 w-4" /> Add Artwork
          </button>
        )}
      </div>

      {(isCreating || editingItem) && (
        <GlassCard className="p-6 md:p-8 border-white/10 relative">
          <h3 className="font-display text-xl font-bold mb-6">
            {isCreating ? "Add Portfolio Item" : `Edit Portfolio: ${formData.title}`}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Artwork Title</label>
                <input
                  required
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as any }))}
                  className="w-full rounded-xl bg-surface-2 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white cursor-pointer"
                >
                  <option value="Book Covers">Book Covers</option>
                  <option value="Character Art">Character Art</option>
                  <option value="Illustration">Illustration</option>
                  <option value="Logo Design">Logo Design</option>
                  <option value="Branding">Branding</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Photography">Photography</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Web Design & Development">Web Design & Development</option>
                  <option value="Fantasy Maps">Fantasy Maps</option>
                  <option value="Interior Art">Interior Art</option>
                  <option value="Logos">Logos</option>
                  <option value="Websites">Websites</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Media Type</label>
                <select
                  value={formData.mediaType || "image"}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mediaType: e.target.value as any }))}
                  className="w-full rounded-xl bg-surface-2 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white cursor-pointer"
                >
                  <option value="image">Image (Standard Artwork)</option>
                  <option value="video">Video (Showcase Reel / Process Video)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Publish Status</label>
                <select
                  value={formData.status || "published"}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                  className="w-full rounded-xl bg-surface-2 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white cursor-pointer"
                >
                  <option value="published">Published (Visible on site)</option>
                  <option value="draft">Draft (Hidden from public pages)</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Layout Aspect Ratio</label>
                <select
                  value={formData.aspect}
                  onChange={(e) => setFormData((prev) => ({ ...prev, aspect: e.target.value as any }))}
                  className="w-full rounded-xl bg-surface-2 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white cursor-pointer"
                >
                  <option value="square">Square Aspect</option>
                  <option value="tall">Tall Aspect</option>
                  <option value="wide">Wide Aspect</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. concept, sketch, paint"
                  value={formData.tags ? formData.tags.join(", ") : ""}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                  }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
            </div>

            {user?.role === "admin" && (
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Assign to Artist</label>
                <select
                  value={formData.artistSlug || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, artistSlug: e.target.value }))}
                  className="w-full rounded-xl bg-surface-2 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white cursor-pointer"
                >
                  <option value="">-- Select Artist --</option>
                  {artists.map((a) => (
                    <option key={a.slug} value={a.slug}>{a.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {/* Thumbnail Image Zone */}
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                  Cover Thumbnail (Required)
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={(e) => handleDropUpload(e, "image")}
                  className={cn(
                    "relative border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[140px]",
                    dragActive ? "border-brand-pink bg-brand-pink/5" : "border-white/10 hover:border-white/20 bg-white/5"
                  )}
                >
                  {formData.image ? (
                    <div className="relative group w-full h-[100px] rounded-lg overflow-hidden border border-white/10">
                      <img src={formData.image} alt="Thumbnail Preview" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-xs text-white font-semibold">Drop file to replace</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <p className="text-xs text-white font-semibold">Drag & drop thumbnail or</p>
                      <label className="mt-2 inline-flex items-center gap-1.5 cursor-pointer rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] text-white hover:bg-white/10">
                        Select File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Video File Zone (only if mediaType === 'video') */}
              {formData.mediaType === "video" && (
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Process / Artwork Video File
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={(e) => handleDropUpload(e, "videoUrl")}
                    className={cn(
                      "relative border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[140px]",
                      dragActive ? "border-brand-pink bg-brand-pink/5" : "border-white/10 hover:border-white/20 bg-white/5"
                    )}
                  >
                    {formData.videoUrl ? (
                      <div className="relative group w-full h-[100px] rounded-lg overflow-hidden border border-white/10 flex items-center justify-center bg-black/20">
                        <video src={formData.videoUrl} className="h-full max-w-full object-contain" muted />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-xs text-white font-semibold">Drop file to replace</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <p className="text-xs text-white font-semibold">Drag & drop video or</p>
                        <label className="mt-2 inline-flex items-center gap-1.5 cursor-pointer rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] text-white hover:bg-white/10">
                          Select File
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Description</label>
              <textarea
                required
                rows={3}
                value={formData.description || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none text-white"
              />
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className="rounded-full glass border border-white/10 px-5 py-2.5 text-xs font-semibold hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-gradient-brand px-6 py-2.5 text-xs font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Save Portfolio Record
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Grid listing */}
      {!isCreating && !editingItem && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-4">
            <span className="text-brand-pink font-semibold">💡 Tip:</span> Drag and drop portfolio items to rearrange their order on the public site.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {sortedItems.map((p) => (
              <div
                key={p.id}
                draggable
                onDragStart={(e) => handleDragStart(e, p.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, p.id)}
                className="cursor-grab active:cursor-grabbing transition-all"
              >
                <GlassCard
                  className={cn(
                    "overflow-hidden p-0 flex flex-col hover:border-white/20 transition-all relative group h-full",
                    p.status === "draft" && "border-yellow-500/30 bg-yellow-500/[0.02]"
                  )}
                >
                  <div className="relative aspect-square bg-surface-2 overflow-hidden">
                    {p.mediaType === "video" ? (
                      <div className="relative w-full h-full">
                        <video src={p.videoUrl} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                        <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider">
                          Video
                        </div>
                      </div>
                    ) : (
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                    )}
                    
                    {p.status === "draft" && (
                      <div className="absolute top-2 left-2 rounded bg-yellow-500/80 border border-yellow-600 px-2 py-0.5 text-[8px] font-bold text-black uppercase tracking-wider">
                        Draft
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-pink tracking-wider">
                          {p.category}
                        </span>
                        <h3 className="font-display text-base font-bold text-white mt-1">{p.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex gap-2 justify-end mt-auto bg-black/10 border-t border-white/5">
                    <button
                      onClick={() => setPreviewItem(p)}
                      className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Eye className="h-3 w-3" /> Preview
                    </button>
                    <button
                      onClick={() => startEdit(p)}
                      className="inline-flex items-center gap-1 rounded-full glass border border-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Edit2 className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${p.title} from portfolio?`)) {
                          deletePortfolioItem(p.id);
                        }
                      }}
                      className="grid h-8 w-8 place-items-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Preview Modal */}
      <Dialog open={!!previewItem} onOpenChange={(o) => !o && setPreviewItem(null)}>
        <DialogContent className="max-w-5xl glass-strong border-white/10 p-0 overflow-hidden text-white">
          {previewItem && (
            <div className="grid md:grid-cols-2">
              <div className="relative bg-black/20 flex items-center justify-center">
                {previewItem.mediaType === "video" ? (
                  <video
                    src={previewItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover max-h-[80vh]"
                  />
                ) : (
                  <img
                    src={previewItem.image}
                    alt={previewItem.title}
                    className="w-full h-full object-cover max-h-[80vh]"
                  />
                )}
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">
                      {previewItem.category}
                    </p>
                    {previewItem.status === "draft" && (
                      <span className="rounded bg-yellow-500/20 border border-yellow-500/40 px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold text-yellow-400">
                        Draft Preview
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-bold">{previewItem.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{previewItem.description}</p>
                  {previewItem.tags && previewItem.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {previewItem.tags.map((t) => (
                        <span key={t} className="text-[10px] uppercase bg-white/5 px-2.5 py-1 rounded-full text-muted-foreground">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8 space-y-3 text-sm pt-8 border-t border-white/5">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Category</span>
                    <span>{previewItem.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Artist ID / Slug</span>
                    <span>{previewItem.artistSlug || "Unassigned"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Layout Aspect</span>
                    <span className="capitalize">{previewItem.aspect}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


// 4. REVIEWS PANEL
function ReviewsPanel() {
  const { user, reviews, addReview, updateReview, deleteReview, artists, updateArtist } = useSiteData();
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<any>>({});

  // If user is artist, show only reviews assigned to them.
  // Reviews in TEAM artist lists are handled here
  const isArtist = user?.role === "artist";

  const startEdit = (review: any) => {
    setEditingReview(review);
    setFormData(review);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingReview(null);
    setFormData({
      id: `rev_${Date.now()}`,
      name: "",
      country: "",
      rating: 5,
      text: "",
    });
  };

  const handleRemovalRequest = async (artistReviewText: string) => {
    // Flag this review for removal. In database schema, reviews are inside Artist.
    // We append a custom removal flag to it
    const artist = artists.find((a) => a.slug === user?.artistSlug);
    if (!artist) return;

    const updatedReviews = artist.reviews.map((r) => {
      if (r.text === artistReviewText) {
        return { ...r, requestedRemoval: true };
      }
      return r;
    });

    const ok = await updateArtist(artist.slug, { ...artist, reviews: updatedReviews });
    if (ok) {
      toast.success("Removal request submitted for administrator review.");
    }
  };

  const handleApproveRemoval = async (artistSlug: string, reviewText: string) => {
    const artist = artists.find((a) => a.slug === artistSlug);
    if (!artist) return;

    // Filter out the review
    const updatedReviews = artist.reviews.filter((r) => r.text !== reviewText);
    const ok = await updateArtist(artist.slug, { ...artist, reviews: updatedReviews });
    if (ok) {
      toast.success("Review deletion request approved and review removed.");
    }
  };

  const handleRejectRemoval = async (artistSlug: string, reviewText: string) => {
    const artist = artists.find((a) => a.slug === artistSlug);
    if (!artist) return;

    const updatedReviews = artist.reviews.map((r) => {
      if (r.text === reviewText) {
        return { ...r, requestedRemoval: false };
      }
      return r;
    });
    const ok = await updateArtist(artist.slug, { ...artist, reviews: updatedReviews });
    if (ok) {
      toast.success("Review deletion request rejected.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalReview = {
      id: formData.id || `rev_${Date.now()}`,
      name: formData.name || "Happy Client",
      country: formData.country || "United States",
      rating: Number(formData.rating) || 5,
      text: formData.text || ""
    };

    if (isCreating) {
      const ok = await addReview(finalReview);
      if (ok) setIsCreating(false);
    } else if (editingReview) {
      const ok = await updateReview(editingReview.id, finalReview);
      if (ok) setEditingReview(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Reviews CMS Panel</h2>
        {!isArtist && !isCreating && !editingReview && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2.5 text-xs font-semibold text-white cursor-pointer shadow-glow"
          >
            <Plus className="h-4 w-4" /> Add Review
          </button>
        )}
      </div>

      {/* Editor Form */}
      {(isCreating || editingReview) && (
        <GlassCard className="p-6 md:p-8 border-white/10 relative">
          <h3 className="font-display text-xl font-bold mb-6">
            {isCreating ? "Create Global Review" : `Edit Review`}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Client Name</label>
                <input
                  required
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Rating (Stars)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                  className="w-full rounded-xl bg-surface-2 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white cursor-pointer"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Client Country / Location</label>
              <input
                required
                type="text"
                placeholder="e.g. United Kingdom"
                value={formData.country || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Review Body Text</label>
              <textarea
                required
                rows={3}
                value={formData.text || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none text-white"
              />
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => {
                  setEditingReview(null);
                  setIsCreating(false);
                }}
                className="rounded-full glass border border-white/10 px-5 py-2.5 text-xs font-semibold hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-gradient-brand px-6 py-2.5 text-xs font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Save Review
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {!isCreating && !editingReview && (
        <div className="grid gap-6">
          {/* Artist removal requests (Admin View) */}
          {!isArtist && (
            <div className="space-y-3">
              {artists.map((artist) => {
                const requests = artist.reviews?.filter((r) => r.requestedRemoval);
                if (!requests || requests.length === 0) return null;
                return (
                  <div key={artist.slug} className="p-4 rounded-3xl bg-red-500/5 border border-red-500/20">
                    <h4 className="text-xs uppercase font-bold text-red-400 tracking-wider flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> Review Removal Requests for {artist.name}
                    </h4>
                    <div className="mt-3 space-y-2">
                      {requests.map((req, i) => (
                        <div key={i} className="flex flex-col md:flex-row justify-between gap-4 p-3 bg-white/5 rounded-xl border border-white/5 text-sm">
                          <div>
                            <p className="text-white font-medium">"{req.text}"</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              By {req.author} · Rating: {req.rating}★
                            </p>
                          </div>
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() => handleApproveRemoval(artist.slug, req.text)}
                              className="inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                            >
                              <Check className="h-3 w-3" /> Approve Removal
                            </button>
                            <button
                              onClick={() => handleRejectRemoval(artist.slug, req.text)}
                              className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Reviews List */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Global Reviews */}
            {!isArtist &&
              reviews.map((r: any) => (
                <GlassCard key={r.id || r.text} className="flex flex-col justify-between">
                  <div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-brand-pink text-brand-pink" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-foreground leading-relaxed">"{r.text}"</p>
                    <p className="text-xs text-muted-foreground mt-3 font-semibold">
                      {r.name} · {r.country}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-white/5">
                    <button
                      onClick={() => startEdit(r)}
                      className="inline-flex items-center gap-1 rounded-full glass border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Edit2 className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Remove review?")) {
                          deleteReview(r.id || r.text);
                        }
                      }}
                      className="grid h-8 w-8 place-items-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </GlassCard>
              ))}

            {/* Artist specific Reviews (Artist dashboard view) */}
            {isArtist &&
              artists
                .find((a) => a.slug === user?.artistSlug)
                ?.reviews?.map((r, i) => (
                  <GlassCard key={i} className="flex flex-col justify-between">
                    <div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-brand-pink text-brand-pink" />
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-foreground leading-relaxed">"{r.text}"</p>
                      <p className="text-xs text-muted-foreground mt-3 font-semibold">
                        {r.author} · {r.country}
                      </p>
                    </div>
                    <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
                      {r.requestedRemoval ? (
                        <span className="text-xs text-red-400 italic flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Removal Request Pending Admin Approval
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRemovalRequest(r.text)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 text-xs font-semibold hover:bg-red-500/20 cursor-pointer"
                        >
                          <AlertTriangle className="h-3 w-3" /> Request Removal
                        </button>
                      )}
                    </div>
                  </GlassCard>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// CMS EXTENSIONS PANELS
// ----------------------------------------------------

// 5. GALLERY PANEL
function GalleryPanel() {
  const { interactiveGallery, saveGalleryItem, deleteGalleryItem } = useSiteData();
  const items = interactiveGallery.length > 0 ? interactiveGallery : DEFAULT_INTERACTIVE_GALLERY;
  const [editingItem, setEditingItem] = useState<InteractiveGalleryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<InteractiveGalleryItem>>({});

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: formData.id || `gal_${Date.now()}`,
      titleBefore: formData.titleBefore || "",
      titleAfter: formData.titleAfter || "",
      beforeImage: formData.beforeImage || "",
      afterImage: formData.afterImage || "",
      beforeLabel: formData.beforeLabel || "Before",
      afterLabel: formData.afterLabel || "After",
      description: formData.description || "",
    } as InteractiveGalleryItem;
    
    if (!item.titleBefore || !item.titleAfter || !item.beforeImage || !item.afterImage) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const success = await saveGalleryItem(item);
    if (success) {
      setEditingItem(null);
      setIsCreating(false);
      setFormData({});
    }
  };

  const startEdit = (item: InteractiveGalleryItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormData({
      id: `gal_${Date.now()}`,
      titleBefore: "",
      titleAfter: "",
      beforeImage: "",
      afterImage: "",
      beforeLabel: "Rough Sketch",
      afterLabel: "Final Artwork",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Interactive Process Gallery</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage before/after comparison slides displayed in the Home page.
          </p>
        </div>
        {!isCreating && !editingItem && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-xs font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Gallery Slide
          </button>
        )}
      </div>

      {(isCreating || editingItem) && (
        <GlassCard className="p-6 md:p-8 border-white/10 max-w-3xl">
          <h3 className="font-display text-xl font-bold mb-6">
            {isCreating ? "Add New Slider Item" : `Edit Slider: ${editingItem?.titleBefore} → ${editingItem?.titleAfter}`}
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  ID Key (Unique, e.g. "cover", "concept")
                </label>
                <input
                  required
                  disabled={!isCreating}
                  type="text"
                  placeholder="e.g. character-rendering"
                  value={formData.id || ""}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground disabled:opacity-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Before Title
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rough Sketch"
                    value={formData.titleBefore || ""}
                    onChange={(e) => setFormData({ ...formData, titleBefore: e.target.value })}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    After Title
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Final Artwork"
                    value={formData.titleAfter || ""}
                    onChange={(e) => setFormData({ ...formData, titleAfter: e.target.value })}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Before Image URL / Asset Path
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. /src/assets/sketch.png or URL"
                  value={formData.beforeImage || ""}
                  onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  After Image URL / Asset Path
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. /src/assets/final.jpg or URL"
                  value={formData.afterImage || ""}
                  onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Before Badge Label
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rough Pencil Sketch"
                  value={formData.beforeLabel || ""}
                  onChange={(e) => setFormData({ ...formData, beforeLabel: e.target.value })}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  After Badge Label
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Finished Painting"
                  value={formData.afterLabel || ""}
                  onChange={(e) => setFormData({ ...formData, afterLabel: e.target.value })}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Process Stage Description
              </label>
              <textarea
                required
                rows={3}
                placeholder="Explain the work done during this transition..."
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                  setFormData({});
                }}
                className="rounded-full glass border border-white/10 px-5 py-2.5 text-xs font-semibold hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-gradient-brand px-6 py-2.5 text-xs font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Save Slide
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {!isCreating && !editingItem && (
        <div className="grid gap-4">
          {items.map((item) => (
            <GlassCard key={item.id} className="p-6 border-white/10 hover:border-white/20 transition-all">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">
                      {item.titleBefore} → {item.titleAfter}
                    </span>
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-mono text-muted-foreground">
                      {item.id}
                    </span>
                  </div>
                  <p className="text-xs text-brand-pink font-semibold">
                    Labels: {item.beforeLabel} vs {item.afterLabel}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex gap-4 pt-3 text-xs text-muted-foreground">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-muted-foreground/60">Before Image Path:</span>
                      <span className="font-mono text-white/80">{item.beforeImage}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-muted-foreground/60">After Image Path:</span>
                      <span className="font-mono text-white/80">{item.afterImage}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="grid h-8 w-8 place-items-center rounded-full glass border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this comparison slide permanently?")) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="grid h-8 w-8 place-items-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

// 6. HOMEPAGE SECTIONS PANEL
function HomepagePanel() {
  const { siteConfig, saveSiteConfig } = useSiteData();
  const config = siteConfig || DEFAULT_SITE_CONFIG;
  const [formData, setFormData] = useState<SiteConfig>({ ...config });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveSiteConfig(formData);
    if (success) {
      toast.success("Homepage configuration updated.");
    }
  };

  const handleVideoChange = (index: number, field: string, value: string) => {
    const updatedVideos = [...formData.processVideos];
    updatedVideos[index] = { ...updatedVideos[index], [field]: value };
    setFormData({ ...formData, processVideos: updatedVideos });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Homepage Copy & Layouts</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize text copy, video links, timelapses, and calls to action across all homepage sections.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Watch Real Artwork Section */}
        <GlassCard className="p-6 border-white/10 space-y-4">
          <h3 className="font-display text-lg font-bold border-b border-white/5 pb-2 text-brand-pink">
            1. Watch Real Artwork Section
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Section Eyebrow
              </label>
              <input
                required
                type="text"
                value={formData.watchArtworkSection?.eyebrow || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    watchArtworkSection: { ...formData.watchArtworkSection, eyebrow: e.target.value },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Section Title
              </label>
              <input
                required
                type="text"
                value={formData.watchArtworkSection?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    watchArtworkSection: { ...formData.watchArtworkSection, title: e.target.value },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Section Description / Paragraph
            </label>
            <textarea
              required
              rows={3}
              value={formData.watchArtworkSection?.description || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  watchArtworkSection: { ...formData.watchArtworkSection, description: e.target.value },
                })
              }
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white resize-none focus:outline-none"
            />
          </div>
        </GlassCard>

        {/* Section 2: Featured Timelapse Section */}
        <GlassCard className="p-6 border-white/10 space-y-4">
          <h3 className="font-display text-lg font-bold border-b border-white/5 pb-2 text-brand-pink">
            2. Featured Timelapse
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Eyebrow
              </label>
              <input
                required
                type="text"
                value={formData.featuredTimelapseSection?.eyebrow || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featuredTimelapseSection: {
                      ...formData.featuredTimelapseSection,
                      eyebrow: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Timelapse Title
              </label>
              <input
                required
                type="text"
                value={formData.featuredTimelapseSection?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featuredTimelapseSection: { ...formData.featuredTimelapseSection, title: e.target.value },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Video File URL
            </label>
            <input
              required
              type="text"
              value={formData.featuredTimelapseSection?.videoUrl || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featuredTimelapseSection: {
                    ...formData.featuredTimelapseSection,
                    videoUrl: e.target.value,
                  },
                })
              }
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
            />
          </div>
        </GlassCard>

        {/* Section 3: Real Craftsmanship Block */}
        <GlassCard className="p-6 border-white/10 space-y-4">
          <h3 className="font-display text-lg font-bold border-b border-white/5 pb-2 text-brand-pink">
            3. Real Craftsmanship Copy
          </h3>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Section Title
            </label>
            <input
              required
              type="text"
              value={formData.realCraftsmanshipSection?.title || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  realCraftsmanshipSection: { ...formData.realCraftsmanshipSection, title: e.target.value },
                })
              }
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Paragraph 1
              </label>
              <textarea
                required
                rows={4}
                value={formData.realCraftsmanshipSection?.description1 || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    realCraftsmanshipSection: {
                      ...formData.realCraftsmanshipSection,
                      description1: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white resize-none focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Paragraph 2
              </label>
              <textarea
                required
                rows={4}
                value={formData.realCraftsmanshipSection?.description2 || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    realCraftsmanshipSection: {
                      ...formData.realCraftsmanshipSection,
                      description2: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white resize-none focus:outline-none"
              />
            </div>
          </div>
        </GlassCard>

        {/* Section 4: Start Your Project Callout & Card */}
        <GlassCard className="p-6 border-white/10 space-y-4">
          <h3 className="font-display text-lg font-bold border-b border-white/5 pb-2 text-brand-pink">
            4. Start Your Project Section & Cards
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Footer Section Eyebrow
              </label>
              <input
                required
                type="text"
                value={formData.startYourProjectSection?.eyebrow || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startYourProjectSection: {
                      ...formData.startYourProjectSection,
                      eyebrow: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Footer Section Title
              </label>
              <input
                required
                type="text"
                value={formData.startYourProjectSection?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startYourProjectSection: { ...formData.startYourProjectSection, title: e.target.value },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Footer Section Description
            </label>
            <input
              required
              type="text"
              value={formData.startYourProjectSection?.description || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startYourProjectSection: {
                    ...formData.startYourProjectSection,
                    description: e.target.value,
                  },
                })
              }
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="mt-6 p-4 rounded-3xl bg-white/5 border border-white/5 space-y-4">
            <h4 className="font-display text-sm font-semibold text-white">Side Highlight Card (under timelapse)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Card Title
                </label>
                <input
                  required
                  type="text"
                  value={formData.startYourProjectCard?.title || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startYourProjectCard: { ...formData.startYourProjectCard, title: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Card Button Label
                </label>
                <input
                  required
                  type="text"
                  value={formData.startYourProjectCard?.buttonLabel || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startYourProjectCard: {
                        ...formData.startYourProjectCard,
                        buttonLabel: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Card Description
              </label>
              <input
                required
                type="text"
                value={formData.startYourProjectCard?.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startYourProjectCard: {
                      ...formData.startYourProjectCard,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
        </GlassCard>

        {/* Section 5: Process Video Showcase (Loops) */}
        <GlassCard className="p-6 border-white/10 space-y-6">
          <h3 className="font-display text-lg font-bold border-b border-white/5 pb-2 text-brand-pink">
            5. Process Video Loops (Grid of 6)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formData.processVideos?.map((video, idx) => (
              <div key={idx} className="p-4 rounded-3xl bg-white/5 border border-white/5 space-y-3">
                <span className="inline-block text-[10px] font-mono bg-brand-violet/20 border border-brand-violet/40 px-2 py-0.5 rounded-full text-brand-pink font-semibold">
                  Video Card 0{idx + 1}
                </span>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={video.title}
                    onChange={(e) => handleVideoChange(idx, "title", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Description</label>
                  <textarea
                    required
                    rows={2}
                    value={video.desc}
                    onChange={(e) => handleVideoChange(idx, "desc", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white resize-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Video Loop URL</label>
                  <input
                    required
                    type="text"
                    value={video.url}
                    onChange={(e) => handleVideoChange(idx, "url", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Section 6: Contact Page Content */}
        <GlassCard className="p-6 border-white/10 space-y-4">
          <h3 className="font-display text-lg font-bold border-b border-white/5 pb-2 text-brand-pink">
            6. Contact Page Content
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Header Eyebrow
              </label>
              <input
                required
                type="text"
                value={formData.contactPage?.eyebrow || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactPage: {
                      ...formData.contactPage!,
                      eyebrow: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Header Title
              </label>
              <input
                required
                type="text"
                value={formData.contactPage?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactPage: {
                      ...formData.contactPage!,
                      title: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Header Description
            </label>
            <input
              required
              type="text"
              value={formData.contactPage?.description || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactPage: {
                    ...formData.contactPage!,
                    description: e.target.value,
                  },
                })
              }
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Contact Email Address
              </label>
              <input
                required
                type="email"
                value={formData.contactPage?.email || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactPage: {
                      ...formData.contactPage!,
                      email: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Contact WhatsApp/Phone
              </label>
              <input
                required
                type="text"
                value={formData.contactPage?.whatsapp || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactPage: {
                      ...formData.contactPage!,
                      whatsapp: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Working Hours
              </label>
              <input
                required
                type="text"
                value={formData.contactPage?.hours || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactPage: {
                      ...formData.contactPage!,
                      hours: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Studio Location Label
              </label>
              <input
                required
                type="text"
                value={formData.contactPage?.studioLocation || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactPage: {
                      ...formData.contactPage!,
                      studioLocation: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Map Placeholder Card Label
            </label>
            <input
              required
              type="text"
              value={formData.contactPage?.mapPlaceholderText || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactPage: {
                    ...formData.contactPage!,
                    mapPlaceholderText: e.target.value,
                  },
                })
              }
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
            />
          </div>
        </GlassCard>

        {/* Section 7: Social Media Links */}
        <GlassCard className="p-6 border-white/10 space-y-4">
          <h3 className="font-display text-lg font-bold border-b border-white/5 pb-2 text-brand-pink">
            7. Social Media Links
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                placeholder="https://instagram.com/..."
                value={formData.socialLinks?.instagram || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...(formData.socialLinks || {}),
                      instagram: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                placeholder="https://twitter.com/..."
                value={formData.socialLinks?.twitter || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...(formData.socialLinks || {}),
                      twitter: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                placeholder="https://facebook.com/..."
                value={formData.socialLinks?.facebook || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...(formData.socialLinks || {}),
                      facebook: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/..."
                value={formData.socialLinks?.linkedin || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...(formData.socialLinks || {}),
                      linkedin: e.target.value,
                    },
                  })
                }
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
        </GlassCard>

        {/* Form Actions */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="submit"
            className="rounded-full bg-gradient-brand px-8 py-3 text-sm font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer"
          >
            Save Homepage Config
          </button>
        </div>
      </form>
    </div>
  );
}

// 7. USER ACCOUNTS PANEL (Admin-only)
function UsersPanel() {
  const { users, saveUser, deleteUser, artists } = useSiteData();
  const [editingUser, setEditingUser] = useState<Partial<UserAccount> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<UserAccount>>({});
  const [password, setPassword] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.role || !formData.name) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (isCreating && !password) {
      toast.error("Password is required for new accounts.");
      return;
    }
    
    const success = await saveUser(formData, password || undefined);
    if (success) {
      setEditingUser(null);
      setIsCreating(false);
      setFormData({});
      setPassword("");
    }
  };

  const startEdit = (user: UserAccount) => {
    setEditingUser(user);
    setFormData(user);
    setIsCreating(false);
    setPassword("");
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingUser(null);
    setFormData({
      id: `usr_${Date.now()}`,
      username: "",
      role: "artist",
      name: "",
      email: "",
      artistSlug: "",
    });
    setPassword("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Workspace User Accounts</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage authentication credentials, roles, and profiles for administrative and artist workspace members.
          </p>
        </div>
        {!isCreating && !editingUser && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-xs font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Create User Account
          </button>
        )}
      </div>

      {(isCreating || editingUser) && (
        <GlassCard className="p-6 md:p-8 border-white/10 max-w-2xl">
          <h3 className="font-display text-xl font-bold mb-6">
            {isCreating ? "Create New Workspace Account" : `Edit User: ${editingUser?.username}`}
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Username (lowercase, alphanumeric)
                </label>
                <input
                  required
                  disabled={!isCreating}
                  type="text"
                  placeholder="e.g. emily_jones"
                  value={formData.username || ""}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().trim() })}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white disabled:opacity-50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Full Name / Display Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Emily Jones"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Role
                </label>
                <select
                  required
                  value={formData.role || "artist"}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "artist" })}
                  className="w-full rounded-2xl bg-surface-2 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option value="artist">Artist Profile Member</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Associated Artist Profile (Optional)
                </label>
                <select
                  value={formData.artistSlug || ""}
                  onChange={(e) => setFormData({ ...formData, artistSlug: e.target.value || undefined })}
                  className="w-full rounded-2xl bg-surface-2 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option value="">None (Administrative account or unlinked)</option>
                  {artists.map((artist) => (
                    <option key={artist.slug} value={artist.slug}>
                      {artist.name} ({artist.slug})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. emily@theartsfolio.com"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {isCreating ? "Account Password" : "Reset Password (leave empty to keep current)"}
                </label>
                <input
                  required={isCreating}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setIsCreating(false);
                  setFormData({});
                  setPassword("");
                }}
                className="rounded-full glass border border-white/10 px-5 py-2.5 text-xs font-semibold hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-gradient-brand px-6 py-2.5 text-xs font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Save User Account
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {!isCreating && !editingUser && (
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((item) => (
            <GlassCard key={item.id} className="p-6 border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">@{item.username}</p>
                  </div>
                  <span className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                    item.role === "admin"
                      ? "bg-brand-pink/20 border border-brand-pink/40 text-brand-pink"
                      : "bg-brand-violet/20 border border-brand-violet/40 text-brand-violet"
                  )}>
                    {item.role}
                  </span>
                </div>
                
                <div className="mt-4 space-y-1.5 text-xs">
                  {item.email && (
                    <p className="text-muted-foreground">
                      Email: <span className="text-white font-medium">{item.email}</span>
                    </p>
                  )}
                  {item.artistSlug && (
                    <p className="text-muted-foreground">
                      Linked Artist: <span className="text-brand-pink font-semibold">{item.artistSlug}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 justify-end mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => startEdit(item)}
                  className="inline-flex items-center gap-1 rounded-full glass border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer"
                >
                  <Edit2 className="h-3 w-3" /> Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete the user account @${item.username} permanently?`)) {
                      deleteUser(item.id);
                    }
                  }}
                  className="grid h-8 w-8 place-items-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

// 8. MY ACCOUNT PANEL (Universal Profile/Credentials Editor)
function MyAccountPanel() {
  const { user, users, saveUser } = useSiteData();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name field is required.");
      return;
    }
    if (password && password !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);
    const dbUser = users.find((u) => u.username.toLowerCase() === user?.username.toLowerCase());
    if (!dbUser) {
      toast.error("Could not trace workspace user account.");
      setLoading(false);
      return;
    }

    const success = await saveUser(
      {
        ...dbUser,
        name,
        email,
      },
      password || undefined
    );

    if (success) {
      setPassword("");
      setConfirmPassword("");
      toast.success("Security profile updated successfully.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="font-display text-2xl font-bold">Personal Account Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Update your display name, notification email, and security credentials.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 border-white/10">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Workspace Username
            </label>
            <input
              disabled
              type="text"
              value={`@${user?.username}`}
              className="w-full rounded-2xl bg-white/5 border border-white/5 px-4 py-3 text-sm text-muted-foreground font-mono disabled:opacity-50 focus:outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Your Display Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Notification Email
              </label>
              <input
                type="email"
                placeholder="you@theartsfolio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-4">
            <h3 className="font-display text-sm font-semibold text-brand-pink">Change Password</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-gradient-brand px-6 py-3 text-xs font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform cursor-pointer disabled:opacity-50"
            >
              Update Credentials
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
