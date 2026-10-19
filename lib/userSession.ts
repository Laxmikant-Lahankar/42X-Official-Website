export interface UserLeadData {
  name: string;
  email: string;
  phone: string;
  course?: string;
  experienceLevel?: string;
}

interface StoredSessionData {
  data: UserLeadData;
  timestamp: number;
}

const STORAGE_KEY = "42x_user_session_lead";
// 2 hours expiration period
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;

export function saveUserData(data: Partial<UserLeadData>): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getUserData() || ({} as UserLeadData);
    const updated: UserLeadData = {
      name: data.name?.trim() || existing.name || "",
      email: data.email?.trim() || existing.email || "",
      phone: data.phone?.trim() || existing.phone || "",
      course: data.course || existing.course || "",
      experienceLevel: data.experienceLevel || existing.experienceLevel || "",
    };

    const payload: StoredSessionData = {
      data: updated,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.error("Failed to save user session data:", e);
  }
}

export function hasValidUserData(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    const parsed: StoredSessionData = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !parsed.data) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }

    const isExpired = Date.now() - parsed.timestamp > SESSION_DURATION_MS;
    if (isExpired) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }

    // Valid if user has provided at least a name and contact info (phone or email)
    return Boolean(
      parsed.data.name?.trim() &&
        (parsed.data.phone?.trim() || parsed.data.email?.trim()),
    );
  } catch (e) {
    return false;
  }
}

export function getUserData(): UserLeadData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: StoredSessionData = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !parsed.data) return null;

    if (Date.now() - parsed.timestamp > SESSION_DURATION_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed.data;
  } catch (e) {
    return null;
  }
}

export function clearUserData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}
