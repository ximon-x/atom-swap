"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/lib/styles/typography";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 max-w-fit bg-secondary dark:bg-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <span>Error Occurred</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="p" className="mb-4">
            Sorry, but something went wrong. Please try again later.
          </Text>
          <Text variant="code">Error details: {error.message}</Text>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go back home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
