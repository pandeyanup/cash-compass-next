"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";
import Loading from "~/components/Loading";
import Image from "next/image";

const Profile = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const {
    data: profile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = api.profile.getProfile.useQuery(undefined, {
    gcTime: 1000 * 60 * 30,
  });

  const { data: budgets, isLoading: budgetsLoading } =
    api.budget.getAll.useQuery(undefined, {
      staleTime: Infinity, // Data will never become stale
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    });

  const { data: achievements } = api.achievement.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const { data: subscriptionStatus } = api.subscription.getStatus.useQuery(
    undefined,
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  );

  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      setNewName("");
      void refetchProfile();
    },
  });

  if (profileLoading || budgetsLoading) {
    return <Loading />;
  }

  if (!profile) {
    return <div>Error loading profile</div>;
  }

  const handleUpdateName = () => {
    updateProfile.mutate({ name: newName });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Profile</h1>

      {/* User Information Card */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">User Information</h2>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="mt-2 flex items-center">
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="New name"
                className="mr-2"
              />
              <Button
                onClick={handleUpdateName}
                disabled={updateProfile.isPending}
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="mt-2 flex items-center">
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="ml-4"
              >
                Edit Name
              </Button>
            </div>
          )}
          {profile.image && (
            <Image
              src={profile.image}
              alt="Profile"
              width={80}
              height={80}
              className="mt-4 rounded-full"
            />
          )}
        </CardContent>
      </Card>

      {/* Subscription Status Card */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Subscription</h2>
        </CardHeader>
        <CardContent>
          <p>Current Plan: {subscriptionStatus?.name ?? "Free"}</p>
          {subscriptionStatus?.name !== "Premium" && (
            <Button onClick={() => router.push("/upgrade")} className="mt-2">
              Upgrade to Premium
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Achievements Card */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Achievements</h2>
        </CardHeader>
        <CardContent>
          {achievements?.map((achievement) => (
            <Badge key={achievement.id} className="mb-2 mr-2">
              {achievement.name}
            </Badge>
          ))}
        </CardContent>
        <CardFooter>
          <Progress
            value={achievements?.length ?? 0}
            max={10}
            className="w-full"
          />
          <p className="mt-2 text-sm">
            Unlock more achievements to earn rewards!
          </p>
        </CardFooter>
      </Card>

      {/* Budgets Card */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Your Budgets</h2>
        </CardHeader>
        <CardContent>
          {budgets && budgets.length > 0 ? (
            <ul>
              {budgets.map((budget) => (
                <li key={budget.id} className="mb-2">
                  <strong>{budget.name}:</strong> ${budget.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p>No budgets found.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/budgets/new")}>
            Create New Budget
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
