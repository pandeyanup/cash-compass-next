import { Metadata } from "next";
import { auth } from "~/server/auth";
import NotFound from "../not-found";
import Profile from "~/components/profile/Profile";

export const metadata: Metadata = {
  title: "Profile | CashCompass",
  description:
    "View and manage your profile, budgets, and achievements on CashCompass. Track your income and expenses, set financial goals, and gain insights into your spending habits.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    return <NotFound />;
  }

  return <Profile />;
};

export default ProfilePage;
