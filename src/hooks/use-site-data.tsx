import * as React from "react";
import { toast } from "sonner";
import {
  getSiteData,
  getSubmissions,
  deleteSubmission as serverDeleteSubmission,
  saveArtist as serverSaveArtist,
  deleteArtist as serverDeleteArtist,
  savePortfolioItem as serverSavePortfolioItem,
  deletePortfolioItem as serverDeletePortfolioItem,
  saveReview as serverSaveReview,
  deleteReview as serverDeleteReview,
  savePortfolioOrder,
  validateCredentials,
  saveUser as serverSaveUser,
  deleteUser as serverDeleteUser,
  saveSiteConfig as serverSaveSiteConfig,
  saveGalleryItem as serverSaveGalleryItem,
  deleteGalleryItem as serverDeleteGalleryItem,
  saveBlogPost as serverSaveBlogPost,
  deleteBlogPost as serverDeleteBlogPost
} from "../lib/server-functions";
import type { Artist, PortfolioItem, GlobalReview, Submission, UserAccount, InteractiveGalleryItem, SiteConfig, BlogPost } from "../lib/site-data";

interface AuthUser {
  username: string;
  role: "admin" | "artist";
  artistSlug?: string;
  name?: string;
  email?: string;
}

interface SiteDataContextType {
  artists: Artist[];
  portfolio: PortfolioItem[];
  reviews: GlobalReview[];
  submissions: Submission[];
  loading: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshData: () => Promise<void>;
  
  // CRUD APIs
  addArtist: (artist: Artist) => Promise<boolean>;
  updateArtist: (slug: string, artist: Artist) => Promise<boolean>;
  deleteArtist: (slug: string) => Promise<boolean>;
  
  addPortfolioItem: (item: PortfolioItem) => Promise<boolean>;
  updatePortfolioItem: (id: string, item: PortfolioItem) => Promise<boolean>;
  deletePortfolioItem: (id: string) => Promise<boolean>;
  reorderPortfolio: (orders: { id: string; order: number }[]) => Promise<boolean>;
  
  addReview: (review: GlobalReview & { id?: string }) => Promise<boolean>;
  updateReview: (id: string, review: GlobalReview & { id?: string }) => Promise<boolean>;
  deleteReview: (id: string) => Promise<boolean>;
  
  deleteSubmission: (id: string) => Promise<boolean>;

  // CMS & User management extensions
  users: UserAccount[];
  interactiveGallery: InteractiveGalleryItem[];
  siteConfig: SiteConfig | null;
  saveUser: (user: Partial<UserAccount>, password?: string) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  saveSiteConfig: (config: SiteConfig) => Promise<boolean>;
  saveGalleryItem: (item: InteractiveGalleryItem) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;
  blogs: BlogPost[];
  addBlogPost: (post: BlogPost) => Promise<boolean>;
  updateBlogPost: (id: string, post: BlogPost) => Promise<boolean>;
  deleteBlogPost: (id: string) => Promise<boolean>;
}

const SiteDataContext = React.createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [portfolio, setPortfolio] = React.useState<PortfolioItem[]>([]);
  const [reviews, setReviews] = React.useState<GlobalReview[]>([]);
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<AuthUser | null>(null);

  // New CMS states
  const [users, setUsers] = React.useState<UserAccount[]>([]);
  const [interactiveGallery, setInteractiveGallery] = React.useState<InteractiveGalleryItem[]>([]);
  const [siteConfig, setSiteConfig] = React.useState<SiteConfig | null>(null);
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);

  // Sync auth state with localStorage client-side
  React.useEffect(() => {
    const savedUser = localStorage.getItem("arts_folio_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("arts_folio_user");
      }
    }
  }, []);

  const refreshData = React.useCallback(async () => {
    try {
      const data = await getSiteData();
      if (data.success) {
        setArtists(data.team || []);
        setPortfolio(data.portfolio || []);
        setReviews(data.reviews || []);
        setUsers(data.users || []);
        setInteractiveGallery(data.interactiveGallery || []);
        setSiteConfig(data.siteConfig || null);
        setBlogs(data.blogs || []);
      }
      
      // If user is admin, also fetch submissions
      const savedUser = localStorage.getItem("arts_folio_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.role === "admin") {
          const subsData = await getSubmissions();
          if (subsData.success) {
            setSubmissions(subsData.submissions || []);
          }
        }
      }
    } catch (error) {
      console.error("Error loading dynamic site data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData, user?.role]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await validateCredentials({ data: { username, password } });
      if (res.success && res.user) {
        const authUser: AuthUser = res.user;
        setUser(authUser);
        localStorage.setItem("arts_folio_user", JSON.stringify(authUser));
        toast.success(authUser.role === "admin" ? "Welcome, Administrator!" : `Welcome back, ${authUser.name || authUser.username}!`);
        return true;
      }
      toast.error(res.message || "Invalid username or password");
      return false;
    } catch (e: any) {
      toast.error(e.message || "An authentication error occurred");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("arts_folio_user");
    setSubmissions([]);
    toast.info("Logged out successfully");
  };

  // Artist Actions
  const addArtist = async (artist: Artist): Promise<boolean> => {
    const res = await serverSaveArtist({ data: { slug: artist.slug, artistData: artist } });
    if (res.success) {
      toast.success("Artist profile added successfully");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to add artist profile");
    return false;
  };

  const updateArtist = async (slug: string, artist: Artist): Promise<boolean> => {
    const res = await serverSaveArtist({ data: { slug, artistData: artist } });
    if (res.success) {
      toast.success("Artist profile updated");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to update artist profile");
    return false;
  };

  const deleteArtist = async (slug: string): Promise<boolean> => {
    const res = await serverDeleteArtist({ data: slug });
    if (res.success) {
      toast.success("Artist profile deleted");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to delete artist profile");
    return false;
  };

  // Portfolio Actions
  const addPortfolioItem = async (item: PortfolioItem): Promise<boolean> => {
    const res = await serverSavePortfolioItem({ data: item });
    if (res.success) {
      toast.success("Portfolio item added");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to add portfolio item");
    return false;
  };

  const updatePortfolioItem = async (id: string, item: PortfolioItem): Promise<boolean> => {
    const res = await serverSavePortfolioItem({ data: { ...item, id } });
    if (res.success) {
      toast.success("Portfolio item updated");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to update portfolio item");
    return false;
  };

  const deletePortfolioItem = async (id: string): Promise<boolean> => {
    const res = await serverDeletePortfolioItem({ data: id });
    if (res.success) {
      toast.success("Portfolio item deleted");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to delete portfolio item");
    return false;
  };

  const reorderPortfolio = async (orders: { id: string; order: number }[]): Promise<boolean> => {
    const res = await savePortfolioOrder({ data: orders });
    if (res.success) {
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to update portfolio order");
    return false;
  };

  // Review Actions
  const addReview = async (review: GlobalReview & { id?: string }): Promise<boolean> => {
    const res = await serverSaveReview({ data: review });
    if (res.success) {
      toast.success("Review added");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to add review");
    return false;
  };

  const updateReview = async (id: string, review: GlobalReview & { id?: string }): Promise<boolean> => {
    const res = await serverSaveReview({ data: { ...review, id } });
    if (res.success) {
      toast.success("Review updated");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to update review");
    return false;
  };

  const deleteReview = async (id: string): Promise<boolean> => {
    const res = await serverDeleteReview({ data: id });
    if (res.success) {
      toast.success("Review deleted");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to delete review");
    return false;
  };

  // Submissions Actions
  const deleteSubmission = async (id: string): Promise<boolean> => {
    const res = await serverDeleteSubmission({ data: id });
    if (res.success) {
      toast.success("Form submission record removed");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to remove submission record");
    return false;
  };

  const saveUser = async (userToSave: Partial<UserAccount>, password?: string): Promise<boolean> => {
    const res = await serverSaveUser({ data: { user: userToSave, password } });
    if (res.success) {
      toast.success("User account saved successfully");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to save user account");
    return false;
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    const res = await serverDeleteUser({ data: id });
    if (res.success) {
      toast.success("User account deleted");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to delete user account");
    return false;
  };

  const saveSiteConfig = async (config: SiteConfig): Promise<boolean> => {
    const res = await serverSaveSiteConfig({ data: config });
    if (res.success) {
      toast.success("Homepage configuration saved");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to save configuration");
    return false;
  };

  const saveGalleryItem = async (item: InteractiveGalleryItem): Promise<boolean> => {
    const res = await serverSaveGalleryItem({ data: item });
    if (res.success) {
      toast.success("Interactive gallery item saved");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to save gallery item");
    return false;
  };

  const deleteGalleryItem = async (id: string): Promise<boolean> => {
    const res = await serverDeleteGalleryItem({ data: id });
    if (res.success) {
      toast.success("Interactive gallery item deleted");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to delete gallery item");
    return false;
  };

  const addBlogPost = async (post: BlogPost): Promise<boolean> => {
    const res = await serverSaveBlogPost({ data: post });
    if (res.success) {
      toast.success("Blog post created successfully");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to create blog post");
    return false;
  };

  const updateBlogPost = async (id: string, post: BlogPost): Promise<boolean> => {
    const res = await serverSaveBlogPost({ data: { ...post, id } });
    if (res.success) {
      toast.success("Blog post updated successfully");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to update blog post");
    return false;
  };

  const deleteBlogPost = async (id: string): Promise<boolean> => {
    const res = await serverDeleteBlogPost({ data: id });
    if (res.success) {
      toast.success("Blog post deleted successfully");
      await refreshData();
      return true;
    }
    toast.error(res.message || "Failed to delete blog post");
    return false;
  };

  return (
    <SiteDataContext.Provider
      value={{
        artists,
        portfolio,
        reviews,
        submissions,
        loading,
        user,
        login,
        logout,
        refreshData,
        addArtist,
        updateArtist,
        deleteArtist,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        reorderPortfolio,
        addReview,
        updateReview,
        deleteReview,
        deleteSubmission,
        users,
        interactiveGallery,
        siteConfig,
        saveUser,
        deleteUser,
        saveSiteConfig,
        saveGalleryItem,
        deleteGalleryItem,
        blogs,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = React.useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
