import create from 'zustand';
import jwt from 'jsonwebtoken';

const isClient = typeof window !== 'undefined';

interface AuthStore {
  user: any;
  isLogin: boolean;
  setUser: (accessToken: string) => void;
  logOut: () => void;
}

const decodeToken = (token: string) => {
  try {
    const decodedToken = jwt.decode(token) as any;
    return decodedToken || null;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return null;
  }
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLogin: false,
  setUser: (accessToken) => {
    const user = decodeToken(accessToken);
    set({ user, isLogin: !!user });
    if (isClient && user) {
      localStorage.setItem("accessToken", accessToken);
    }
  },
  logOut: () => {
    if (isClient) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    }
    set({ user: null, isLogin: false });
  },
}));

const initializeUserFromToken = () => {
  if (!isClient) return;

  const accessToken = localStorage.getItem("accessToken");
  const user = accessToken ? decodeToken(accessToken) : null;
  useAuthStore.setState({ user, isLogin: !!user });

  window.addEventListener("storage", (event) => {
    if (event.key === "accessToken") {
      const updatedAccessToken = localStorage.getItem("accessToken");
      const updatedUser = updatedAccessToken ? decodeToken(updatedAccessToken) : null;
      useAuthStore.setState({ user: updatedUser, isLogin: !!updatedUser });
    }
  });
};

if (isClient) {
  initializeUserFromToken();
}

export { useAuthStore };
