import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { User, Lock, Bell } from "lucide-react";

const Settings = () => {
  const { user, updateProfile, updatePreferences } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    notifications_email: true,
    notifications_orders: true,
    notifications_quotes: true,
    newsletter: false,
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [preferencesLoading, setPreferencesLoading] = useState(false);
  const [messages, setMessages] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setMessages({});

    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        setMessages({ profile: { type: "success", text: "Profile updated successfully!" } });
        setTimeout(() => setMessages({}), 3000);
      } else {
        setMessages({ profile: { type: "error", text: result.error } });
      }
    } catch (error) {
      setMessages({ profile: { type: "error", text: "Failed to update profile" } });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessages({});

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessages({ password: { type: "error", text: "Passwords do not match" } });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessages({ password: { type: "error", text: "Password must be at least 6 characters" } });
      return;
    }

    setPasswordLoading(true);

    try {
      const result = await updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        setMessages({ password: { type: "success", text: "Password changed successfully!" } });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setMessages({}), 3000);
      } else {
        setMessages({ password: { type: "error", text: result.error } });
      }
    } catch (error) {
      setMessages({ password: { type: "error", text: "Failed to change password" } });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    setPreferencesLoading(true);
    setMessages({});

    try {
      const result = await updatePreferences(preferences);
      if (result.success) {
        setMessages({ preferences: { type: "success", text: "Preferences saved successfully!" } });
        setTimeout(() => setMessages({}), 3000);
      } else {
        setMessages({ preferences: { type: "error", text: result.error } });
      }
    } catch (error) {
      setMessages({ preferences: { type: "error", text: "Failed to save preferences" } });
    } finally {
      setPreferencesLoading(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
        activeTab === id
          ? "border-black text-black font-semibold"
          : "border-transparent text-gray-600 hover:text-black"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8f6f2] py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight mb-3">Account Settings</h1>
          <p className="text-gray-600">
            Manage your profile information, security settings, and preferences
          </p>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            <TabButton id="profile" label="Profile" icon={User} />
            <TabButton id="password" label="Security" icon={Lock} />
            <TabButton id="preferences" label="Preferences" icon={Bell} />
          </div>

          <div className="p-8">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

                {messages.profile && (
                  <div
                    className={`p-4 rounded-xl ${
                      messages.profile.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {messages.profile.text}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50"
                  >
                    {profileLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* PASSWORD TAB */}
            {activeTab === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6">Change Password</h2>

                {messages.password && (
                  <div
                    className={`p-4 rounded-xl ${
                      messages.password.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {messages.password.text}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === "preferences" && (
              <form onSubmit={handlePreferencesSubmit} className="space-y-6 max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>

                {messages.preferences && (
                  <div
                    className={`p-4 rounded-xl ${
                      messages.preferences.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {messages.preferences.text}
                  </div>
                )}

                <div className="space-y-4">
                  <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      name="notifications_email"
                      checked={preferences.notifications_email}
                      onChange={handlePreferenceChange}
                      className="mt-1 w-5 h-5 accent-black rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">
                        Receive email updates about your account activity
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      name="notifications_orders"
                      checked={preferences.notifications_orders}
                      onChange={handlePreferenceChange}
                      className="mt-1 w-5 h-5 accent-black rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Order Updates</p>
                      <p className="text-sm text-gray-600">
                        Get notified about order status changes and deliveries
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      name="notifications_quotes"
                      checked={preferences.notifications_quotes}
                      onChange={handlePreferenceChange}
                      className="mt-1 w-5 h-5 accent-black rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Quote Updates</p>
                      <p className="text-sm text-gray-600">
                        Receive updates about your quote requests and responses
                      </p>
                    </div>
                  </label>

 
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={preferencesLoading}
                    className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50"
                  >
                    {preferencesLoading ? "Saving..." : "Save Preferences"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
